    import Button from "./../../components/ui/Button";
    import { Link } from "react-router-dom";

    const LoginPage = () => {
    return (
        <>
        <section className="grid md:grid-cols-2 min-h-screen">
            <div className="bg-hero flex flex-col justify-center px-10 md:px-20">
            <h1 className="text-3xl font-bold">Sign in to your account</h1>
            <p className="opacity-80">Learn GitHub with GitHero</p>
            </div>

            <div className="bg-white text-black flex flex-col justify-center px-10 md:px-30">
            <h4 className="font-semibold">Sign in to GitHero</h4>

            <form className="flex flex-col gap-4 mt-6">
                <label htmlFor="">
                Email:
                <input
                    className="input border-gray-300"
                    type="email"
                    placeholder="Email"
                    required
                />
                </label>
                <label htmlFor="">
                Password:
                <input
                    className="input border-gray-300"
                    type="password"
                    placeholder="Password"
                    required
                />
                </label>

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
                By signing in, you agree to our {" "}
                <Link className="text-blue-600 underline">Term of Service</Link> and{" "}
                <Link className="text-blue-600 underline">Privacy Policy</Link> {" "}
                 We respect your data and only use it to improve your learning experience.
            </footer>
            </div>
        </section>
        </>
    );
    };
    export default LoginPage;
