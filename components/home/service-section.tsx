'use client';

import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-200 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-linear-to-r from-brand-primary/10 to-brand-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-linear-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How We Make
            <span className="bg-linear-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">
              {' '}
              Property Purchase Simple
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled service with our comprehensive suite of real estate solutions
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {services.map(({ icon: Icon, title, description }, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded p-4 shadow hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 w-full lg:w-52"
            >
              <div className="mb-5 bg-linear-to-r from-brand-primary to-brand-primary p-2 rounded w-10 h-10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-md font-bold text-gray-900 dark:text-white mb-2 text-center capitalize whitespace-pre-line">
                {title}
              </h3>
              <p className="text-gray-600 text-xs text-center leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
