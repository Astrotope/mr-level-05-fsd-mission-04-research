import { superoak, delay, assertStringIncludes, assertEquals } from "../src/deps.ts";
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
    .expect(function(response) {assertEquals(response.body.message.includes("Hello"), true);})
    .expect(function(response) {assertStringIncludes(response.body.message, "Hello");});
    // .expect(function(response) {console.log(response);});
    
});

Deno.test("it should return some JSON with status code 200, and content type application/json and contains jango", async () => {
  const request = await superoak(app);
  await request.post("/conversation/start")
    .set("Content-Type", "application/json")
    .send({ "prompt" : "What is a jango?"})
    .expect(200)
    //.expect("Content-Type", /text/)
    // .expect(function(response) {assertEquals(response.body.includes("jango"), true);})
    .expect(function(response) {assertStringIncludes(response.text, "jango");});
   // .expect(function(response) {console.log(response);});
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
