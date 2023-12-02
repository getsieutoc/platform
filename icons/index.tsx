'use client';

import { Icon, IconProps as P } from '@/components/chakra';
import {
  MdBarChart,
  MdBusiness,
  MdDashboard,
  MdDataExploration,
  MdFilterAlt,
  MdFlag,
  MdFormatBold,
  MdFormatItalic,
  MdFlashOn,
  MdFormatListBulleted,
  MdInsertChart,
  MdLogout,
  MdPalette,
  MdPreview,
  MdSave,
  MdStar,
  MdStarBorder,
} from 'react-icons/md';
import { LuRefreshCw, LuStickyNote } from 'react-icons/lu';
import { FaGithub, FaGlobe } from 'react-icons/fa6';
import { BiSolidCommentAdd } from 'react-icons/bi';
import { AiOutlineEnter } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FcFlashOn } from 'react-icons/fc';
import { HiUsers } from 'react-icons/hi2';

export * from '@chakra-ui/icons';

export const AddCommentIcon = (p: P) => <Icon as={BiSolidCommentAdd} {...p} />;
export const BarChartIcon = (p: P) => <Icon as={MdBarChart} {...p} />;
export const BoldIcon = (p: P) => <Icon as={MdFormatBold} {...p} />;
export const Business = (p: P) => <Icon as={MdBusiness} {...p} />;
export const DashboardIcon = (p: P) => <Icon as={MdDashboard} {...p} />;
export const DataExploration = (p: P) => <Icon as={MdDataExploration} {...p} />;
export const EnterIcon = (p: P) => <Icon as={AiOutlineEnter} {...p} />;
export const FilterIcon = (p: P) => <Icon as={MdFilterAlt} {...p} />;
export const FlagIcon = (p: P) => <Icon as={MdFlag} {...p} />;
export const FlashIcon = (p: P) => <Icon as={MdFlashOn} {...p} />;
export const YellowFlashIcon = (p: P) => <Icon as={FcFlashOn} {...p} />;
export const GithubIcon = (p: P) => <Icon as={FaGithub} {...p} />;
export const GlobeIcon = (p: P) => <Icon as={FaGlobe} {...p} />;
export const InsertChartIcon = (p: P) => <Icon as={MdInsertChart} {...p} />;
export const ItalicIcon = (p: P) => <Icon as={MdFormatItalic} {...p} />;
export const ListIcon = (p: P) => <Icon as={MdFormatListBulleted} {...p} />;
export const LogoutIcon = (p: P) => <Icon as={MdLogout} {...p} />;
export const PaletteIcon = (p: P) => <Icon as={MdPalette} {...p} />;
export const PreviewIcon = (p: P) => <Icon as={MdPreview} {...p} />;
export const RefreshIcon = (p: P) => <Icon as={LuRefreshCw} {...p} />;
export const SaveIcon = (p: P) => <Icon as={MdSave} {...p} />;
export const StarBorderIcon = (p: P) => <Icon as={MdStarBorder} {...p} />;
export const StarIcon = (p: P) => <Icon as={MdStar} {...p} />;
export const StickyNoteIcon = (p: P) => <Icon as={LuStickyNote} {...p} />;
export const ThreeDotsIcon = (p: P) => <Icon as={BsThreeDots} {...p} />;
export const UsersIcon = (p: P) => <Icon as={HiUsers} {...p} />;
