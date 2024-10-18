const Login = () => {
  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          {/* Header  */}
          <h2 className="card-title">{`Sign in to your account`}</h2>

          <div className="mt-2">
            {/* Email */}
            <div>
              <div className="label">
                <span className="label-text">{`Email`}</span>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="name@company.com"
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
                  value=""
                  placeholder="********"
                />
              </label>
            </div>
          </div>

          {/* Signin button  */}
          <div className="flex justify-start mt-3.5">
            <button className="btn btn-primary btn-square w-full">
              {`Sign in`}
              {/* <span className="loading loading-spinner"></span> */}
              {/* loading */}
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

export default Login;
