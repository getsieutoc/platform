import { Flex, Heading, Skeleton } from '@/components/chakra';
import { useProject } from '@/hooks';

export const ProjectTitle = () => {
  const { project, isLoading } = useProject();

  if (!project || isLoading) return <Skeleton h="48px" w="50%" />;

  return (
    <Flex height="48px" align="center">
      <Heading as="h1" size="lg">
        {project.name}
      </Heading>
    </Flex>
  );
};
