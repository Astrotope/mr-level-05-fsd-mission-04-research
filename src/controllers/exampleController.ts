import { Context } from "../../src/deps.ts";

export const exampleHandler = async (ctx: Context) => {
    ctx.response.body = { message: "Hello, this is an example endpoint!" };
};
