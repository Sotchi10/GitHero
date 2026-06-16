
import Button from './../../components/ui/Button';

const Hero = ({ sectionID }) => {
  return (
    <>
      <section
        id={sectionID}
        className="bg-hero h-min flex flex-col justify-center items-center gap-3 px-40 py-40"
      >
        <div className="flex justify-center items-center flex-col px-80 text-center gap-2">
          <h1 className="font-semibold">
            Start Your Git Journey With Confidence
          </h1>
          <p className="text-gray-300">
            No more guessing commands, understand what you’re doing and why it
            works. helloo
          </p>
        </div>

        <div className="flex gap-3 ">
          <form>
            <div className="relative w-100 max-w-md">
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full pr-10 py-3 pl-4 rounded-[7px] bg-white text-black placeholder-gray-600"
              />

              <Button
                type="submit"
                bcolor="primary"
                className="absolute right-1 top-1 bottom-1 items-center flex"
              >
                Sign up GitHero
              </Button>
            </div>
          </form>

          <Button type="button" bcolor="outline">
            Watch Demo
          </Button>
        </div>

        <div className="w-full h-[95vh] bg-gray-600 rounded-[15px] mt-20"></div>
      </section>
    </>
  );
};
export default Hero;
