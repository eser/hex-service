import { oak } from "./deps.ts";
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

// boot application server
console.log(`Application is starting on port ${options.port}`);
await app.listen({ port: options.port });
