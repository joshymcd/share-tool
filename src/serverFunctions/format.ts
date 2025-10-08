import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const format = createServerFn()
    .inputValidator(z.object({
        text: z.string().min(1),
    }))
    .handler(async ({ data }) => {
        return data.text;
    })