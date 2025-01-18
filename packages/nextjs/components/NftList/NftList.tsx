import { NftItem } from "./NftItem";
import { NftListLoading } from "./NftListLoading";
import { useNfts } from "~~/hooks/useNfts";

export const NftList = ({ address }: { address?: string }) => {
  const { data, isLoading } = useNfts({ chain: "ethereum", address: address || "" });

  if (isLoading) return <NftListLoading />;
  return (
    <div>
      {data?.nfts.length === 0 && (
        <div className="flex items-center justify-center w-full h-full mt-12">
          <p className="text-center">No NFTs found</p>
        </div>
      )}
      <div className="mt-4 flex w-full justify-around flex-wrap">
        {data?.nfts.map((nft, index) => <NftItem key={nft.identifier} nft={nft} i={index} />)}
      </div>
    </div>
  );
};
