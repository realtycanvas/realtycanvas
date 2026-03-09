'use client';

import SmartImage from '../ui/SmartImage';
import { benefits } from '@/data/benefit.data';

const BenefitSection = () => {
  return (
    <section className="lg:py-20 py-4 px-6 md:px-0 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-gray-500 uppercase tracking-widest text-sm">
                Why RealtyCanvas Stands Apart:
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Benefits of
                <span className="bg-linear-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">
                  {' '}
                  Choosing Us
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start space-x-4">
                  <Icon className="w-6 h-6 text-yellow-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex items-center justify-center border-2 lg:w-95 w-full max-w-95 max-[320px]:max-w-60 mx-auto lg:mx-0 lg:h-150 h-125 max-[320px]:h-95 border-gray-500 overflow-hidden rounded-tl-[200px] rounded-br-[200px] max-[320px]:rounded-tl-[80px] max-[320px]:rounded-br-[80px]">
            <div className="relative w-full h-full overflow-hidden">
              <SmartImage
                src="/home/bannernew.webp"
                alt="Real Estate Benefits"
                fill={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 380px, 380px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
