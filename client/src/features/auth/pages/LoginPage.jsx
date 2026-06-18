import { useState } from "react";
import Button from "../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/apiAuth";
import navigate from "navigate";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [logged, setLog] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ email, password });

      console.log("Login success:", res.data);
      setLog(true);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      alert(message);
      console.log(err.response?.data || err);
    }
  };
  return (
    <>
      <section className="grid md:grid-cols-2 min-h-screen">
        <div className="bg-hero flex flex-col justify-center px-10 md:px-20">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
          <p className="opacity-80">Learn GitHub with GitHero</p>
        </div>

        <div className="bg-white text-black flex flex-col justify-center px-10 md:px-30">
          <h4 className="font-semibold">Sign in to GitHero</h4>

          <form
            className="flex flex-col gap-4 mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" bcolor="primary">
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-sm">
            New to GitHero?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </p>
          <footer className="mt-4 text-gray-600 text-[12px]">
            By signing in, you agree to our{" "}
            <Link className="text-blue-600 underline">Term of Service</Link> and{" "}
            <Link className="text-blue-600 underline">Privacy Policy</Link> We
            respect your data and only use it to improve your learning
            experience.
          </footer>
        </div>
      </section>
    </>
  );
};
export default LoginPage;

const Input = ({ label, type, placeholder, value, onChange, note }) => (
  <label className="flex flex-col text-sm gap-1 flex-1">
    <span>{label}</span>
    <input
      className="input border-gray-300"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
    {note && <span className="text-[12px] text-gray-500">{note}</span>}
  </label>
);
