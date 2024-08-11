import PostForm from '@/components/tailAdmin/posts/postForm'
import PostTable from '@/components/tailAdmin/posts/postTable'
import { getPostData } from '@/constants/admin/postData';
import React from 'react'

async function Posts() {
  const post = await getPostData();
  return (
    <div>
      <PostForm/>
      <PostTable post={post}/>
    </div>
  )
}

export default Posts