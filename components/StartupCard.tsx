import { cn, formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
import { Skeleton } from './ui/skeleton';

export type StartupCardType = Omit<Startup, 'author'> & { author?: Author}

const StartupCard = ({ post }: { post: StartupCardType }) => {
    const { _id, title, description, image, category, _createdAt, views, author } = post;
  return (
    <li className='startup-card group'>
        <div className='flex-between'>
            <p className='startup_card_date'>{ formatDate(_createdAt) }</p>
            <div className='flex gap-1.5'>
                <EyeIcon className='size-6 text-primary' />
                <p className='text-16-medium'>{views}</p>
            </div>
        </div>
        <div className='flex-between mt-7 gap-5'>
            <div className="flex-1">
                <Link href={`/user/${author?._id}`}>
                    <p className='text-16-medium line-clamp-1'>{author?.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
                <Image src={author?.image!} alt={author?.name!} width={40} height={40} className='rounded-full' />
            </Link>
        </div>
        <Link href={`/startup/${_id}`}>
            <p className='startup_card_desc'>
                {description}
            </p>
            <img src={image} alt="placeholder" className='startup_card_img' />
        </Link>
        <div className='flex-between mt-5 gap-3'>
            <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-16-medium">{category}</p>
            </Link>
            <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${_id}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
  )
}

export const StartupCardSekleton = () => (
    <>
    {
        [0, 1, 2, 3].map(() => (
            <li key={cn('skeleton')}>
                <Skeleton className='startup-card_skeleton' />
            </li>
        ))
    }
    </>
)
export default StartupCard
