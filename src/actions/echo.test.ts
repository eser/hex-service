import { echoAction } from "@app/actions/echo.ts";
import { asserts } from "../deps.ts";

Deno.test("actions:echo", async (t) => {
  await t.step("basic output", () => {
    const expected = {
      message: "Hello eser!",
      timestamp: new Date().toLocaleDateString(),
    };

    asserts.assertEquals(expected, echoAction("eser"));
  });
});
