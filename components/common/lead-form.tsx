'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  phone: string;
  email: string;
  timeline: string;
  propertyType: 'COMMERCIAL' | 'RESIDENTIAL' | '';
  city: string;
  state: string;
  projectSlug?: string;
  projectTitle?: string;
  sourcePath?: string;
}

interface LeadFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  defaultValues?: {
    propertyType?: 'COMMERCIAL' | 'RESIDENTIAL' | '';
    city?: string;
    state?: string;
    projectSlug?: string;
    projectTitle?: string;
    sourcePath?: string;
  };
}

export default function LeadForm({ onSuccess, onCancel, showCancelButton = true, defaultValues }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    timeline: '',
    propertyType: defaultValues?.propertyType || '',
    city: defaultValues?.city || '',
    state: defaultValues?.state || '',
    projectSlug: defaultValues?.projectSlug,
    projectTitle: defaultValues?.projectTitle,
    sourcePath: defaultValues?.sourcePath,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Thank you! We will contact you soon.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          timeline: '',
          propertyType: defaultValues?.propertyType || '',
          city: defaultValues?.city || '',
          state: defaultValues?.state || '',
          projectSlug: defaultValues?.projectSlug,
          projectTitle: defaultValues?.projectTitle,
          sourcePath: defaultValues?.sourcePath,
        });
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full">
      {/* Property Type */}
      <fieldset className="space-y-1.5">
        <legend className="block text-sm font-medium text-gray-700">Property Type *</legend>
        <div className="flex items-center gap-6">
          {(['COMMERCIAL', 'RESIDENTIAL'] as const).map((type) => (
            <label key={type} className="inline-flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
              <input
                type="radio"
                name="propertyType"
                value={type}
                checked={formData.propertyType === type}
                onChange={() => handleInputChange('propertyType', type)}
                required
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-base">{type === 'COMMERCIAL' ? '🏢 Commercial' : '🏠 Residential'}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name *
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          className="w-full h-10 text-sm rounded"
        />
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            className="w-full h-10 text-sm rounded"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email ID *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="w-full h-10 text-sm rounded"
          />
        </div>
      </div>

      {/* City + State */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City *
          </label>
          <Input
            id="city"
            type="text"
            placeholder="Enter city"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            required
            className="w-full h-10 text-sm rounded"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State *
          </label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            required
            className="w-full h-10 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select state</option>
            {[
              'Andhra Pradesh',
              'Arunachal Pradesh',
              'Assam',
              'Bihar',
              'Chhattisgarh',
              'Goa',
              'Gujarat',
              'Haryana',
              'Himachal Pradesh',
              'Jharkhand',
              'Karnataka',
              'Kerala',
              'Madhya Pradesh',
              'Maharashtra',
              'Manipur',
              'Meghalaya',
              'Mizoram',
              'Nagaland',
              'Odisha',
              'Punjab',
              'Rajasthan',
              'Sikkim',
              'Tamil Nadu',
              'Telangana',
              'Tripura',
              'Uttar Pradesh',
              'Uttarakhand',
              'West Bengal',
              'Delhi',
              'Chandigarh',
              'Puducherry',
            ].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-1.5">
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
          Purchase Timeline *
        </label>
        <select
          id="timeline"
          value={formData.timeline}
          onChange={(e) => handleInputChange('timeline', e.target.value)}
          required
          className="w-full h-10 px-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">Select your timeline</option>
          <option value="1-month">1 Month</option>
          <option value="3-months">3 Months</option>
          <option value="6-months">6 Months</option>
          <option value="more-than-6-months">More than 6 Months</option>
        </select>
      </div>

      <div className="flex gap-2 pt-3">
        {showCancelButton && (
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-9 text-sm">
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? 'Submitting...' : 'Get Details'}
        </Button>
      </div>
    </form>
  );
}
