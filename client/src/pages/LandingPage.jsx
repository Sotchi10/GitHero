import Hero from './../sections/Hero';
import Feature from './../sections/Feature';

const LandingPage = () => {
  return (
    <>
      <Hero sectionID="Hero" />
      <section id="problems-solutions">
        <Feature sectionID="Features" />
      </section>
    </>
  );
};
export default LandingPage;
