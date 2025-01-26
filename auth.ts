import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";

export const config = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 daysS
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        //find user in db

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        //check if user exists and password matches

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );

          //if password is correct, return user

          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        //if user does not exists or password does not match, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      //set userid from token
      if (token.sub) {
        session.user.id = token.sub;
      }
      session.user.role = token.role;
      session.user.name = token.name;
      //if there is an update, set the user name
      if (trigger === "update" && token.name) {
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({token, user, trigger, session}: any) {
      if (user) {
        token.role = user.role;
// if user has no name then use the email
        if(user.name==='NO_NAME'){
          token.name=user.email!.split('@')[0];

          //update db to reflect the token name
          await prisma.user.update({
            where:{
              id:user.id,
            },
            data:{
              name:token.name,
            },
          })
        }
      }
      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name;
      }

      return token;
      }    
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
