"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/app/api/services/authService";

const RegisterPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      user_name: "",
      user_email: "",
      user_surname: "",
      user_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    console.log(process.env.BASE_URL)
    try {
      signUp(values).then((res: any) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Üye Ol</CardTitle>
        <CardDescription>Hesap oluşturmak için bilgilerini gir</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                {/* name */}
                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Adın</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Naruto" type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* surname */}
                <FormField
                  control={form.control}
                  name="user_surname"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Soyadın</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Uzumaki" type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="user_email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>E Posta</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="konoha@ornek.com"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

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
                Hesap oluştur
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 text-center text-sm">
          Zaten hesabın var mı?{" "}
          <Link href="/login" className="underline">
            Giriş yap
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
