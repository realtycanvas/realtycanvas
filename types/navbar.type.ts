type NavItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  brandName?: string;
  logoLightSrc?: string;
  logoDarkSrc?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  navItems?: NavItem[];
  currentPath?: string;
};
