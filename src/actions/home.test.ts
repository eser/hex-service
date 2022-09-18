import { asserts } from "@app/core/mod.ts";
import { homeAction } from "@app/actions/home.ts";

Deno.test({
  name: "actions:home",
  fn(): void {
    const expected = "Hello world!";

    asserts.assertEquals(expected, homeAction());
  },
});
