import React from "react";
import PostTable from "@/components/tailAdmin/posts/postTable";
import axios from "axios";

async function Portfolio() {
  let posts;
  try {
    
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/post-key?key=portfolio`
    );
    posts = res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-black capitalize mb-5">
      portfolio posts
      </h1>
      {posts.length > 0 ? (
        <PostTable post={posts} />
      ) : (
        <h1 className="text-2xl font-semibold text-black capitalize mb-3">
          No Posts Available!
        </h1>
      )}
    </div>
  );
}

export default Portfolio;
