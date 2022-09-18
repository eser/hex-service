import { run } from "@app/core/mod.ts";
import { timerMiddleware } from "@app/middlewares/timer.ts";
import { homeAction } from "@app/actions/home.ts";

const app = run((s) => {
  // add middlewares
  s.addMiddleware(timerMiddleware);

  // add routes
  s.router.get("/", (ctx) => {
    ctx.response.body = homeAction();
  });
});

export { app, app as default };
