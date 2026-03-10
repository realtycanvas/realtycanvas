'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface User {
  email: string;
  role: string;
}

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    category: 'COMMERCIAL',
    status: 'PLANNED',
    address: '',
    locality: '',
    city: '',
    state: '',
    developerName: '',
    reraId: '',
    basePrice: '',
    priceRange: '',
    priceMin: '',
    priceMax: '',
    featuredImage: '',
    landArea: '',
    totalUnits: '',
    soldUnits: '',
    availableUnits: '',
    numberOfTowers: '',
    numberOfFloors: '',
    minRatePsf: '',
    maxRatePsf: '',
    minUnitArea: '',
    maxUnitArea: '',
    bannerTitle: '',
    bannerSubtitle: '',
    bannerDescription: '',
    aboutTitle: '',
    aboutDescription: '',
    sitePlanTitle: '',
    sitePlanImage: '',
    sitePlanDescription: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  // Check authentication and redirect if not logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          router.push('/projects');
        }
      } catch {
        router.push('/projects');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        setError('Project title is required');
        setFormLoading(false);
        return;
      }

      if (!formData.slug.trim()) {
        setError('URL slug is required');
        setFormLoading(false);
        return;
      }

      if (!formData.address.trim()) {
        setError('Address is required');
        setFormLoading(false);
        return;
      }

      if (!formData.featuredImage.trim()) {
        setError('Featured image URL is required');
        setFormLoading(false);
        return;
      }

      // Prepare data with proper types
      const payload = {
        title: formData.title.trim(),
        subtitle: formData.subtitle?.trim() || null,
        slug: formData.slug.toLowerCase().trim(), // Normalize slug
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        address: formData.address.trim(),
        locality: formData.locality?.trim() || null,
        city: formData.city?.trim() || null,
        state: formData.state?.trim() || null,
        developerName: formData.developerName?.trim() || null,
        reraId: formData.reraId?.trim() || null,
        basePrice: formData.basePrice?.trim() || null,
        priceRange: formData.priceRange?.trim() || null,
        priceMin: formData.priceMin ? parseInt(formData.priceMin) : null,
        priceMax: formData.priceMax ? parseInt(formData.priceMax) : null,
        featuredImage: formData.featuredImage.trim(),
        landArea: formData.landArea?.trim() || null,
        totalUnits: formData.totalUnits ? parseInt(formData.totalUnits) : null,
        soldUnits: formData.soldUnits ? parseInt(formData.soldUnits) : null,
        availableUnits: formData.availableUnits ? parseInt(formData.availableUnits) : null,
        numberOfTowers: formData.numberOfTowers ? parseInt(formData.numberOfTowers) : null,
        numberOfFloors: formData.numberOfFloors ? parseInt(formData.numberOfFloors) : null,
        minRatePsf: formData.minRatePsf?.trim() || null,
        maxRatePsf: formData.maxRatePsf?.trim() || null,
        minUnitArea: formData.minUnitArea ? parseInt(formData.minUnitArea) : null,
        maxUnitArea: formData.maxUnitArea ? parseInt(formData.maxUnitArea) : null,
        bannerTitle: formData.bannerTitle?.trim() || null,
        bannerSubtitle: formData.bannerSubtitle?.trim() || null,
        bannerDescription: formData.bannerDescription?.trim() || null,
        aboutTitle: formData.aboutTitle?.trim() || null,
        aboutDescription: formData.aboutDescription?.trim() || null,
        sitePlanTitle: formData.sitePlanTitle?.trim() || null,
        sitePlanImage: formData.sitePlanImage?.trim() || null,
        sitePlanDescription: formData.sitePlanDescription?.trim() || null,
        seoTitle: formData.seoTitle?.trim() || null,
        seoDescription: formData.seoDescription?.trim() || null,
        seoKeywords: formData.seoKeywords
          ? formData.seoKeywords
              .split(',')
              .map((k) => k.trim())
              .filter((k) => k)
          : [],
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }

      const result = await response.json();
      // Redirect to projects page or the new project
      router.push(`/projects`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Error creating project:', err);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Loading state while checking auth */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        )}

        {!loading && (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
              <p className="mt-2 text-gray-600">
                Fill in the details below to create a new real estate project listing
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-8">
              {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>}

              {/* Basic Information */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. Luxury Towers Downtown"
                    />
                  </div>

                  <div>
                    <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. luxury-towers-downtown"
                    />
                  </div>

                  <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      id="subtitle"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. Premium Residential Complex"
                    />
                  </div>

                  <div>
                    <label htmlFor="developerName" className="block text-sm font-medium text-gray-700 mb-2">
                      Developer Name
                    </label>
                    <input
                      type="text"
                      id="developerName"
                      name="developerName"
                      value={formData.developerName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. ABC Developers"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Detailed description of the project..."
                    />
                  </div>
                </div>
              </section>

              {/* Category & Status */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Type & Status</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="COMMERCIAL">Commercial</option>
                      <option value="RETAIL_ONLY">Retail Only</option>
                      <option value="MIXED_USE">Mixed Use</option>
                      <option value="RESIDENTIAL">Residential</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="PLANNED">Planned</option>
                      <option value="UNDER_CONSTRUCTION">Under Construction</option>
                      <option value="READY">Ready</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Location */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label htmlFor="locality" className="block text-sm font-medium text-gray-700 mb-2">
                      Locality
                    </label>
                    <input
                      type="text"
                      id="locality"
                      name="locality"
                      value={formData.locality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. Downtown, Marina"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. Mumbai"
                    />
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. Maharashtra"
                    />
                  </div>
                </div>
              </section>

              {/* Pricing */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price
                    </label>
                    <input
                      type="text"
                      id="basePrice"
                      name="basePrice"
                      value={formData.basePrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 50 Lakhs"
                    />
                  </div>

                  <div>
                    <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-2">
                      Min Price
                    </label>
                    <input
                      type="number"
                      id="priceMin"
                      name="priceMin"
                      value={formData.priceMin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 5000000"
                    />
                  </div>

                  <div>
                    <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-2">
                      Max Price
                    </label>
                    <input
                      type="number"
                      id="priceMax"
                      name="priceMax"
                      value={formData.priceMax}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 10000000"
                    />
                  </div>
                </div>
              </section>

              {/* Project Details */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="reraId" className="block text-sm font-medium text-gray-700 mb-2">
                      RERA ID
                    </label>
                    <input
                      type="text"
                      id="reraId"
                      name="reraId"
                      value={formData.reraId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="RERA Registration ID"
                    />
                  </div>

                  <div>
                    <label htmlFor="numberOfTowers" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Towers
                    </label>
                    <input
                      type="number"
                      id="numberOfTowers"
                      name="numberOfTowers"
                      value={formData.numberOfTowers}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 3"
                    />
                  </div>

                  <div>
                    <label htmlFor="numberOfFloors" className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Floors
                    </label>
                    <input
                      type="number"
                      id="numberOfFloors"
                      name="numberOfFloors"
                      value={formData.numberOfFloors}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 25"
                    />
                  </div>

                  <div>
                    <label htmlFor="totalUnits" className="block text-sm font-medium text-gray-700 mb-2">
                      Total Units
                    </label>
                    <input
                      type="number"
                      id="totalUnits"
                      name="totalUnits"
                      value={formData.totalUnits}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 200"
                    />
                  </div>

                  <div>
                    <label htmlFor="soldUnits" className="block text-sm font-medium text-gray-700 mb-2">
                      Sold Units
                    </label>
                    <input
                      type="number"
                      id="soldUnits"
                      name="soldUnits"
                      value={formData.soldUnits}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 50"
                    />
                  </div>

                  <div>
                    <label htmlFor="availableUnits" className="block text-sm font-medium text-gray-700 mb-2">
                      Available Units
                    </label>
                    <input
                      type="number"
                      id="availableUnits"
                      name="availableUnits"
                      value={formData.availableUnits}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 150"
                    />
                  </div>
                </div>
              </section>

              {/* Media */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Media</h2>
                <div>
                  <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL *
                  </label>
                  <input
                    type="url"
                    id="featuredImage"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </section>

              {/* SEO */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">SEO Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      id="seoTitle"
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleInputChange}
                      maxLength={60}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="SEO title (max 60 chars)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      id="seoDescription"
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleInputChange}
                      maxLength={160}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="SEO description (max 160 chars)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="seoKeywords" className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      id="seoKeywords"
                      name="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. commercial property, retail space, Sector 14"
                    />
                  </div>
                </div>
              </section>

              {/* Banner Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Banner Content</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="bannerTitle" className="block text-sm font-medium text-gray-700 mb-2">
                      Banner Title
                    </label>
                    <input
                      type="text"
                      id="bannerTitle"
                      name="bannerTitle"
                      value={formData.bannerTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Main banner title"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="bannerSubtitle" className="block text-sm font-medium text-gray-700 mb-2">
                      Banner Subtitle
                    </label>
                    <input
                      type="text"
                      id="bannerSubtitle"
                      name="bannerSubtitle"
                      value={formData.bannerSubtitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Banner subtitle text"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="bannerDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Banner Description
                    </label>
                    <textarea
                      id="bannerDescription"
                      name="bannerDescription"
                      value={formData.bannerDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Detailed banner description"
                    />
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About Project</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-700 mb-2">
                      About Title
                    </label>
                    <input
                      type="text"
                      id="aboutTitle"
                      name="aboutTitle"
                      value={formData.aboutTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. Project Overview"
                    />
                  </div>

                  <div>
                    <label htmlFor="aboutDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      About Description
                    </label>
                    <textarea
                      id="aboutDescription"
                      name="aboutDescription"
                      value={formData.aboutDescription}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Comprehensive project overview and description"
                    />
                  </div>
                </div>
              </section>

              {/* Site Plan Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Site Plan</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="sitePlanTitle" className="block text-sm font-medium text-gray-700 mb-2">
                      Site Plan Title
                    </label>
                    <input
                      type="text"
                      id="sitePlanTitle"
                      name="sitePlanTitle"
                      value={formData.sitePlanTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. Site Plan & Layout"
                    />
                  </div>

                  <div>
                    <label htmlFor="sitePlanImage" className="block text-sm font-medium text-gray-700 mb-2">
                      Site Plan Image URL
                    </label>
                    <input
                      type="url"
                      id="sitePlanImage"
                      name="sitePlanImage"
                      value={formData.sitePlanImage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="https://example.com/siteplan.jpg"
                    />
                  </div>

                  <div>
                    <label htmlFor="sitePlanDescription" className="block text-sm font-medium text-gray-700 mb-2">
                      Site Plan Description
                    </label>
                    <textarea
                      id="sitePlanDescription"
                      name="sitePlanDescription"
                      value={formData.sitePlanDescription}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Details about the site plan layout"
                    />
                  </div>
                </div>
              </section>

              {/* Additional Pricing Details */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Pricing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range Text
                    </label>
                    <input
                      type="text"
                      id="priceRange"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. ₹50 Lakhs - ₹2.9 Cr"
                    />
                  </div>

                  <div>
                    <label htmlFor="minRatePsf" className="block text-sm font-medium text-gray-700 mb-2">
                      Min Rate (Per Sq.ft)
                    </label>
                    <input
                      type="text"
                      id="minRatePsf"
                      name="minRatePsf"
                      value={formData.minRatePsf}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. ₹15,000"
                    />
                  </div>

                  <div>
                    <label htmlFor="maxRatePsf" className="block text-sm font-medium text-gray-700 mb-2">
                      Max Rate (Per Sq.ft)
                    </label>
                    <input
                      type="text"
                      id="maxRatePsf"
                      name="maxRatePsf"
                      value={formData.maxRatePsf}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. ₹25,000"
                    />
                  </div>

                  <div>
                    <label htmlFor="landArea" className="block text-sm font-medium text-gray-700 mb-2">
                      Total Land Area
                    </label>
                    <input
                      type="text"
                      id="landArea"
                      name="landArea"
                      value={formData.landArea}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 4.15 acres"
                    />
                  </div>

                  <div>
                    <label htmlFor="minUnitArea" className="block text-sm font-medium text-gray-700 mb-2">
                      Min Unit Area (Sq.ft)
                    </label>
                    <input
                      type="number"
                      id="minUnitArea"
                      name="minUnitArea"
                      value={formData.minUnitArea}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 300"
                    />
                  </div>

                  <div>
                    <label htmlFor="maxUnitArea" className="block text-sm font-medium text-gray-700 mb-2">
                      Max Unit Area (Sq.ft)
                    </label>
                    <input
                      type="number"
                      id="maxUnitArea"
                      name="maxUnitArea"
                      value={formData.maxUnitArea}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="e.g. 2400"
                    />
                  </div>
                </div>
              </section>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
                >
                  {formLoading ? 'Creating...' : 'Create Project'}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
