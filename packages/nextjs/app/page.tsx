"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { NftList } from "~~/components/NftList/NftList";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  return (
    <>
      <div className="flex items-center flex-col flex-grow mt-16">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary-content">Welcome to PaperSea</h2>
        {!isConnected ? <p className="">Connect your wallet to get started</p> : <NftList address={address} />}
      </div>
    </>
  );
};

export default Home;
