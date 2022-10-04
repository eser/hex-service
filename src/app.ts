import { type Context, run, type ServiceOptions } from "@hex/service/mod.ts";
import { timerMiddleware } from "@hex/service/middlewares/timer.ts";
import { homeAction } from "@app/actions/home.ts";
import { echoAction } from "@app/actions/echo.ts";
import { errorProneAction } from "@app/actions/error-prone.ts";

interface AppOptions extends ServiceOptions {
  mongoDbConnString?: string;
}

const app = run<AppOptions>((s) => {
  // add middlewares
  s.addMiddleware(timerMiddleware);

  // add routes
  s.addHealthCheck("/health-check");

  s.addRoute("get", "/", homeAction);

  s.addRoute("get", "/error", errorProneAction);

  s.addRoute("get", "/:slug", (ctx: Context) => {
    ctx.assert(ctx?.params?.slug?.length > 2, 400, "Slug is required");

    return echoAction(ctx?.params?.slug);
  });

  // add options
  s.loadOptions((env, options) => {
    options.mongoDbConnString = env.readString("MONGODB_CONNSTRING");
  });
});

export { app, app as default };
