import { asserts, log, oak } from "./deps.ts";
import { loadOptions, type Options } from "./options.ts";

// interface definitions
type Application = oak.Application;
type Middleware = oak.Middleware;
type Router = oak.Router;
type State = oak.State;
type RouteParams<Route extends string> = oak.RouteParams<Route>;
type Route<
  R extends string,
  P extends RouteParams<R> = RouteParams<R>,
  // deno-lint-ignore no-explicit-any
  S extends State = Record<string, any>,
> = oak.Route<R, P, S>;
type RouterMiddleware<
  R extends string,
  P extends RouteParams<R> = RouteParams<R>,
  // deno-lint-ignore no-explicit-any
  S extends State = Record<string, any>,
> = oak.RouterMiddleware<R, P, S>;
type RouterContext<
  R extends string,
  P extends RouteParams<R> = RouteParams<R>,
  // deno-lint-ignore no-explicit-any
  S extends State = Record<string, any>,
> = oak.RouterContext<R, P, S>;

interface Service {
  internalApp: Application;
  router: Router;
  options: Options;

  addMiddleware: (middleware: Middleware) => void;
  addHealthCheck: (path: string) => void;

  start: () => Promise<void>;
}

// public functions
const start = async (service: Service): Promise<void> => {
  // boot application server
  await service.internalApp.listen({ port: service.options.port });
};

const init = async (customOptions?: Options): Promise<Service> => {
  // determine options
  const options_ = customOptions ?? await loadOptions();

  // initialize oak application
  const app = new oak.Application();

  app.addEventListener(
    "listen",
    (e) => {
      const protocol = (e.secure) ? "https://" : "http://";
      const hostname = (e.hostname === "0.0.0.0") ? "localhost" : e.hostname;
      const uri = `${protocol}${hostname}:${e.port}/`;

      log.info(`Application is starting on ${uri}`);
      log.debug(JSON.stringify(options_, null, 2));
    },
  );

  // define routes
  const router = new oak.Router();

  // add middlewares
  app.use(router.routes());
  app.use(router.allowedMethods());

  // init logger
  await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler(options_.logs),
    },
    loggers: {
      default: {
        level: "DEBUG",
        handlers: ["console"],
      },
    },
  });

  // construct service object
  const serviceObject: Service = {
    internalApp: app,
    router: router,
    options: options_,

    addMiddleware: (middleware: Middleware): void => {
      app.use(middleware);
    },

    addHealthCheck: (path: string): void => {
      router.get(path, (ctx) => {
        ctx.response.body = "";
      });
    },

    start: () => start(serviceObject),
  };

  return serviceObject;
};

const run = async (initializer: (s: Service) => void | Promise<void>) => {
  try {
    const service = await init();

    await initializer(service);

    await service.start();
  } catch (error) {
    log.error(error);
  }
};

export {
  type Application,
  asserts,
  init,
  log,
  type Middleware,
  type Options,
  type Route,
  type RouteParams,
  type Router,
  type RouterContext,
  type RouterMiddleware,
  run,
  run as default,
  type Service,
  start,
  type State,
};
