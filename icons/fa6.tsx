import { Icon, type IconProps } from '@chakra-ui/react';
import { FaGithub, FaGlobe } from 'react-icons/fa6';

export const GithubIcon = (p: IconProps) => <Icon as={FaGithub} {...p} />;
export const GlobeIcon = (p: IconProps) => <Icon as={FaGlobe} {...p} />;
