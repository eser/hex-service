import { type Context, run, type ServiceOptions } from "@hex/service/mod.ts";
import { jwtMiddleware } from "@hex/service/middlewares/jwt.ts";
import { homeAction } from "@app/actions/home.ts";
import { echoAction } from "@app/actions/echo.ts";
import { errorProneAction } from "@app/actions/error-prone.ts";

interface AppOptions extends ServiceOptions {
  mongoDbConnString?: string;
}

const app = run<AppOptions>(async (s) => {
  // configure options
  await s.configureOptions((env, options) => {
    options.mongoDbConnString = env.readString("MONGODB_CONNSTRING");
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
});

export { app, app as default };
