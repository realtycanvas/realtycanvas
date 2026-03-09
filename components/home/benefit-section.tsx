'use client';

import {
  HandRaisedIcon,
  ChartBarIcon,
  CheckCircleIcon,
  BoltIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import SmartImage from '../ui/SmartImage';

const BenefitSection = () => {
  return (
    <section className="lg:py-20 py-4 px-6 md:px-0 bg-linear-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 gap-4 items-center justify-center">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Why RealtyCanvas Stands Apart:
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 ">
                Benefits of <br />
                <span className="bg-[#FEB711] bg-clip-text text-transparent">
                  {' '}
                  Choosing Us
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircleIcon className="w-6 h-6 text-yellow-500" />

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Verified Properties</h3>
                  <p className="text-gray-600 text-xs">
                    All our properties are thoroughly verified with proper documentation and legal clearance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <BoltIcon className="w-6 h-6 text-yellow-500" />

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Process</h3>
                  <p className="text-gray-600 text-xs">
                    Our streamlined process ensures quick property registration and documentation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CurrencyDollarIcon className="w-6 h-6 text-yellow-500" />

                <div>
                  <h3 className="text-lg font-bold text-gray-900  mb-2">Best Prices</h3>
                  <p className="text-gray-600  text-xs">
                    Get the best market prices with transparent pricing and no hidden charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <HandRaisedIcon className="w-6 h-6 text-yellow-500" />

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Post-Purchase Support</h3>
                  <p className="text-gray-600  text-xs">
                    Ongoing assistance with possession, documentation, and resale planning.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <ChartBarIcon className="w-6 h-6 text-yellow-500" />

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Maximum ROI Focus</h3>
                  <p className="text-gray-600  text-xs">
                    Strategic location selection for highest appreciation potential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex items-center justify-center border-2 lg:w-95 w-full max-w-95 max-[320px]:max-w-60 mx-auto lg:mx-0 lg:h-150 h-125 max-[320px]:h-95 border-gray-500 overflow-hidden rounded-tl-[200px] rounded-br-[200px] max-[320px]:rounded-tl-[80px] max-[320px]:rounded-br-[80px]">
            <div className="relative w-full h-full overflow-hidden">
              <SmartImage
                src="/bannernew.webp"
                alt="Real Estate Benefits"
                fill={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 380px, 380px"
                // priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
