import Link from 'next/link'
import React from 'react'
import { auth, signIn, signOut } from '@/auth'

const Navbar = async () => {
    const session = await auth();

    return (
        <header className='px-5 py-3 bg-white font-work-sans shadow-sm'>
            <nav className='flex justify-between items-center'>
                <Link href={'/'}>
                    {/* <img src='/logo.png' alt='logo' className='h-10 cursor-pointer' /> */}
                    <p className='text-2xl font-bold'>Z9NPOSTS</p>
                </Link>
                <div className='flex items-center gap-5'>
                    {
                        session ? (
                            <>

                                <Link href={'/startup/create'}>
                                    <span>New</span>
                                </Link>
                                <Link href={`/user/${session?.id}`}>
                                    <span>{session?.user?.name}</span>
                                </Link>
                                <form action={async () => {
                                    'use server';
                                    await signOut();
                                }}>
                                    <button type='submit'>Logout</button>
                                </form>
                            </>
                        )
                            :
                            (
                                <>
                                    <form action={async () => {
                                        'use server';
                                        await signIn('github')
                                    }}>
                                        <button type='submit'>Login</button>
                                    </form>
                                </>
                            )
                    }
                </div>
            </nav>
        </header>
    )
}

export default Navbar
