// If I were to use reel data, I would do this instead

// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { mockPosts } from "../data";
// import { BlogPost } from "../blog/BlogPost";

// const PostPage: React.FC = () => {
//   const [post, setPost] = React.useState<any>(null);
//   const [error, setError] = React.useState<string | null>(null);
//   const [loading, setIsLoading] = React.useState<boolean>(false);

//   const { id } = useParams<{ id: string }>();
//   // const post =mockPosts.find((p) => p.id === Number(id));

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Replace with your actual API endpoint
//         const response = await fetch("http://127.0.0.1:8000/api/users/2/posts");
//         if (!response.ok) throw new Error("Failed to fetch posts");
//         const data = await response.json();
//         const foundPost = data.find((p: any) => p.id === Number(id));
//         setPost(foundPost);
//         console.log("Reel post from a backend: ", foundPost);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "Failed to fetch blog posts"
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (!post) {
//     return (
//       <div className="text-center py-20 text-gray-600">
//         <h1 className="text-2xl">Post not found</h1>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white mt-10">
//       <BlogPost {...post} />
//     </main>
//   );
// };

// export default PostPage;

import React from "react";
import { useParams } from "react-router-dom";
import { mockPosts } from "../data";
import { BlogPost } from "../blog/BlogPost";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h1 className="text-2xl">Post not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white mt-10">
      <BlogPost {...post} />
    </main>
  );
};

export default PostPage;
