import Credentials from "@auth/core/providers/credentials";
import NextAuth from "next-auth";
import { cookies } from "next/dist/client/components/headers";
import parse, { splitCookiesString } from "set-cookie-parser";
import { getLoggedInUserServer } from "./app/api/services/authService";
// import { getLoggedInUserServer } from "./app/api/services/authService";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ token, session }) {
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      await getLoggedInUserServer().then(async (value: any) => {
        console.log(value);
        console.log("sayfalar arasında");
        if (value.error) {
          await signOut();
          return;
        }
      });
      return token;
    },
    async signIn({ account, profile }) {
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

          if (loginRequest.status == 201) {
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
              return {
                id: response.user_id,
                name: response.user_name,
                email: response.user_email,
              };
            }
          }
          return null;
        } catch (error) {
          throw new Error("User authentication error");
        }
      },
    }),
  ],
});
