import HeroSection from '@/components/home/hero-section';
import BenefitsSection from '@/components/home/benefit-section';
import ServicesSection from '@/components/home/service-section';
import PodcastSection from '@/components/home/podcast-section';
import EnquirySection from '@/components/home/enquiry-section';
import FAQSection from '@/components/home/FAQ-section';

const page = () => {
  return (
    <div className="">
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <PodcastSection />
      <EnquirySection />
      <FAQSection />
    </div>
  );
};

export default page;
