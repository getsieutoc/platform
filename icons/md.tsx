import { Icon, type IconProps as P } from '@/components/chakra';
import {
  MdDashboard,
  MdInsertChart,
  MdLogout,
  MdPalette,
  MdPreview,
  MdBarChart,
  MdSave,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
} from 'react-icons/md';

export const SaveIcon = (p: P) => <Icon as={MdSave} {...p} />;
export const DashboardIcon = (p: P) => <Icon as={MdDashboard} {...p} />;
export const InsertChartIcon = (p: P) => <Icon as={MdInsertChart} {...p} />;
export const LogoutIcon = (p: P) => <Icon as={MdLogout} {...p} />;
export const PaletteIcon = (p: P) => <Icon as={MdPalette} {...p} />;
export const PreviewIcon = (p: P) => <Icon as={MdPreview} {...p} />;
export const BarChartIcon = (p: P) => <Icon as={MdBarChart} {...p} />;
export const BoldIcon = (p: P) => <Icon as={MdFormatBold} {...p} />;
export const ItalicIcon = (p: P) => <Icon as={MdFormatItalic} {...p} />;
export const ListIcon = (p: P) => <Icon as={MdFormatListBulleted} {...p} />;
