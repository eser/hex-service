import { asserts } from "@app/core/mod.ts";
import { homeAction } from "@app/actions/home.ts";

Deno.test("actions:home", async (t) => {
  await t.step("basic output", () => {
    const expected = "Hello world!";

    asserts.assertEquals(expected, homeAction());
  });
});
