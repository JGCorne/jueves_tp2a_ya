import { z } from "zod";

// Cada campo se define una sola vez y se reusa en los dos schemas
const fields = {
  title: z.string({ error: "Title is required" }).min(1, "Title cannot be empty"),
  author: z.string({ error: "Author is required" }).min(1, "Author cannot be empty"),
  isbn: z.string().regex(/^\d{13}$/, "ISBN must be exactly 13 digits"),
  stock: z
    .number({ error: "Stock must be a number" })
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),
};

export const createBookSchema = z.object({
  title: fields.title,
  author: fields.author,
  isbn: fields.isbn.optional(),
  stock: fields.stock.default(0),
});

// Sin .partial(): así stock no hereda el default(0) y un update sin stock no lo pisa
export const updateBookSchema = z.object({
  title: fields.title.optional(),
  author: fields.author.optional(),
  isbn: fields.isbn.optional(),
  stock: fields.stock.optional(),
});

// Los query params llegan como string: z.coerce los convierte a número
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
