'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback, useRef } from 'react';

interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  status: string;
  address: string;
  city: string | null;
  state: string | null;
  featuredImage: string;
  basePrice: string | null;
  minRatePsf: string | null;
  maxRatePsf: string | null;
  developerName: string | null;
  locality: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasMore: boolean;
  hasPrevious: boolean;
}

interface User {
  email: string;
  role: string;
}

interface ProjectsListingClientProps {
  user?: User | null;
}

export default function ProjectsListingClient({ user }: ProjectsListingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
    hasMore: false,
    hasPrevious: false,
  });

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'ALL',
    status: searchParams.get('status') || 'ALL',
    city: searchParams.get('city') || '',
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchProjects = useCallback(
    async (page: number = 1, append: boolean = false) => {
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          search: filters.search,
          category: filters.category,
          status: filters.status,
          city: filters.city,
        });

        const response = await fetch(`/api/projects?${params}`, {
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) throw new Error('Failed to fetch');

        const result = await response.json();
        setProjects((prev) => (append ? [...prev, ...result.data] : result.data));
        setPagination(result.pagination);
      } catch (error: unknown) {
        const errorName = error instanceof Error ? error.name : '';
        if (errorName !== 'AbortError') {
          console.error('Error fetching projects:', error);
        }
      } finally {
        if (append) {
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    },
    [filters, pagination.limit]
  );

  useEffect(() => {
    fetchProjects(1);
  }, [filters, fetchProjects]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleLoadMore = () => {
    if (pagination.hasMore && !loadingMore) {
      fetchProjects(pagination.page + 1, true);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      COMMERCIAL: 'bg-blue-100 text-blue-800',
      RESIDENTIAL: 'bg-green-100 text-green-800',
      MIXED_USE: 'bg-purple-100 text-purple-800',
      RETAIL_ONLY: 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      PLANNED: 'bg-yellow-100 text-yellow-800',
      UNDER_CONSTRUCTION: 'bg-amber-100 text-amber-800',
      READY: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen pt-24 mt-4 md:mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {user && (
            <Link
              href="/projects/create"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded transition w-fit"
            >
              Create Project
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="ALL">All Categories</option>
                <option value="COMMERCIAL">Commercial</option>
                <option value="RESIDENTIAL">Residential</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="ALL">All Status</option>
                <option value="PLANNED">Planned</option>
                <option value="UNDER_CONSTRUCTION">Under Construction</option>
                <option value="READY">Ready</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="ALL">Any Price</option>
                <option value="LOW">Low ($0 - $500,000)</option>
                <option value="MEDIUM">Medium ($500,000 - $1,000,000)</option>
                <option value="HIGH">High ($1,000,000+)</option>
              </select>
            </div>
          </div>

          {(filters.search || filters.category !== 'ALL' || filters.status !== 'ALL' || filters.city) && (
            <button
              onClick={() => setFilters({ search: '', category: 'ALL', status: 'ALL', city: '' })}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && (
          <>
            {projects.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-10">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="bg-white rounded shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative h-48 bg-gray-200">
                        {project.featuredImage && (
                          <Image
                            src={project.featuredImage}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        <div className="absolute top-2 left-2 flex gap-2">
                          <span
                            className={`px-3 py-1 rounded text-xs font-medium ${getCategoryColor(project.category)}`}
                          >
                            {project.category.replace(/_/g, ' ')}
                          </span>
                          <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{project.title}</h3>

                        {project.subtitle && <p className="text-sm text-gray-600 mb-3">{project.subtitle}</p>}

                        <div className="space-y-2 text-sm">
                          {project.address && (
                            <p className="text-gray-700">
                              <span className="font-bold">Address:</span> {project.address}, {project.city}
                            </p>
                          )}
                          {project.developerName && (
                            <p className="text-gray-700">
                              <span className="font-bold">Developed By:</span> {project.developerName}
                            </p>
                          )}
                          {project.basePrice && (
                            <p className="text-yellow-600 font-semibold">
                              <span className="font-bold">Base Price:</span> {project.basePrice}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {pagination.hasMore && (
                  <div className="flex justify-center mb-10">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-2 px-6 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loadingMore && (
                        <span className="w-4 h-4 border-2 border-gray-300 border-t-yellow-500 rounded-full animate-spin" />
                      )}
                      {loadingMore ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center pb-12 pt-20 md:pt-32">
                <p className="text-gray-600 text-lg mb-4">No projects found matching your filters</p>
                <button
                  onClick={() => setFilters({ search: '', category: 'ALL', status: 'ALL', city: '' })}
                  className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
