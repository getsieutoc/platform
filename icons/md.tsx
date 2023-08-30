import { Icon, type IconProps } from '@chakra-ui/react';
import { MdDashboard, MdLogout } from 'react-icons/md';

export const DashboardIcon = (p: IconProps) => <Icon as={MdDashboard} {...p} />;
export const LogoutIcon = (p: IconProps) => <Icon as={MdLogout} {...p} />;
