import NextAuth, { RequestInternal } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "../database/mongodb";
import dbConnect from "../database/connection";
import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions, SessionStrategy } from 'next-auth';
import { signIn } from "next-auth/react";


export const authOptions:AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId:process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method">) {
        // Your authorize logic here
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }
        await dbConnect();
        const user = await UserModel.findOne({ username: credentials.username });

        if (user && user.password === credentials.password) {
          return {
            id: user._id,
            name: user.username,
            email: user.email,
            image: "",
          }
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  session:{
    strategy:"jwt",
    maxAge:30*24*60*60,
  },
  callbacks: {
    async signIn(params){
      const {user,account,profile}=params;
      if(account?.provider==="google"){
        const { name, email } = user;

        await dbConnect();
        const existingUser = await UserModel.findOne({ username: name });
        if(existingUser){
          return true;
        }else{
          const newUser=new UserModel({
            username:name,
            email:email,
            password:" "
          });
          await newUser.save();
          return true
        }
      }
      return true;
    }
  }
}

export default NextAuth(authOptions);