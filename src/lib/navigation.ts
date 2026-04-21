export type NavSection = {
  name: string;
  id: string;
  rune: string;
};

export const NAV_SECTIONS: NavSection[] = [
  { name: "Introduction", id: "intro", rune: "ᚠ" },
  { name: "Projects", id: "projects", rune: "ᚢ" },
  { name: "Research", id: "research", rune: "ᚦ" },
  { name: "Academics", id: "academics", rune: "ᚨ" },
  { name: "Contact", id: "contact", rune: "ᚱ" },
];
