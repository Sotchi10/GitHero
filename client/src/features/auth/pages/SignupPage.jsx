import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <section className="grid md:grid-cols-2 min-h-screen">
      <div className="bg-hero flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="opacity-80">Learn GitHub with GitHero</p>
      </div>

      <div className="bg-white text-black flex flex-col justify-center px-10 md:px-30">
        <h4 className="font-semibold">Sign up for GitHero</h4>

        <form className="flex flex-col gap-4 mt-6">
          <div className="flex gap-5">
            <Input label="First Name" type="text" placeholder="First name" />
            <Input label="Last Name" type="text" placeholder="Last name" />
          </div>

          <Select label="Gender" />

          <Input label="Email" type="email" placeholder="Email" />

          <Input
            label="Password"
            type="password"
            placeholder="Password"
            note="Password should be at least 15 characters OR 8+ chars with number and lowercase letter."
          />

          <Input
            label="Username"
            type="text"
            placeholder="Username"
            note="Username may contain alphanumeric characters or single hyphens."
          />

          <Button type="submit" bcolor="primary">
            Create account
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
          <Link className="text-blue-600 underline">Privacy Policy</Link>. We
          respect your data and only use it to improve your learning experience.
        </p>
      </div>
    </section>
  );
};

export default SignupPage;

const Input = ({ label, type, placeholder, note }) => (
  <label className="flex flex-col text-sm gap-1 flex-1">
    <span>{label}</span>
    <input
      className="input border-gray-300"
      type={type}
      placeholder={placeholder}
      required
    />
    {note && <span className="text-[12px] text-gray-500">{note}</span>}
  </label>
);

const Select = ({ label }) => (
  <label className="flex flex-col text-sm gap-1 w-1/4">
    <span>{label}</span>
    <select className="input border-gray-300" defaultValue="">
      <option value="" disabled>
        Select gender
      </option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </label>
);
