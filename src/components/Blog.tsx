import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../utils/hooks';
import { BookOpen, Clock, Tag } from 'lucide-react';
import type { BlogPost } from '../types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const blogRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(blogRef, { threshold: 0.1 });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Temporary mock data while API is not available
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: 1,
        title: 'Building Scalable Microservices with Spring Boot',
        content: 'Learn how to design and implement scalable microservices architecture using Spring Boot and best practices...',
        image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        author: 'John Doe',
        date: '2024-03-15',
        readTime: '8 min read',
        tags: ['Microservices', 'Spring Boot', 'Java']
      },
      {
        id: 2,
        title: 'Financial Technology: The Future of Banking',
        content: 'Exploring how modern technology is reshaping the banking industry and creating new opportunities...',
        image: 'https://images.pexels.com/photos/7567444/pexels-photo-7567444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        author: 'Jane Smith',
        date: '2024-03-10',
        readTime: '6 min read',
        tags: ['FinTech', 'Banking', 'Technology']
      }
    ];
    
    setPosts(mockPosts);
    setIsLoading(false);
  }, []);

  return (
    <section 
      id="blog" 
      className="py-20 bg-gray-50 dark:bg-gray-800"
      ref={blogRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div 
            className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <BookOpen className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
              Blog
            </h2>

            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="flex items-center text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full"
                        >
                          <Tag size={14} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;