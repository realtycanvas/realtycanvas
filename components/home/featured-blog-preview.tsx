import Link from 'next/link';

export default function FeaturedBlogPreview() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-white to-gray-50 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-14 items-start">
            <div className="space-y-5 sm:space-y-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">Featured Blog</p>
              <h2 className="text-xl sm:text-3xl lg:text-[2.6rem] font-bold text-gray-900 leading-tight">
                Senior-Living, India
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                India&apos;s elderly population is projected to reach 346–347 million by 2050, and this demographic
                shift is creating one of the biggest long-term opportunities in real estate. Senior living is moving
                from a reactive decision to a planned lifestyle choice built around dignity, independence, and
                community.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                The blog highlights Gurgaon as a key market due to healthcare access, managed communities, and strong
                NRI connectivity. With demand estimated at up to 2 million units and organised stock still very limited,
                this segment is becoming a major growth category for families, developers, and investors.
              </p>
              <Link
                href="/blog/senior-living-india"
                className="inline-flex items-center rounded-md bg-yellow-500 px-6 py-3 text-sm font-semibold text-white hover:bg-yellow-600 transition"
              >
                Read More
              </Link>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-72 rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-black">
                <video
                  src="https://cdn.realtycanvas.in/projects/videos/blog.mp4"
                  controls
                  playsInline
                  className="w-full aspect-9/16 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
