import NextAuth, { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db/prisma'; // Adjust based on your project structure

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Extend the session user type with an id field
      name?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'you@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error('No user found with that email.');
        }

        const isValidPassword = await bcrypt.compare(
          credentials?.password || '',
          user.password
        );

        if (!isValidPassword) {
          throw new Error('Incorrect password.');
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.firstName,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Here we handle the user profile from Google
        let existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!existingUser) {
          // If no user is found, create a new one
          const newUser = await prisma.user.create({
            data: {
              email: profile.email,
              firstName: '',
              lastName: '',
              password: '',
            },
          });
          existingUser = newUser;
        }

        // Return the user object with the correct user_id (from the database)
        return {
          id: existingUser.id.toString(),
          email: existingUser.email,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const, // Correcting session strategy type
    maxAge: 2 * 24 * 60 * 60, // Session duration in seconds (2 days)
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Check if the user is logged in via Google
      // If they are authenticated via Google, we will redirect to the registration page
      if (url === baseUrl) {
        return `${baseUrl}/auth/complete-registration`;
      }
      return url;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;

        // If a user is present, extract the name and email
        // const nameParts = user.name?.split(' ') || [];
        // token.firstName = nameParts[0]; // Take the first part as firstName
        // token.lastName = nameParts.slice(1).join(' ');
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id; // Add id to session user
        // session.user.firstName = token.firstName as string | null | undefined;
        // session.user.lastName = token.lastName as string | null | undefined;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
