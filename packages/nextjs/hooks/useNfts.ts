import { useQuery } from "@tanstack/react-query";

export interface Nft {
  collection: string;
  contract: string;
  description: string;
  display_animation_url: string | null;
  display_image_url: string | null;
  identifier: string | null;
  image_url: string;
  is_disabled: boolean;
  is_nsfw: boolean;
  metadata_url: string;
  name: string;
  opensea_url: string;
  token_standard: string;
  updated_at: string;
}

interface NftResponse {
  nfts: Array<Nft>;
}

export const useNfts = ({ chain, address }: { chain: string; address: string }) => {
  return useQuery({
    queryKey: ["nfts", chain, address],
    queryFn: async (): Promise<NftResponse> => {
      try {
        const response = await fetch(`https://api.opensea.io/api/v2/chain/${chain}/account/${address}/nfts`, {
          headers: { "x-api-key": process.env.NEXT_PUBLIC_OPENSEA_API_KEY || "", accept: "application/json" },
        });

        return response.json();
      } catch (error) {
        return { nfts: [] };
      }
    },
  });
};
