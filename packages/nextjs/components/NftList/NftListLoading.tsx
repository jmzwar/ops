export const NftListLoading = () => {
  return (
    <div className="flex items-center justify-around w-full h-full mt-12 px-64">
      <div className="relative w-64 h-64">
        <div className="absolute top-7 left-7 w-64 h-64 bg-[#FEDD79] border-[#141413] border-2"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white border border-[#141413] border-2 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg bg-[#FEDD79]"></span>
        </div>
      </div>
      <div className="relative w-64 h-64">
        <div className="absolute top-7 left-7 w-64 h-64 bg-[#41D39C] border-[#141413] border-2"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white border border-[#141413] border-2 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg bg-[#41D39C]"></span>
        </div>
      </div>
      <div className="relative w-64 h-64">
        <div className="absolute top-7 left-7 w-64 h-64 bg-[#A2D6F1] border-[#141413] border-2"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white border border-[#141413] border-2 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg bg-[#A2D6F1]"></span>
        </div>
      </div>
    </div>
  );
};
