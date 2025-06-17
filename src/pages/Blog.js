import React, { useState, useEffect } from 'react';
import BlogPost from '../components/BlogPost';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulate fetching blog posts from an API
    const fetchPosts = async () => {
      // Replace with actual API call
      const dummyPosts = [
        {
          id: 1,
          title: 'Getting Started with React',
          date: '2024-06-01',
          content: 'Learn the basics of React and how to build dynamic web applications...',
          imageUrl: '',
        },
        {
          id: 2,
          title: 'Understanding Node.js',
          date: '2024-06-10',
          content: 'A deep dive into Node.js and server-side JavaScript development...',
          imageUrl: '',
        },
      ];
      setPosts(dummyPosts);
    };

    fetchPosts();
  }, []);

  return (
    <section id="blog" className="blog-section">
      <div className="container">
        <div className="section-title">
          <h2>Blog</h2>
        </div>
        {posts.length === 0 ? (
          <p>Loading blog posts...</p>
        ) : (
          posts.map((post) => <BlogPost key={post.id} post={post} />)
        )}
      </div>
    </section>
  );
};

export default Blog;
