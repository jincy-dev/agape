import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Pice must have excatly two decimal places"
  );

// schema for inserting poducts

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
  slug: z.string().min(3, "Slug must be atleast 3 characters"),
  categoy: z.string().min(3, "Category must be atleast 3 characters"),
  brand: z.string().min(3, "Brand must be atleast 3 characters"),
  desciption: z.string().min(3, "Description must be atleast 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// schema for signing users in

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
  name: z.string().min(3, "Name must be atleast 3 characters").optional(),
});

export const signUpFormSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
  confirmPassword: z.string().min(6, "Password must be atleast 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

//cart schemas

export const cartItemSchema=z.object({
  productId:z.string().min(1, "Product id required"),
  name:z.string().min(1, "Name id required"),
  slug:z.string().min(1, "Slug id required"),
  qtn:z.number().int().nonnegative("Quantity must be a positve number"),
  image:z.string().min(1, "Image id required"),
  price:currency
})


export const insertCartSchema=z.object({
  name:z.string().min(1, "Name required"),
  items:z.array(cartItemSchema),
  itemPrice:currency,
  taxPrice:currency,
  shippingPrice:currency,
  totalPrice:currency, 
  sessionCartId:z.string().min(1, "Session cart id required"),
  userId:z.string().optional()
})