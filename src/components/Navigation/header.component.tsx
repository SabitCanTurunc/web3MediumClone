import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "../Buttons/connect-wallet-button.component";
import Image from 'next/image';
import { FaEdit } from "react-icons/fa";


export const Header = () => {
  return (
    <div className="w-full border-b border-[#2d2d2d] flex items-center justify-between md:px-10 p-5 py-5">
      <Link href={"/"} className="text-xl md:text-3xl 2xl:text-4xl font-bold">
        <span className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            width={60}
            height={60}
            alt="Medium logo"
          />
          <span className="font-serif">Medium</span>
        </span>
      </Link>

      <div className="flex items-center gap-4 ">
        <Link href={"/create-post"} >

          <span className="flex items-center gap-1">
            <span>Write</span>
            <FaEdit size={24}/>
          </span>
        </Link>
        <ConnectButton />
      </div>



    </div>
  );
};
