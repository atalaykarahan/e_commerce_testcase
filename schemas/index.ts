import * as z from "zod";
export const RegisterSchema = z.object({
  user_name: z.string({
    invalid_type_error: "Geçersiz karakter",
  }).min(1),
  user_email: z.string().email(),
  user_password: z.string().min(1),
  user_surname: z.string(),
});
