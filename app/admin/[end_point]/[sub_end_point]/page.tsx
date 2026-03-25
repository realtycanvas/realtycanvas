import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/admin-shell';
import { CreateProjectPageWrapper } from '@/app/(routes)/projects/create/page';

type PageProps = {
  params: Promise<{
    end_point: string;
    sub_end_point: string;
  }>;
};

export default async function AdminNestedDynamicPage({ params }: PageProps) {
  const { end_point, sub_end_point } = await params;

  if (end_point === 'projects' && sub_end_point === 'create') {
    return (
      <AdminShell title="Create Project" description="Use this form to create new projects or edit existing ones.">
        <CreateProjectPageWrapper adminMode />
      </AdminShell>
    );
  }

  notFound();
}
