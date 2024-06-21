/**
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        user: {
            name?: string;
            email?: string;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string;
        userId?: string;
    }
}

async function verifyUserCredentials(email: string | undefined, password: string | undefined) {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/signin/admin`, {
            email: email,
            password: password,
            provider: "propertyverse"
        });
        // Assuming the response contains a token upon successful login
        const {user} = response.data;
        return user;
    } catch (error: any) {
        // Handle errors here, such as network errors or invalid credentials
        console.error('Error verifying user credentials:', error);
        throw new Error(error.response?.data?.message || 'Failed to authenticate user');
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const user = await verifyUserCredentials(credentials?.email, credentials?.password);
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60*60,
    },
    callbacks: {
        async jwt({token, user}: {token: JWT, user?: any}) {
            if(user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }: { session: Session | any, token: JWT }) {
            session.user = token.user;
            return session;
        }
    },
    secret: 'Secret',
});

export { handler as GET, handler as POST };
**/
