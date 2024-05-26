import * as z from "zod";
export const RegisterSchema = z.object({
  user_name: z.string({
    invalid_type_error: "Geçersiz karakter",
  }),
  user_email: z.string().email(),
  user_password: z.string(),
  user_surname: z.string(),
});
