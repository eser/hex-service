import { asserts } from "@app/core/mod.ts";
import { echoAction } from "@app/actions/echo.ts";

Deno.test("actions:echo", async (t) => {
  await t.step("basic output", () => {
    const expected = "Hello eser!";

    asserts.assertEquals(expected, echoAction("eser"));
  });
});
