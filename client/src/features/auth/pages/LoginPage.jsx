import { useState } from "react";
import Button from "../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../../api/apiAuth";
import { useAuth } from "../../../context/AuthContext";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (loading) return;
    
    try {
      setLoading(true);

      const res = await loginAPI({ email, password });
      console.log(res.data);
      if (!res.data) throw new Error("Invalid response from server");
      const user = await login(res.data);
      console.log("Login success:", res.data);
      navigate(user?.role?.toLowerCase() === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong";

      alert(message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-2 min-h-screen">
      {/* Left */}
      <div className="bg-hero flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <p className="opacity-80">Learn GitHub with GitHero</p>
      </div>

      {/* Right */}
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
            placeholder="Email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" bcolor="primary">
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="mt-4 text-sm">
          New to GitHero?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;

/* ================= INPUT ================= */
const Input = ({ placeholder, label, type, value, onChange }) => (
  <label className="flex flex-col text-sm gap-1 flex-1">
    <span>{label}</span>
    <input
      placeholder={placeholder}
      className="input border-gray-300"
      type={type}
      value={value}
      onChange={onChange}
      required
    />
  </label>
);
