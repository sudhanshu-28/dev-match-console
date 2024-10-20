import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store?.user);

  const [userDetail, setUserDetail] = useState(null);
  const [isUpdating, setUpdating] = useState(false);

  const handleChange = (key, value) => {
    const obj = Object.assign({}, userDetail);
    obj[key] = value;
    setUserDetail(obj);
  };

  useEffect(() => {
    if (user) {
      setUserDetail(user);
    }
  }, [user]);

  if (!user) return;

  return (
    <div className="flex w-full flex-col lg:flex-row px-6 justify-center gap-6 py-10">
      <div className="card bg-base-300 w-full shadow-xl">
        <div className="card-body">
          {/* Title  */}
          <h2 className="card-title">{`Update Profile Details`}</h2>

          <div className="mt-4">
            <div className="flex w-full gap-4">
              {/* First Name */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`First Name`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter First Name"
                    value={userDetail?.firstName}
                    onChange={(e) =>
                      handleChange("firstName", e?.target?.value)
                    }
                  />
                </label>
              </div>

              {/* Last Name */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`Last Name`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Enter Last Name"
                    value={userDetail?.lastName}
                    onChange={(e) => handleChange("lastName", e?.target?.value)}
                  />
                </label>
              </div>
            </div>

            <div className="flex w-full gap-4 mt-4">
              {/* Age */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`Age`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="number"
                    className="grow"
                    placeholder="Enter Age"
                    min={12}
                    max={100}
                    value={userDetail?.age}
                    onChange={(e) => handleChange("age", e?.target?.value)}
                  />
                </label>
              </div>

              {/* Gender */}
              <div className="w-full">
                <div className="label">
                  <span className="label-text">{`Gender`}</span>
                </div>

                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Select Gender"
                    value={userDetail?.gender}
                    onChange={(e) => handleChange("gender", e?.target?.value)}
                  />
                </label>
              </div>
            </div>

            {/* Profile Photo URL */}
            <div className="mt-4">
              <div className="label">
                <span className="label-text">{`Profile URL`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter valid Photo URL"
                  value={userDetail?.photoUrl}
                  onChange={(e) => handleChange("photoUrl", e?.target?.value)}
                />
              </label>
            </div>

            {/* About Me */}
            <div className="mt-4">
              <div className="label">
                <span className="label-text">{`About Me`}</span>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Write a brief introduction about yourself here..."
                  value={userDetail?.about}
                  onChange={(e) => handleChange("about", e?.target?.value)}
                />
              </label>
            </div>

            {/* Your Skills */}
            <div className="mt-4">
              <div className="label">
                <span className="label-text">{`Skills`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your Skills"
                  value={userDetail?.skills || ""}
                  onChange={(e) => handleChange("skills", e?.target?.value)}
                />
              </label>
            </div>
          </div>

          {/* Save button  */}
          <div className="flex justify-start mt-3.5">
            <button
              className={`btn btn-primary btn-square w-full ${
                isUpdating ? `btn-disabled` : ``
              }`}
              // onClick={handleLogin}
            >
              {isUpdating && <span className="loading loading-spinner"></span>}
              {isUpdating ? `Saving...` : `Save`}
            </button>
          </div>
        </div>
      </div>

      <div className="divider lg:divider-horizontal"></div>

      <div className="card bg-base-300 w-full shadow-xl">
        <div className="card-body">
          {/* Header  */}
          <h2 className="card-title">{`Update Profile Details`}</h2>

          <div className="mt-2">
            {/* First Name */}
            <div>
              <div className="label">
                <span className="label-text">{`First Name`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter First Name"
                  // value={loginObj?.emailId}
                  // onChange={(e) => handleChange("emailId", e?.target?.value)}
                />
              </label>
            </div>

            {/* Last Name */}
            <div className="mt-2">
              <div className="label">
                <span className="label-text">{`Last Name`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter Last Name"
                  // value={loginObj?.emailId}
                  // onChange={(e) => handleChange("emailId", e?.target?.value)}
                />
              </label>
            </div>

            {/* Password */}
            <div className="mt-2">
              <div className="label">
                <span className="label-text">{`Password`}</span>
              </div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="********"
                  // value={loginObj?.password}
                  // onChange={(e) => handleChange("password", e?.target?.value)}
                />
              </label>
            </div>
          </div>

          {/* Signin button  */}
          <div className="flex justify-start mt-3.5">
            <button
            // className={`btn btn-primary btn-square w-full ${
            //   isProcessing ? `btn-disabled` : ``
            // }`}
            // onClick={handleLogin}
            >
              {/* {isProcessing && ( */}
              {/* <span className="loading loading-spinner"></span> */}
              {/* )} */}
              {/* {isProcessing ? `Signing in...` : `Sign in`} */}
              {`Sign in`}
            </button>
          </div>

          {/* Signup  */}
          <div className="mt-2">
            <p className="text-sm">
              {`Don't have an account yet?`}
              <a href="#" className=" link-primary ml-2">
                {`Sign up`}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
