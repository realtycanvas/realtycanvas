'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type DashboardCounts = {
  total: number;
  active: number;
  inactive: number;
  planned: number;
  underConstruction: number;
  ready: number;
};

type ProjectRow = {
  status: string;
  isActive: boolean;
};

const emptyCounts: DashboardCounts = {
  total: 0,
  active: 0,
  inactive: 0,
  planned: 0,
  underConstruction: 0,
  ready: 0,
};

export default function AdminDashboard() {
  const [counts, setCounts] = useState<DashboardCounts>(emptyCounts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setError('');
        let page = 1;
        let totalPages = 1;
        const all: ProjectRow[] = [];

        while (page <= totalPages) {
          const response = await fetch(`/api/projects?page=${page}&limit=50&includeInactive=1`, { cache: 'no-store' });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data?.error || 'Failed to load dashboard data');
          }
          const pageData = Array.isArray(data?.data) ? (data.data as ProjectRow[]) : [];
          all.push(...pageData);
          totalPages = Math.max(1, Number(data?.pagination?.totalPages || 1));
          page += 1;
        }

        const nextCounts = all.reduce<DashboardCounts>(
          (acc, project) => {
            acc.total += 1;
            if (project.isActive) acc.active += 1;
            if (!project.isActive) acc.inactive += 1;
            if (project.status === 'PLANNED') acc.planned += 1;
            if (project.status === 'UNDER_CONSTRUCTION') acc.underConstruction += 1;
            if (project.status === 'READY') acc.ready += 1;
            return acc;
          },
          { ...emptyCounts }
        );

        setCounts(nextCounts);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {error && <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="rounded border border-gray-200 bg-gray-50 px-4 py-4">
          <p className="text-xs font-semibold text-gray-500">Total Projects</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{counts.total}</p>
        </div>
        <div className="rounded border border-gray-200 bg-gray-50 px-4 py-4">
          <p className="text-xs font-semibold text-gray-500">Active Projects</p>
          <p className="mt-2 text-2xl font-bold text-green-700">{counts.active}</p>
        </div>
        <div className="rounded border border-gray-200 bg-gray-50 px-4 py-4">
          <p className="text-xs font-semibold text-gray-500">Soft Deleted</p>
          <p className="mt-2 text-2xl font-bold text-red-600">{counts.inactive}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded border border-gray-200 bg-white px-4 py-4">
          <p className="text-xs font-semibold text-gray-500">Planned</p>
          <p className="mt-2 text-xl font-bold text-gray-900">{counts.planned}</p>
        </div>
        <div className="rounded border border-gray-200 bg-white px-4 py-4">
          <p className="text-xs font-semibold text-gray-500">Under Construction</p>
          <p className="mt-2 text-xl font-bold text-gray-900">{counts.underConstruction}</p>
        </div>
        <div className="rounded border border-gray-200 bg-white px-4 py-4">
          <p className="text-xs font-semibold text-gray-500">Ready</p>
          <p className="mt-2 text-xl font-bold text-gray-900">{counts.ready}</p>
        </div>
      </div>
      <div className="rounded border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-700">
          Manage your projects, create new listings, and control soft/hard deletes.
        </p>
        <div className="mt-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-white hover:bg-yellow-600 transition"
          >
            Go to Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
