"use client"

import { Button } from "@/components";
import { PostCard } from "@/components/Cards/post-card.conponent";
import { usePostOperations } from "@/hooks/use-post-operations.hook";
import Image from "next/image";
import { formatUnits } from "viem";

export default function HomePage() {

  const {useGetPosts}=usePostOperations();
  const {data,isLoading}=useGetPosts();

  return (
    <main className="w-full min-h-screen md:px-10 py-5 p-5">
      {data?.map((post)=>{
        return(<PostCard
        title={post?.title}
        content={post?.description}
        id={Number(formatUnits(post?.id,0))}
        image={post?.image}
        author={post?.author}


        />)
      })}
    </main>
  );
}
