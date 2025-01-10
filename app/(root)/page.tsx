import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const { query } = await searchParams;
  const session = await auth();

  const params = { search: query || null};
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })

  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch your startup, <br /> connect with entrepreneus</h1>
      <p className="sub-heading">Submit Ideas, Vote on pitches, Get noticed in virtual competitions</p>
      <SearchForm  query={query} />
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        { query ? `Search result for "${query}"` : 'All Startups'}
      </p>
      <ul className="mt-7 card_grid">
        {
          posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups found.</p>
          )
        }
      </ul>
    </section>
    <SanityLive />
    </>
  );
}
