import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "الاسم الأول مطلوب"),
    lastName: z.string().min(2, "الاسم الأخير مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z
      .string()
      .regex(/^7[0137]\d{7}$/, "رقم الجوال يجب أن يبدأ بـ 7 ويتكون من 9 أرقام"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      error: "يجب الموافقة على الشروط والأحكام",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول مطلوب"),
  lastName: z.string().min(2, "الاسم الأخير مطلوب"),
  phone: z
    .string()
    .regex(/^7[0137]\d{7}$/, "رقم الجوال غير صحيح"),
  city: z.string().min(1, "المدينة مطلوبة"),
  address: z.string().min(10, "العنوان يجب أن يكون 10 أحرف على الأقل"),
  paymentMethod: z.enum(["card", "cash"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(3, "اسم المنتج يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(20, "الوصف يجب أن يكون 20 حرف على الأقل"),
  price: z.number().positive("السعر يجب أن يكون أكبر من صفر"),
  originalPrice: z.number().positive().optional(),
  category: z.string().min(1, "القسم مطلوب"),
  quantity: z.number().int().positive("الكمية يجب أن تكون رقم صحيح موجب"),
});

export const searchSchema = z.object({
  q: z.string().min(1, "كلمة البحث مطلوبة").max(100),
});

export const profileSchema = z.object({
  firstName: z.string().min(2, "الاسم الأول مطلوب"),
  lastName: z.string().min(2, "الاسم الأخير مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().regex(/^7[0137]\d{7}$/, "رقم الجوال غير صحيح"),
  city: z.string().min(1, "المدينة مطلوبة"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
