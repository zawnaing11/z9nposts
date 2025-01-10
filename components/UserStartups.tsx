import { client } from '@/sanity/lib/client'
import { USER_STARTUPS_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupCardType } from './StartupCard';

const UserStartups = async ({ id }: { id: string}) => {
    const startups = await client.withConfig({ useCdn: false}).fetch(USER_STARTUPS_QUERY, { id });

  return (
    <>
        {
            startups.length > 0
            ?
            startups.map((startup: StartupCardType) => (
                <StartupCard key={startup._id} post={startup} />
            ))
            :
            <p className='no-result'>No Posts Yet</p>
        }
    </>
  )
}

export default UserStartups
