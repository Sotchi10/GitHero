import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./../../components/ui/Button";
import dashboardPreview from "../../assets/image/landing/dashboard.png";

const Hero = ({ sectionID }) => (
  <section
    id={sectionID}
    className="bg-hero px-5 pb-16 pt-28 transition-[background] duration-300 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-40"
  >
    <div className="mx-auto max-w-6xl flex justify-center items-center gap-12 lg:flex lg:flex-col">
      <div>
        <div className="flex flex-col justify-center item-center">
          <h1 className="max-w-xl text-4xl leading-tight text-center text-primary sm:text-5xl lg:text-5xl font-medium">
            Master Git and GitHub Through Practice
          </h1>
          <p className="mt-6 max-w-xl text-center text-base text-muted sm:text-lg">
            Build practical Git skills with guided modules, hands-on command
            practice, and progress you can see.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 items-center justify-center sm:flex-row">
          <Link to="/signup">
            <Button bcolor="primary">
              Start Learning <ArrowRight className="ml-2" size={17} />
            </Button>
          </Link>
          <Link to="/modules">
            <Button bcolor="outline" className="text-primary border-default">
              Explore Modules
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-2xl border border-default bg-surface p-4 shadow-lg sm:p-6 h-[600px]">
        <img
          src={dashboardPreview}
          alt="GitHero dashboard preview"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
    </div>
  </section>
);

export default Hero;
