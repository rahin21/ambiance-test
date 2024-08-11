import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { connectToDatabase } from "@/app/api/helpers/server-helpers";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
      strategy: "jwt"
    },
    pages: {
      signIn: '/signin'
    },
    providers: [
      CredentialsProvider({
        name: "creds",
        credentials: {
          email: { label: "Email", placeholder: "Enter Email" },
          password: { label: "password", placeholder: "Enter Password" },
        },
        async authorize(credentials, req) {
          if (!credentials || !credentials.email || !credentials.password)
            return null;
          try {
            await connectToDatabase();
            const user = await prisma.user.findFirst({
              where: { email: credentials.email },
            });
            
            if(!user?.password){
              return null
            }
  
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password 
            )
            if(isPasswordCorrect){
              return user;
            }
            return null;
          } catch (error) {
            console.log(error);
            return null;
          } finally {
            await prisma.$disconnect();
          }
        },
      }),
    ],
    callbacks:{
      async jwt({token, user}){
        if(user){
          return{
            ...token,
            email: user.email
          }
        }
        return token
      },
      async session({session}){
        return{...session,
          user:{
            ...session.user,
          }
        }
        return session
      }
    }
    
  };