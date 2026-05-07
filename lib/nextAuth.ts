import { AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";




export const authOptions:AuthOptions = {
    debug: true,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
    ],
    session:{
        strategy: "jwt",
        maxAge: 80 * 24 * 60 * 60, // 80 days
    },
    callbacks:{
        // return token at login provider
        async jwt({token, account}){
            if (account){
                token.accessToken = account.access_token
                token.id_token = account.id_token
            }
            return token
        },
        async session({session, token}){
            if (token){
                session.id_token = token.id_token
            }
            return session
        }

    },
    secret: process.env.NEXTAUTH_SECRET
}