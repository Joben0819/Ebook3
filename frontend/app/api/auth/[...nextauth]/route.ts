import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "",
  pages: {
    signIn: "/auth",
    signOut: "api/auth/signout",
  },
  // callbacks: {
  //   async signIn({ account, profile }: any) {
  //     if (account.provider === "google") {
  //       console.log(profile);
  //       return profile.email_verified;
  //     }
  //     return true; // Do different verification for other providers that don't have `email_verified`
  //   },
  // },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
