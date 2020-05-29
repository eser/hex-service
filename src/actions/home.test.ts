import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import homeAction from "./home.ts";

Deno.test("actions:home", () => {
  const expected = "Hello world!";

  assertEquals(expected, homeAction());
});
