import { Context } from "https://deno.land/x/oak@v12.5.0/mod.ts";

export const exampleHandler = async (ctx: Context) => {
    ctx.response.body = { message: "Hello, this is an example endpoint!" };
};
