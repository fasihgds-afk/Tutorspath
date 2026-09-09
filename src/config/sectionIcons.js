/**
 * Section-specific Lucide icons — each area uses a distinct icon set
 * while keeping the same meaning (trust, phone, support, etc.).
 */
import {
  AlertTriangle,
  ArrowRight,
  AtSign,
  Award,
  BadgeCheck,
  BadgeDollarSign,
  BarChart3,
  BookMarked,
  BookOpen,
  BookOpenCheck,
  Brain,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleCheckBig,
  CircleDot,
  CircleHelp,
  ClipboardList,
  Crosshair,
  Eye,
  EyeOff,
  FilePenLine,
  Fingerprint,
  Gem,
  GraduationCap,
  HandHelping,
  Headphones,
  Headset,
  HeartHandshake,
  Laugh,
  Library,
  ListChecks,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  Medal,
  Megaphone,
  Menu,
  MessageCircle,
  MessageSquare,
  MessageSquareHeart,
  MessageSquareText,
  MessagesSquare,
  PackageCheck,
  PenLine,
  PenTool,
  Phone,
  PhoneCall,
  PhoneIncoming,
  Plus,
  Quote,
  RefreshCw,
  RotateCcw,
  ScanSearch,
  School,
  Search,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  ShieldEllipsis,
  ShieldHalf,
  ShieldQuestion,
  SmilePlus,
  Sparkles,
  Star,
  ThumbsUp,
  Timer,
  TriangleAlert,
  Trophy,
  User,
  UserCheck,
  UserRound,
  UserSearch,
  UsersRound,
  X,
  Zap,
} from 'lucide-react';

export const hero = {
  trustBadge: ShieldCheck,
  perks: [GraduationCap, Timer, FilePenLine, Headphones],
  form: {
    user: UserRound,
    email: AtSign,
    phone: PhoneCall,
    message: MessagesSquare,
    lock: LockKeyhole,
  },
  loading: Loader2,
  success: CircleCheckBig,
  arrow: ArrowRight,
};

export const stats = {
  items: [UsersRound, Library, Medal, SmilePlus],
};

export const aiWarning = {
  badge: TriangleAlert,
  items: [AlertTriangle, ShieldAlert, MessageSquare, BookOpenCheck],
};

export const topWriters = {
  badge: BadgeCheck,
  verified: CircleCheck,
};

export const features = {
  badge: Gem,
  items: [Sparkles, Crosshair, Brain, HandHelping, Fingerprint, Megaphone],
  arrow: ArrowRight,
};

export const guarantee = {
  badge: ShieldHalf,
  items: [RotateCcw, ThumbsUp, EyeOff, BadgeDollarSign],
};

export const howItWorks = {
  badge: Settings2,
  steps: [ClipboardList, UserSearch, PenLine, ScanSearch, PackageCheck],
  arrow: ArrowRight,
};

export const howItWorksHome1 = {
  badge: Settings2,
  steps: [ClipboardList, UserSearch, Star, ScanSearch],
  arrow: ArrowRight,
};

export const services = {
  tags: CircleCheck,
  phone: PhoneIncoming,
  chat: MessageSquareText,
  writing: PenTool,
  check: CircleCheckBig,
  arrow: ArrowRight,
};

export const servicesHome1 = {
  items: [BookOpen, Crosshair, PenLine, BarChart3, Headphones, Award],
  featured: UserCheck,
  check: CircleCheckBig,
  arrow: ArrowRight,
};

export const ctaBanner = {
  checks: ListChecks,
  arrow: ArrowRight,
};

export const helpBanner = {
  chat: MessageCircle,
  phone: PhoneCall,
  perks: [Zap, ShieldQuestion, CircleHelp],
};

export const trustedBy = {
  badge: BarChart3,
  stats: [UserCheck, Star, School, Laugh],
};

export const testimonials = {
  badge: Quote,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  verified: BadgeCheck,
  user: UserRound,
};

export const supportBanner = {
  avatar: Headset,
  online: CircleDot,
  phone: Phone,
  email: Mail,
};

export const support = {
  badge: Award,
  cards: [MessageSquareHeart, ShieldEllipsis, RefreshCw, Trophy],
  banner: MessageSquare,
  trust: [PhoneCall, Mail, Timer, ShieldCheck, CircleCheckBig],
};

export const faq = {
  badge: CircleHelp,
  chat: MessageSquareText,
  email: Mail,
  chevron: ChevronDown,
};

export const nav = {
  phone: Phone,
  plus: Plus,
  user: User,
  menu: Menu,
  close: X,
};

export const studentNav = {
  phone: PhoneCall,
  user: UserRound,
  logout: LogOut,
  menu: Menu,
  close: X,
};

export const footer = {
  phone: PhoneIncoming,
  email: Mail,
  chat: MessageCircle,
  location: BookMarked,
  ssl: ShieldCheck,
  secure: ShieldHalf,
};

export const auth = {
  trustBadge: ShieldCheck,
  perks: [GraduationCap, Timer, FilePenLine, Headphones],
  form: {
    error: AlertTriangle,
    user: UserRound,
    email: AtSign,
    phone: PhoneCall,
    lock: LockKeyhole,
    chevron: ChevronDown,
    eye: Eye,
    eyeOff: EyeOff,
    success: CircleCheckBig,
    loading: Loader2,
  },
};

export const reviews = {
  verified: BadgeCheck,
  star: Star,
  chevron: ChevronDown,
  phone: PhoneCall,
  chat: MessageSquare,
  email: AtSign,
};

export const orders = {
  chevron: ChevronDown,
  arrow: ArrowRight,
  ssl: ShieldEllipsis,
};

export const dashboard = {
  search: Search,
  clock: Timer,
  chat: MessageSquareHeart,
  phone: PhoneCall,
  inquiry: FilePenLine,
  email: Mail,
};
