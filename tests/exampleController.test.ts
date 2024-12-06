import { superoak, delay, assertStringIncludes, assertEquals } from "../src/deps.ts";
import { app } from "../src/app.ts";

interface TestResponse {
  body: {
    message: string | null;  // allows string or null
  } | null;
  text: string | null;  // allows string or null
}

/**
 * Test that the server returns the "Hello Deno!" JSON object when make a
 * GET request to "/".
 */
Deno.test("it should return some JSON with status code 200", async () => {
  const request = await superoak(app);
  await request.get("/example")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect((response: TestResponse) => {
      // First verify the response structure
      assertEquals(response.body !== null, true, "Response body should not be null");
      if (response.body) {  // null check for TS
        assertEquals(response.body.message !== null, true, "Response message should not be null");
        if (response.body.message) {  // null check for TS
          // Then test the content
          assertStringIncludes(response.body.message, "Hello", "Response message should include 'Hello'");
        }
      }
    });
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
    .expect(function(response: TestResponse) {
      if (response.text) {  // null check
        assertStringIncludes(response.text, "jango", "Response text should include 'jango'");
      }
    });
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
