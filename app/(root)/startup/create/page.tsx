import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await auth();

    if (!session) redirect('/');

  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <div className="heading">Submit Your Startup</div>
        </section>
        <StartupForm />
    </>
  )
}

export default page
