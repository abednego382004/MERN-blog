import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAcrion from "../component/CallToAcrion";
import CommentSection from "../component/CommentSection";
import PostCard from "../component/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center  min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-5 self-center"
      >
        <Button color="gray" pill size="xm">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.Image}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>
          {post && (post.content.length / 1000).toFixed(0)} mins read{" "}
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAcrion />
      </div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex flex-col md:flex-row gap-5 mt-5 justify-center">
          {recentPost &&
            recentPost.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
