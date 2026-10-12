// import { create } from "domain";
import React from "react";

type BlogPostProps = {
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const BlogPost: React.FC<BlogPostProps> = ({
  title,
  content,
  image,
  author,
  date,
  readTime,
  tags,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fadeIn">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-2xl shadow-lg mb-8"
      />
      <div className="mb-4">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          By <span className="font-semibold">{author}</span> • {readTime} •{" "}
          {date}
        </p>
      </div>
      <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
        <p>{content}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-teal-400/20 text-teal-600 dark:text-teal-400 rounded-full text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
