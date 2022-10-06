import { type Context, run, type ServiceOptions } from "@hex/service/mod.ts";
import { jwtMiddleware } from "@hex/service/middlewares/jwt.ts";
import { homeAction } from "@app/actions/home.ts";
import { echoAction } from "@app/actions/echo.ts";
import { errorProneAction } from "@app/actions/error-prone.ts";
import * as Sentry from "npm:@sentry/node";

interface AppOptions extends ServiceOptions {
  mongoDbConnString?: string;
  sentryDsn?: string;
}

const app = run<AppOptions>(async (s) => {
  // configure options
  await s.configureOptions((env, options) => {
    options.mongoDbConnString = env.readString("MONGODB_CONNSTRING");
    options.sentryDsn = env.readString("SENTRY_DSN");
  });

  // configure di registry
  await s.configureDI((registry) => {
    // registry.setValue(
  });

  // add middlewares
  s.addMiddleware(jwtMiddleware());

  // add routes
  s.addHealthCheck("/health-check");

  s.addRoute("get", "/", homeAction);

  s.addRoute("get", "/error", errorProneAction);

  s.addRoute("get", "/:slug", (ctx: Context) => {
    ctx.assert(ctx?.params?.slug?.length > 2, 400, "Slug is required");

    return echoAction(ctx?.params?.slug);
  });

  // sentry initialization
  if (s.options.sentryDsn !== undefined) {
    Sentry.init({
      dsn: s.options.sentryDsn,

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  }
});

export { app, app as default };
