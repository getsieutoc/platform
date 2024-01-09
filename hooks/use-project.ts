import { useParams, useSWR } from '@/hooks';
import { Project } from '@/types';

export const useProject = (id?: string) => {
  const params = useParams<{ id?: string }>();

  const projectId = id ?? params.id;

  const { data: project, ...rest } = useSWR<Project>(
    projectId ? `/api/projects/${projectId}` : null
  );

  return { project, ...rest };
};
