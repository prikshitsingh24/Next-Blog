import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../database/connection";
import { UserModel } from "../database/mongodb";
import {Provider} from "next-auth/providers";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Login",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials: any, req: any) {
          // Add logic here to look up the user from the credentials supplied
            if(!credentials || !credentials.username || !credentials.password){
                return null;
            }
            await dbConnect();
            const user= await UserModel.findOne({username:credentials.username})
    
          if (user && user.password===credentials.password) {
            return {
              name:user.username,
              email:user.email,
              image:""
            }
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        }
      }),

  ] as Provider[],
  secret:process.env.NEXTAUTH_SECRET,
  session:{
    strategy:"jwt",
    maxAge:30*24*60*60,
  },
  jwt:{
    encryption:true
  },
}

export default NextAuth(authOptions)