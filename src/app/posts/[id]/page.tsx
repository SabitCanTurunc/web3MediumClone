"use client"
import { PostDataType } from '@/app/create-post/page';
import uploadFileToPinata from '@/helpers/upload-file-to-pinata.helper';
import { usePostOperations } from '@/hooks/use-post-operations.hook'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useAccount } from 'wagmi';

const CreatePostPage = ({ params }: { params: { id: string } }) => {

    const fileRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const { address } = useAccount();
    const [data, setData] = useState<PostDataType>({
        title: '',
        content: '',
        image: ''
    });

    const openBrowse = () => {
        if (fileRef.current && !disabled) {
            fileRef.current.click();
        }
    };

    const { updatePost, isConfirmed, isConfirming } = usePostOperations();
    const isLoading = isConfirming || isSubmitting
    // const isDisabled= isLoading || !isConfirmed


    useEffect(() => {
        if (isConfirmed) {
            toast.dismiss("loading1");
            toast.success("post uptadet");

        }

    }, [isConfirmed]);




    const handleSubmit = () => {
        if (post?.author === address) {
            if (data.title && data.content && file) {
                setIsSubmitting(true);
                if (file) {
                    uploadFileToPinata(file).then((url) => {
                        if (url) {
                            setData({
                                ...data,
                                image: url,
                            });

                            console.log("File uploaded to Pinata. Image URL:", url);
                            updatePost({
                                id: Number(id),
                                title: data.title,
                                description: data.content,
                                image: url
                            });
                        }
                    }).finally(() => {
                        setIsSubmitting(false);
                    });
                }else{
                    updatePost({
                        id: Number(id),
                        title: data.title,
                        description: data.content,
                        image: data.image
                    });
                }

            }

        }
    };

    const id = params.id;
    const { useGetPost } = usePostOperations();
    const { data: post, isLoading: isPostLoadong } = useGetPost(Number(id));

    const disabled = post?.author === address;
    useEffect(() => {
        if (post && !isPostLoadong) {
            setData({
                title: post.title,
                content: post.description,
                image: post.image,
            });
        }
    }, [post, isPostLoadong]);

    return (
        <div className="min-h-screen p-5 md:p-10 flex flex-col items-center gap-5">
            <div
                onClick={openBrowse}
                className="w-full bg-gray-400 rounded-md h-[15vh] flex items-center justify-center cursor-pointer"
            >
                {/* Image container */}
                {post?.image && (
                    <div className="relative w-full h-full">
                        <Image
                            src={post.image ?? ""}
                            alt="Post Image"
                            layout="fill" // Adjust the layout to fill the div
                            objectFit="cover" // Makes sure the image covers the div properly
                            className="rounded-md"
                        />
                    </div>
                )}
            </div>
            <div>

                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                    readOnly={disabled}
                />

            </div>

            {post?.title && <input
                type="text"
                placeholder="Title"
                className="font-serif text-6xl outline-none w-full mt-5"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                value={data.title}
                readOnly={disabled}

            />}
            {post?.description && <textarea
                placeholder="Write your thoughts here!"
                className="font-serif text-6xl outline-none w-full mt-5"
                onChange={(e) => setData({ ...data, content: e.target.value })}
                value={data.content}
                readOnly={disabled}

            />}
            {post?.author === address || isPostLoadong && <div className="text-center">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-green-500 text-xl px-6 py-2 rounded-md font-serif"
                >
                    Update post

                </button>
            </div>}


        </div>
    )
}

export default CreatePostPage
