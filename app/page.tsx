import HeroSection from '@/components/home/hero-section';
import BenefitsSection from '@/components/home/benefit-section';
import ServicesSection from '@/components/home/service-section';
import PodcastSection from '@/components/home/podcast-section';
import EnquirySection from '@/components/home/enquiry-section';
import FAQSection from '@/components/home/FAQ-section';
import { ProjectTagSection } from '@/components/home/project-tag-sections';
import LatestBlogsSection from '@/components/home/latest-blogs-section';

const page = () => {
  return (
    <div className="">
      <HeroSection />
      <ProjectTagSection
        tag="RECOMMENDED"
        title={
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Realty Canvas <span className="text-[#FDB022]">Recommended</span>
          </h2>
        }
      />
      <BenefitsSection />
      <ServicesSection />
      <ProjectTagSection
        tag="TRENDING"
        title={
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-[#FDB022]">Trending</span> Projects in Gurugram
          </h2>
        }
      />
      <ProjectTagSection
        tag="NEW"
        title={
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-[#FDB022]">New Launch</span> Projects in Gurgaon
          </h2>
        }
      />
      <ProjectTagSection
        tag="BUDGET"
        title={
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-[#FDB022]">Best Budget</span> Projects in Gurugram
          </h2>
        }
      />
      <ProjectTagSection
        tag="DREAM"
        title={
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-[#FDB022]">Dream Properties</span> In The Heart of Gurugram
          </h2>
        }
      />
      <ProjectTagSection
        tag="BUDGET_PLOTS"
        title={
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-[#FDB022]">Best Budget Plots</span> in Gurugram
          </h2>
        }
      />
      <ProjectTagSection
        tag="COMMERCIAL_GURUGRAM"
        title={
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            <span className="text-[#FDB022]">Commercial</span> Projects in Gurugram
          </h2>
        }
      />
      <PodcastSection />
      <EnquirySection />
      <LatestBlogsSection />
      <FAQSection />
    </div>
  );
};

export default page;
