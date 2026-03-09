import SmartImage from '../ui/SmartImage';

const HeroSection = () => {
  return (
    <section className="">
      <SmartImage
        src="/home/homepage.webp"
        alt="Hero Background"
        fill
        quality={100}
        className="hidden sm:block object-cover object-center"
        priority
      />

      {/* Mobile Background Image - Visible below sm (640px) */}
      <SmartImage
        src="/home/home-mobile.webp"
        alt="Hero Background Mobile"
        fill
        quality={100}
        className="block sm:hidden object-cover object-center"
        priority
      />
    </section>
  );
};

export default HeroSection;
