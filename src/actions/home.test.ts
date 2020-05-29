import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import homeAction from "./home.ts";

Deno.test({
  name: "actions:home",
  fn(): void {
    const expected = "Hello world!";

    assertEquals(expected, homeAction());
  }
});
