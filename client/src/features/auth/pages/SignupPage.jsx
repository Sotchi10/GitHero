import { useState } from "react";
import Button from "../../../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, signup } from "../../../api/apiAuth";
import { useAuth } from "../../../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSignup = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const res = await signup({
        first_name,
        last_name, 
        email,
        password_hash,
        username,
        gender,
        role,
      });

      console.log("Signup success:", res.data);

      const loginRes = await loginAPI({
        email,
        password: password_hash,
      });

      await login(loginRes.data.user);

      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Something went wrong";

      setError(message);
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid md:grid-cols-2 min-h-screen">
      {/* LEFT SIDE */}
      <div className="bg-hero flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="opacity-80">Learn GitHub with GitHero</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white text-black flex flex-col justify-center px-10 md:px-30">
        <h4 className="font-semibold">Sign up for GitHero</h4>

        {error && (
          <p className="mt-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          {/* Name */}
          <div className="flex gap-5">
            <Input
              label="First Name"
              type="text"
              placeholder="First name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              label="Last Name"
              type="text"
              placeholder="Last name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="flex gap-8">
            <Select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <Select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          {/* Email */}
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
            value={password_hash}
            onChange={(e) => setPassword(e.target.value)}
            note="Password should be at least 15 characters OR 8+ chars with number and lowercase letter."
          />

          {/* Username */}
          <Input
            label="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            note="Username may contain alphanumeric characters or single hyphens."
          />

          <Button type="submit" bcolor="primary">
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-3 text-[12px] text-gray-600">
          By creating an account, you agree to our{" "}
          <Link className="text-blue-600 underline">Terms</Link> and{" "}
          <Link className="text-blue-600 underline">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
};

export default SignupPage;

/* ================= INPUT ================= */
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

/* ================= SELECT ================= */
const genderOptions = ["Male", "Female"];
const roleOptions = ["Student", "Developer"];

const Select = ({ label, value, onChange }) => {
  const options =
    label.toLowerCase() === "gender" ? genderOptions : roleOptions;

  return (
    <label className="flex flex-col text-sm gap-1 w-1/4">
      <span>{label}</span>

      <select
        className="input border-gray-300"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>

        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
};
