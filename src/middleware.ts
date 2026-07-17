// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export default auth((req) => {
//   const { nextUrl } = req;

//   const isLoggedIn = !!req.auth;

//   const isAuthPage =
//     nextUrl.pathname.startsWith("/login") ||
//     nextUrl.pathname.startsWith("/register");

//   // Allow NextAuth API routes
//   if (nextUrl.pathname.startsWith("/api/auth")) {
//     return NextResponse.next();
//   }

//   // Redirect authenticated users away from auth pages
//   if (isLoggedIn && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   // Protect private routes
//   if (!isLoggedIn && !isAuthPage) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/jobs/:path*",
//     "/candidates/:path*",
//     "/settings/:path*",
//     "/login",
//     "/register",
//   ],
// };

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isAuthPage =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  if (nextUrl.pathname.startsWith("/api/auth")) {
    return;
  }

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  if (!isLoggedIn && !isAuthPage) {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/:path*",
    "/candidates/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};