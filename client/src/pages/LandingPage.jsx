import NavBar from "../components/layout/NavBar";
import Feature from "./sections/Feature";
import Hero from "./sections/Hero";


const LandingPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <Hero sectionID="Hero" />
        <section id="problems-solutions">
          <Feature sectionID="Features" />
        </section>
      </main>
    </>
  );
};
export default LandingPage;
