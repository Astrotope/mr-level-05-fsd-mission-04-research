import { assertEquals } from "../deps.ts";

Deno.test("exampleHandler returns correct response", async () => {
    const response = await fetch("http://localhost:8000/example");
    const data = await response.json();
    assertEquals(data.message, "Hello, this is an example endpoint!");
});

