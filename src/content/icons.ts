/** Icon mapping, so the grids read as designed rather than as plain lists. */

import {
  Award,
  Banknote,
  BookOpen,
  Brain,
  Briefcase,
  Brush,
  Building2,
  Calendar,
  Camera,
  CheckCircle2,
  Clapperboard,
  Compass,
  Crown,
  Film,
  Flame,
  Frame,
  Gavel,
  Gem,
  Globe,
  Handshake,
  Image,
  Layers,
  Lightbulb,
  Megaphone,
  Mic,
  Music,
  Newspaper,
  Palette,
  PenTool,
  Radio,
  Rocket,
  Scale,
  Search,
  Shapes,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

/** Fallback for anything not explicitly mapped. */
export const defaultIcon: LucideIcon = Sparkles;

/** The four verticals. */
export const verticalIcons: Record<string, LucideIcon> = {
  media: Camera,
  news: Newspaper,
  arts: Palette,
  "marketing-consulting": Target,
};

/** Core Values (brief 2). */
export const valueIcons: Record<string, LucideIcon> = {
  Excellence: Award,
  Integrity: ShieldCheck,
  Boldness: Flame,
  "Creative Intelligence": Brain,
  Impact: TrendingUp,
  "Cultural & Global Perspective": Globe,
  Accountability: Scale,
};

/** Core areas across all four verticals, plus media formats and work categories. */
export const areaIcons: Record<string, LucideIcon> = {
  // Tezra Media (brief 7)
  "Event Coverage": Calendar,
  Interviews: Mic,
  "Editorial Features": BookOpen,
  "Campaign Media": Megaphone,
  "Entertainment Coverage": Clapperboard,
  "Content Production": Video,
  "Business & Leadership Features": Briefcase,
  "Cultural Storytelling": Globe,
  "Premium Media Documentation": Camera,

  // Media formats (brief 7)
  "Selected Work": Layers,
  Video: Video,
  Features: BookOpen,
  Campaigns: Megaphone,
  Documentary: Film,

  // Tezra News formats (brief 8)
  "Latest News": Newspaper,
  Analysis: Search,
  Insights: Lightbulb,

  // Tezra Arts (brief 9)
  Artists: Users,
  Artworks: Frame,
  Collections: Layers,
  "Available Works": Gem,
  Exhibitions: Image,
  Commissions: Brush,
  "Art Advisory": Compass,
  "Private Acquisition": Crown,
  "Institutional Collections": Building2,

  // Tezra Arts creative areas (brief 9)
  "Art Exhibitions": Image,
  "Art Curation": Shapes,
  "Creative Installations": Sparkles,
  "Visual Storytelling": Camera,
  "Exhibition Concepts": PenTool,
  "Cultural Art Experiences": Globe,
  "Art-Based Brand Collaborations": Handshake,
  "Creative Showcases": Frame,
  "Custom Art Commissions": Brush,
  "Exhibition and Experiential Art Concepts": Shapes,

  // Tezra Marketing and Consulting (brief 10)
  "Brand Strategy": Target,
  "Brand Positioning": Compass,
  "Marketing Campaigns": Megaphone,
  "Corporate Identity": Building2,
  "Personal Brand Development": Users,
  "Public Figure Positioning": Crown,
  "Business Rebranding": Rocket,
  "Sponsorship Consulting": Handshake,
  "PR & Communication Strategy": Radio,
  "Campaign Management": Layers,
  "Creative Brand Direction": PenTool,
  "Business Growth Consulting": TrendingUp,
  "Executive Branding and Spotlight Features": Award,

  // Our Work categories (brief 11)
  "Media projects": Video,
  "Editorial work": BookOpen,
  "News and editorial projects": Newspaper,
  "Marketing and consulting projects": Target,
  "Creative and Arts projects": Palette,
  "Events and experiences": Calendar,

  // Misc
  Podcasts: Music,
  Pricing: Banknote,
  Legal: Gavel,
};

export const iconFor = (name: string): LucideIcon => areaIcons[name] ?? defaultIcon;
