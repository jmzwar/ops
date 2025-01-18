import { useState } from "react";
import Image from "next/image";
import { useAI } from "~~/hooks/useAI";
import { Nft } from "~~/hooks/useNfts";

const colors = ["#41D39C", "#FEDD79", "#FDC4C7", "#A2D6F1"];

export const NftItem = ({ nft, i }: { nft: Nft; i: number }) => {
  const [imageUrl, setImageUrl] = useState(nft.display_image_url);
  const [loading, setLoading] = useState(false);

  const { mutateAsync } = useAI(nft.display_image_url || "");

  const handleRegenerate = async () => {
    setLoading(true);
    const res = await mutateAsync();

    if (res.data) {
      setImageUrl(res.data[0].url);
    }
    setLoading(false);
  };

  return (
    <div className="relative w-64 h-64 mt-12" key={nft.identifier}>
      <div
        className="absolute top-7 left-7 w-64 h-64 border-[#141413] border-2"
        style={{ backgroundColor: colors[i % colors.length] }}
      ></div>
      <div className="relative w-64 h-64 bg-white border border-[#141413] border-2 flex items-center justify-center overflow-hidden">
        {/* Regenerate Button */}
        <button
          disabled={loading}
          className={`absolute bottom-2 right-2 z-10 bg-[${colors[i % colors.length]}] text-[#141413] bold px-3 py-2 rounded shadow-lg`}
          onClick={() => handleRegenerate()}
        >
          {loading ? "Regenerating..." : "Regenerate"}
        </button>

        {/* Background Image */}
        <Image
          src={imageUrl || "/papersea.svg"}
          alt={nft.description}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACgAKADASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDoIqNVAAABAAAAEAAAAAAAAABpFQUAAAEAAAAQAAAAAAAAAGkVBQAAAQAAABAAAAAAAAAAaRUFAAABAAAAEAAAAAAAAABpFQUAAAEAAAAQAAAAAAAAAGkVBQAAAQAAABAAAAAAAAAAaRUFAAABAAAAEAAAAAAAAABpFQUAAAEAAAAQAAAAAAAAAGkVBQAAAQAAABAAAAAAAAAAaRUFAAABAAAAEAAAAAAAAAB//9k="
        />
      </div>
    </div>
  );
};
