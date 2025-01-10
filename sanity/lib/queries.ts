import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`*[ _type == 'startup' && defined(slug.current) && !defined($search) || title match $search || author->name match $search || category match $search] | order(_createdAt desc)
{
    _id,
    slug,
    title,
    description,
    views,
    image,
    author -> {
        _id, name, image, bio
    },
    category,
    _createdAt
}`)

export const STARTUP_BY_ID = defineQuery(`*[ _type == 'startup' && _id == $id][0]
{
    _id,
    slug,
    title,
    description,
    views,
    image,
    author -> {
    _id, name, username, image, bio
    },
    category,
    _createdAt,
    pitch,
}`)

export const STARTUP_VIEWS_QUERY = defineQuery(`*[ _type == 'startup' && _id == $id][0]
{
    id,
    views
}`)

export const USER_BY_GITHUB_ID_QUERY = defineQuery(`*[_type == 'author' && id == $id ][0]
{
    _id,
    id,
    name,
    username,
    image,
    bio,
}`)

export const AUTHOR_BY_ID_QUERY = defineQuery(`*[_type == 'author' && _id == $id ][0]
    {
        _id,
        id,
        name,
        username,
        image,
        bio,
    }`)

export const USER_STARTUPS_QUERY = defineQuery(`*[ _type == 'startup' && author._ref == $id] | order(_createdAt desc)
    {
        _id,
        slug,
        title,
        description,
        views,
        image,
        author -> {
            _id, name, image, bio
        },
        category,
        _createdAt
    }`)

export const PLAYLIST_BY_SLUG_QUERY = defineQuery(`*[_type == "playlist" && slug.current == $slug][0]
    {
    _id,
    title,
    slug,
    select[]->{
      _id,
      _createdAt,
      title,
      slug,
      author->{
        _id,
        name,
        slug,
        image,
        bio
      },
      views,
      description,
      category,
      image,
      pitch
    }
  }`);
