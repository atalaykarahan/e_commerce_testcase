"use client";
import { loginAction } from "@/actions/login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
const LoginPage = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    // console.log("bunlar fonksiyon kısmı onsubmit giden value",values);
    try {
      await loginAction(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Giriş Yap</h1>
            <p className="text-balance text-muted-foreground">
              Hesabına giriş yapmak için bilgilerini gir
            </p>
          </div>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="user_email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>E Posta</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="m@ornek.com"
                          type="email"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* password */}
                <FormField
                  control={form.control}
                  name="user_password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Şifre</FormLabel>

                      <FormControl>
                        <Input {...field} type="password" required />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Hesabın yok mu kayıt ol.{" "}
            <Link href="/register" className="underline">
              Üye ol
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
