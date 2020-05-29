import { oak, log } from "./deps.ts";
import options from "./app.options.ts";
import timerMiddleware from "./middlewares/timer.ts";
import homeAction from "./actions/home.ts";

// initialize oak application
const app = new oak.Application();

// define routes
const router = new oak.Router();

router.get("/", (ctx: any) => {
  ctx.response.body = homeAction();
});

// add middlewares
app.use(timerMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

// init logger
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler(options.logs),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: [ "console" ],
    },
  },
});

// boot application server
log.info(`Application is starting on port ${options.port}`);
log.debug(JSON.stringify(options, null, 2));

await app.listen({ port: options.port });
