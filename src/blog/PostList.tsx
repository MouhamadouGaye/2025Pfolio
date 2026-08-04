import { useEffect, useState } from "react";
import { getPosts } from "../api/kobe-blog";
import "./PostList.css";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}
interface HeaderProps {
  isDarkMode: boolean;
}

// export default function PostList() {
const PostList: React.FC<HeaderProps> = ({ isDarkMode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="blog-container">
      <h1 className="title">My Blog</h1>

      <div className="posts-grid">
        {posts &&
          posts.map((post: any) => (
            <Link
              to={`/posts/${post.id}`}
              className={`post-card ${isDarkMode ? "bg-slate-500" : "bg-gray-300"}`}
              key={post.id}
            >
              <img src={post.imageUrl} />

              <div className="post-content">
                <h3 className={isDarkMode ? "text-white" : "text-slate-700"}>
                  {post.title}
                </h3>
                <p className={isDarkMode ? "text-white" : "text-slate-700"}>
                  {post.content.substring(0, 120)}...
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
export default PostList;
