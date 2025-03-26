import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAcrion from "../component/CallToAcrion";
import PostCard from "../component/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        setPosts(data.posts);
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my blog</h1>
        <p className="text-gray-400 text-xs ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          officiis adipisci nulla corporis?
        </p>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3  bg-teal-200 dark:bg-transparent">
        <CallToAcrion />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View All posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
