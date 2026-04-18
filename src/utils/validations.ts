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
  paymentMethod: z.enum(["card", "cash", "bank", "wallet"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "card") {
    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber.replace(/\s/g, ""))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "رقم البطاقة يجب أن يتكون من 16 رقم", path: ["cardNumber"] });
    }
    if (!data.cardExpiry || !/^\d{2}\/\d{2}$/.test(data.cardExpiry)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "تاريخ الانتهاء يجب أن يكون بصيغة MM/YY", path: ["cardExpiry"] });
    }
    if (!data.cardCvv || !/^\d{3,4}$/.test(data.cardCvv)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CVV يجب أن يتكون من 3 أو 4 أرقام", path: ["cardCvv"] });
    }
  }
});

export const productSchema = z.object({
  name: z.string().min(3, "اسم المنتج يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(20, "الوصف يجب أن يكون 20 حرف على الأقل"),
  price: z.string().min(1, "السعر مطلوب").regex(/^\d+(\.\d{1,2})?$/, "السعر يجب أن يكون رقماً صحيحاً"),
  originalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "السعر يجب أن يكون رقماً صحيحاً").optional().or(z.literal("")),
  category: z.string().min(1, "القسم مطلوب"),
});

export const serviceSchema = z.object({
  title: z.string().min(3, "عنوان الخدمة يجب أن يكون 3 أحرف على الأقل"),
  category: z.string().min(1, "التخصص مطلوب"),
  description: z.string().min(20, "الوصف يجب أن يكون 20 حرف على الأقل"),
  price: z.string().min(1, "السعر مطلوب").regex(/^\d+(\.\d{1,2})?$/, "السعر يجب أن يكون رقماً صحيحاً"),
  location: z.string().min(2, "الموقع مطلوب"),
  phone: z.string().regex(/^7[0137]\d{7}$/, "رقم الجوال غير صحيح"),
  pricingType: z.enum(["fixed", "hourly", "daily", "negotiable"]),
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
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
