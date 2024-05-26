import { auth } from "@/auth";

// import { currentUser } from "./lib/auth";
import { authRoutes, publicRoutes } from "./routes";
import { NextURL } from "next/dist/server/web/next-url";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
//   const user = await currentUser();

//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);



//   return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
