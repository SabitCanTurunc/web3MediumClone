"use client"
import { useEffect } from 'react';

import uploadFileToPinata from '@/helpers/upload-file-to-pinata.helper'
import { NextPage } from 'next'
import React, { useRef, useState } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import process from 'process'
import { usePostOperations } from '@/hooks/use-post-operations.hook';
import toast from 'react-hot-toast';

export type PostDataType = {
    title: string;
    content: string;
    image: string;
}

const CreatePostPage: NextPage = () => {

    const fileRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);


    const [data, setData] = useState<PostDataType>({
        title: '',
        content: '',
        image: ''
    });

    const openBrowse = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const {addPost,isConfirmed, isConfirming}=usePostOperations();
    const isLoading = isConfirming||isSubmitting
    // const isDisabled= isLoading || !isConfirmed

    useEffect(() => {
        if(isConfirmed){
            toast.dismiss("loading1");
            toast.success("post created");

        }
        
    }, [isConfirmed]);

    //sunucuyu yoruyor
    // useEffect(() => {
    //     console.log("datadaki gümcel data", data);
    // }, [data]);


    const handleSubmit = () => {
        if (data.title && data.content && file) {
            setIsSubmitting(true);
            uploadFileToPinata(file).then((url) => {
                if (url) {
                    setData({
                        ...data,
                        image: url,
                    });

                    console.log("File uploaded to Pinata. Image URL:", url);
                    addPost({
                        title:data.title,
                        description:data.content,
                        image:url
                    });
                }
            }).finally(() => {
                setIsSubmitting(false);
            });
        }
    };

    // const datayi = () => { console.log(data) }


    return (
        <div className="min-h-screen md:p-10 items-center gap-2">
            <div
                onClick={openBrowse}
                className="w-full bg-gray-400 rounded-md h-[15vh] flex place-content-center place-items-center"
            >
                <IoCloudUploadOutline size={80} color="white" />
            </div>
            <input
                type="file"
                ref={fileRef}
                hidden
                onChange={(e) => {
                    if (e.target.files) {
                        setFile(e.target.files[0]);
                    }
                }}
            />
            <input
                type="text"
                placeholder="Title"
                className="font-serif text-6xl outline-none w-full mt-5"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                value={data.title}
            />
            <textarea
                placeholder="Write your thoughts here!"
                className="font-serif text-6xl outline-none w-full mt-5"
                onChange={(e) => setData({ ...data, content: e.target.value })}
                value={data.content}
            />
            <div className="text-center">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-green-500 text-xl px-6 py-2 rounded-md font-serif"
                >
                    Create post

                </button>
            </div>

            
        </div>
    );
};

export default CreatePostPage;
