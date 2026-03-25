import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/admin-shell';
import AdminDashboard from '@/components/admin/admin-dashboard';
import AdminProjectsPage from '@/components/admin/admin-projects-page';
import AdminLeadsPage from '@/components/admin/admin-leads-page';

type PageProps = {
  params: Promise<{
    end_point: string;
  }>;
};

export default async function AdminDynamicPage({ params }: PageProps) {
  const { end_point } = await params;

  if (end_point === 'dashboard') {
    return (
      <AdminShell title="Admin Dashboard" description="Overview of project inventory and current visibility states.">
        <AdminDashboard />
      </AdminShell>
    );
  }

  if (end_point === 'projects') {
    return (
      <AdminShell
        title="Project Management"
        description="Create, edit, and delete projects from one place."
        contentScrollable={false}
      >
        <AdminProjectsPage />
      </AdminShell>
    );
  }

  if (end_point === 'lead') {
    return (
      <AdminShell
        title="Lead Management"
        description="Track and review all captured lead enquiries."
        contentScrollable={false}
      >
        <AdminLeadsPage />
      </AdminShell>
    );
  }

  notFound();
}
