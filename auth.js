import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { USER_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: {name, email, image }, profile: { id, login, bio, }}) {
      const existingUser = await client.withConfig({useCdn: false}).fetch(USER_BY_GITHUB_ID_QUERY, {id})
      console.log('existingUser', existingUser)
      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id,
          name,
          email,
          username: login,
          image,
          bio: bio || '',
        })
      }
      return true;
    },
    async jwt({ token, profile, account}) {
      if (account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(USER_BY_GITHUB_ID_QUERY, { id: profile?.id });
        token.id = user?._id;
      }
      return token;
    },
    async session({ token, session}){
      Object.assign(session, {id: token.id})
      return session;
    }
  }
})
