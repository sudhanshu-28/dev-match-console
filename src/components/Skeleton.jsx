export const CardSkeleton = () => {
  return (
    <div className="flex w-52 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export const ProfileSkeleton = () => (
  <div className="w-full bg-base-100 flex h-24 rounded-xl p-4 gap-5 justify-between">
    <div className="flex items-center gap-4">
      <div className="skeleton bg-gray-300 h-16 w-16 shrink-0 rounded-xl"></div>
      <div className="flex flex-col gap-2">
        <div className="skeleton h-4 w-32"></div>
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-80"></div>
      </div>
    </div>
    <div className="flex gap-2 items-center">
      <div className="skeleton bg-gray-300 h-8 w-16 shrink-0 rounded-xl"></div>
      <div className="skeleton bg-gray-300 h-8 w-16 shrink-0 rounded-xl"></div>
    </div>
  </div>
);
