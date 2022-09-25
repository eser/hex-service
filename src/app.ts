import { type Context, run } from "@app/core/mod.ts";
import { timerMiddleware } from "@app/middlewares/timer.ts";
import { homeAction } from "@app/actions/home.ts";
import { echoAction } from "@app/actions/echo.ts";

const app = run((s) => {
  // add middlewares
  s.addMiddleware(timerMiddleware);

  // add routes
  s.addHealthCheck("/health-check");

  s.addRoute("get", "/", homeAction);

  s.addRoute("get", "/:slug", (ctx: Context) => {
    ctx.assert(ctx?.params?.slug?.length > 2, 400, "Slug is required");

    return echoAction(ctx?.params?.slug);
  });
});

export { app, app as default };
