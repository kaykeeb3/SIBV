import { z } from "zod";

export const BookDTO = z.object({
  name: z.string().min(1).max(100),
  number: z.number().int().min(1000).max(9999),
  gender: z.string().min(1).max(50),
  quantity: z.number().int().positive(),
  author: z.string().min(1).max(100),
});

export type BookDTO = z.infer<typeof BookDTO>;
