// import { getToken } from "next-auth/jwt";

import {auth} from "@/auth";
import { NextResponse, NextRequest } from "next/server";

export default auth((req)=> {

  const isLoggedIn = !!req.auth;

  const url = req.nextUrl;

  const authFile =
    url.pathname.startsWith("/signup") || url.pathname.startsWith("/login");

  // ✅ EXCLUDE NEXTAUTH ROUTES
  if (url.pathname.startsWith("/api/auth")) {
    return NextResponse.next({
      request:{
        headers: req.headers,
      }
    });
  }

  if (isLoggedIn && authFile) {
    // return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!isLoggedIn && !authFile) {
    // return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next({
    request:{
      headers: req.headers,
    }
  });
})

export const config = {
  matcher: ["/dashboard", "/register", "/login","/candidates/:path*","/jobs/:path*","/api"],
};
