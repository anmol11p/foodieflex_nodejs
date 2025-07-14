import { z } from "zod";

export const registrationSchema = z.object({
  fullname: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  phone: z
    .string({ required_error: "phone number is required" })
    .length(10, { message: "phone number length must be 10 digits" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = registrationSchema.pick({
  email: true,
  password: true,
});

export const userOrderSchema = z.object({
  items: z
    .array(
      z.object({
        itemId: z
          .string()
          .regex(/^[a-f\d]{24}$/i, { message: "Invalid ObjectId" }),
        quantity: z.coerce.number().min(1).max(5),
      })
    )
    .min(1),

  status: z
    .enum(["placed", "preparing", "delivered", "cancelled"])
    .optional()
    .default("placed"),

  deliveryAddress: z
    .string({ required_error: "Delivery address is required" })
    .refine((val) => val.trim().length > 0, {
      message: "Delivery address is required",
    })
    .refine((val) => val.trim().length >= 5, {
      message: "Address must be at least 5 characters",
    }),
});
export const OAuthAccountSchema = z.object({
  userId: z.string().min(1, "User ID is required").trim(),
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, "Provider account ID is required")
    .trim(),
});

export const itemZodSchema = z.object({
  itemName: z
    .string({ required_error: "Item name is required" })
    .trim()
    .min(1, "Item name cannot be empty"),

  price: z
    .number({ required_error: "Price is required" })
    .min(1, "Price cannot be empty"),

  description: z.string().optional().default(""),

  category: z.enum(["meal", "fast food", "drink", "dessert"], {
    required_error: "Category is required",
    invalid_type_error: "Invalid category",
  }),

  imageUrl: z
    .string({ required_error: "image url is required" })
    .optional()
    .default(""),

  available: z.boolean().optional().default(true),
});
