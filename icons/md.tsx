import { Icon, type IconProps as Props } from '@chakra-ui/react';
import { MdDashboard, MdLogout, MdInsertChart } from 'react-icons/md';

export const DashboardIcon = (p: Props) => <Icon as={MdDashboard} {...p} />;
export const LogoutIcon = (p: Props) => <Icon as={MdLogout} {...p} />;
export const InsertChartIcon = (p: Props) => <Icon as={MdInsertChart} {...p} />;
