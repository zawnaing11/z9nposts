import { auth } from '@/auth';
import { StartupCardSekleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

const Profile = async ({ params }: { params: Promise<{ id: string}>}) => {
    const { id } = await params;
    const session = await auth();
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

    if (!user) {
        return notFound();
    }

  return (
    <>
        <section className="profile_container">
            <div className="profile_card">
                <div className="profile_title">
                    <h3 className='text-24-black uppercase text-center line-clamp-1'>
                        {user.name}
                    </h3>
                </div>
                <Image
                    src={user.image}
                    alt={user.image}
                    className='profile_image'
                    width={220}
                    height={220}
                />
                <p className="text-30-extrabold text-center mt-7">
                    @{user?.username}
                </p>
                <p className="text-14-normal mt-1 text-center">
                    {user?.bio}
                </p>
            </div>
            <div className="flex flex-col flex-1 gap-5 lg:-mt-5">
                <p className="text-30-bold">
                    {session?.id == id ? 'Your' : 'All'} Startups
                </p>
                <ul className='card_grid-sm'>
                    <Suspense fallback={<StartupCardSekleton />}>
                        <UserStartups id={id} />
                    </Suspense>
                </ul>
            </div>
        </section>
    </>
  )
}

export default Profile
