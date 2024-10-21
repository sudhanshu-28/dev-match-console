import { useSelector } from "react-redux";

import ConnectionTable from "./ConnectionTable";

const Requests = () => {
  const { data } = useSelector((store) => store?.request);

  let connectionRequests = [];

  if (data) {
    connectionRequests = data.map((user) => ({ ...user?.fromUserId }));
  }

  return (
    <div className="w-full flex justify-center items-start my-6">
      <div>
        <div className="my-4">
          <h1 className="text-bold text-2xl">{`Connection Requests`}</h1>
        </div>

        <div>
          <ConnectionTable connectionsList={connectionRequests} />
        </div>
      </div>
    </div>
  );
};

export default Requests;
