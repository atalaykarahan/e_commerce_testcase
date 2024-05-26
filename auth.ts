import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import parse, { splitCookiesString } from "set-cookie-parser";
import { cookies } from "next/dist/client/components/headers";
import { getLoggedInUserServer } from "./app/api/services/authService";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log("burasıda auth kısmındaki profile kısmı", profile);
      return true;
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials, request) {
        try {
          const fetchProps = {
            user_email: credentials.user_email,
            user_password: credentials.user_password,
          };
          const loginRequest = await fetch(
            `${process.env.BASE_URL}/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(fetchProps),
            }
          );

          const cookieFullString = loginRequest.headers.get("set-cookie");
          if (cookieFullString) {
            const splittedCookie = splitCookiesString(cookieFullString);
            const myCookie = parse(splittedCookie);

            cookies().set({
              name: myCookie[0].name,
              value: myCookie[0].value,
              expires: myCookie[0].expires,
              httpOnly: myCookie[0].httpOnly,
              path: myCookie[0].path,
            });

            const response = await loginRequest.json();
            console.log("dönen response şu şekilde", response);
            return response;
          }
        } catch (error) {
          throw new Error("User authentication error");
        }
        return null;
      },
    }),
  ],
});
