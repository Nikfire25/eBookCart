import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../services";
import { useTitle } from "../hooks/useTitle";

export const Register = () => {
  useTitle("Register");
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const authDetail = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value,
      };
      const data = await register(authDetail);
      data.accessToken
        ? toast.success("User registered")
        : toast.error("Email already exists");
      if (data.accessToken) {
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("ebid", JSON.stringify(data.user.id));
      }
      navigate("/products");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
          Register
        </p>
      </section>

      <form onSubmit={handleRegister}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Your Name"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="youremail@example.com"
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
            minLength="7"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Register
        </button>
      </form>
    </main>
  );
};
