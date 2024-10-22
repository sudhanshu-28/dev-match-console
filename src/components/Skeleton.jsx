export const FeedSkeleton = () => (
  <div className="card bg-base-100 w-96 shadow-xl">
    <figure className="skeleton w-96 h-72 overflow-hidden"></figure>
    <div className="card-body">
      <div className="card-actions flex flex-col">
        <div className="skeleton h-6 w-28"></div>
        <div className="skeleton h-4 w-16"></div>
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>

      <div className="flex py-5 gap-2 justify-center">
        <div className="skeleton h-10 w-20 shrink-0 rounded-xl"></div>
        <div className="skeleton h-10 w-20 shrink-0 rounded-xl"></div>
      </div>
    </div>
  </div>
);

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
