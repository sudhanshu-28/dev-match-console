import { useSelector } from "react-redux";

const Requests = () => {
  const { data: connectionRequests } = useSelector((store) => store?.request);

  return (
    <div className="w-full flex justify-center text-gray-700">
      <div className="w-1/2  rounded-xl bg-base-300 my-6">
        <div className="p-5">
          <h1 className="text-lg text-start items-center">{`Connection Requests`}</h1>
        </div>
        <div className="border-t border-gray-800"></div>

        {connectionRequests &&
          connectionRequests.map((record) => {
            const { fromUserId } = record;
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              fromUserId;

            const fullName = `${firstName} ${lastName}`;

            return (
              <div key={_id} className="p-5 flex flex-col gap-4">
                <div className="w-full bg-base-100 flex h-24 rounded-xl p-4 gap-5">
                  <div className="avatar">
                    <div className="w-16 rounded-xl">
                      <img src={photoUrl} />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center w-full">
                    <div className="font-bold">{fullName}</div>
                    {gender && age && (
                      <div className="text-sm opacity-60">{`${gender}, ${age}`}</div>
                    )}
                    <div className="text-sm opacity-70 line-clamp-1">
                      {about}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button className="btn btn-sm btn-ghost">{`Reject`}</button>
                    <button className="btn btn-sm btn-outline btn-primary">
                      {`Accept`}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Requests;
