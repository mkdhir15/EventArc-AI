import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-gray-50 h-auto m-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 text-black dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-800">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium dark:text-text-500"
                  >
                    Name 
                  </label>
                  <input
                    name="Roles"
                    id="Roles"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-blue-300 dark:placeholder-gray-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Full Name "
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium dark:text-text-500"
                  >
                    Roll no
                  </label>
                  <input
                    name="Role no"
                    id="Role no"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-blue-300 dark:placeholder-gray-500  dark:focus:ring-blue-500 dark:focus:border-gray-500"
                    placeholder="Enter your Roll NO "
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium dark:text-text-500 "
                  >
                    Department
                  </label>
                  <input
                    name="Roles"
                    id="Roles"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-blue-300 dark:placeholder-gray-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Department"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium dark:text-text-500"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-blue-300 dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-text-500"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-amber-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-blue-100 dark:border-blue-300 dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border rounded bg-blue-100 focus:ring-3 focus:ring-blue-300 dark:bg-blue-100 dark:border-blue-600 dark:focus:ring-primary-600 dark:ring-offset-blue-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-600 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-md font-medium text-blue-800 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <a href="/admin">
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-600 mt-2"
                    onClick={() => {
                      navigate("/Dashboard");
                    }}
                  >
                    Sign in
                  </button>
                </a>
                <center>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-5">
                     Don't have an account yet?{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                </center>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;