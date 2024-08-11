import PostForm from "@/components/tailAdmin/posts/postForm";
import PostUpdateForm from "@/components/tailAdmin/posts/postUpdateForm";
import axios from "axios";
import React from "react";

async function PostId({ params }: { params: { id: string } }) {
  const id = params.id;
  let data = [];
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/post/${id}`);
    data = res.data;
  } catch (error) {
    console.log(error);
  }
  

  return <PostUpdateForm post={data} isUpdate/>;
}

export default PostId;
