import Image from "next/image";
import { NftListLoading } from "./NftListLoading";
import { useNfts } from "~~/hooks/useNfts";

const colors = ["#41D39C", "#FEDD79", "#FDC4C7", "#A2D6F1"];

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
        {data?.nfts.map((nft, index) => (
          <div className="relative w-64 h-64 mt-12" key={nft.identifier}>
            <div
              className="absolute top-7 left-7 w-64 h-64 border-[#141413] border-2"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white border border-[#141413] border-2 flex items-center justify-center overflow-hidden">
              <Image
                src={nft.display_image_url || "./papersea.svg"}
                alt={nft.description}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACgAKADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDoIqNVAAABAAAAEAAAAAAAAABpFQUAAAEAAAAQAAAAAAAAAGkVBQAAAQAAABAAAAAAAAAAaRUFAAABAAAAEAAAAAAAAABpFQUAAAEAAAAQAAAAAAAAAGkVBQAAAQAAABAAAAAAAAAAaRUFAAABAAAAEAAAAAAAAABpFQUAAAEAAAAQAAAAAAAAAGkVBQAAAQAAABAAAAAAAAAAaRUFAAABAAAAEAAAAAAAAAB//9k="
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
