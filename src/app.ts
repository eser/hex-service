import { run } from "@app/core/mod.ts";
import { timerMiddleware } from "@app/middlewares/timer.ts";
import { homeAction } from "@app/actions/home.ts";
import { echoAction } from "@app/actions/echo.ts";

const app = run((s) => {
  // add middlewares
  s.addMiddleware(timerMiddleware);

  // add routes
  s.addHealthCheck("/health-check");

  s.router.get("/", (ctx) => {
    ctx.response.body = homeAction();
  });

  s.router.get("/:slug", (ctx) => {
    ctx.assert(ctx?.params?.slug, 400, "Slug is required");

    ctx.response.body = echoAction(ctx?.params?.slug);
  });
});

export { app, app as default };
