// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },

//       async authorize(credentials) {
//         const email = credentials.email as string;
//         const password = credentials.password as string;

//         if (!email || !password) return null;

//         const user = await prisma.user.findUnique({
//           where: {
//             email,
//           },
//         });

//         if (!user) return null;

//         const validPassword = await bcrypt.compare(
//           password,
//           user.password
//         );

//         if (!validPassword) return null;

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//       }

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/login",
//   },
// });

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import authConfig from "./auth.config";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) return null;

        const validPassword = await bcrypt.compare(
          password,
          user.password
        );

        if (!validPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});