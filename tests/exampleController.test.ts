import { superoak, delay } from "../src/deps.ts";
import { app } from "../src/app.ts";

/**
 * Test that the server returns the "Hello Deno!" JSON object when make a
 * GET request to "/".
 */
Deno.test("it should return some JSON with status code 200", async () => {
  const request = await superoak(app);
  await request.get("/example")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect('{"message":"Hello, this is an example endpoint!"}');
});

// Forcefully exit the Deno process once all tests are done.
Deno.test({
  name: "exit the process forcefully after all the tests are done\n",
  async fn() {
    await delay(3000);
    Deno.exit(0);
  },
  sanitizeExit: false,
});

