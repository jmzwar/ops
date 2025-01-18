import { useMutation } from "@tanstack/react-query";

export const useAI = (imageUrl: string) => {
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl }),
        });

        return res.json();
      } catch (error) {
        return { data: [] };
      }
    },
  });
};
