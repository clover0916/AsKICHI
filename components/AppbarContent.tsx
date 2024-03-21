"use client";
import { siteConfig } from "@/config/site";
import { NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

export default function AppbarContent() {
  const pathname = usePathname();

  return (
    <NavbarContent className="hidden sm:flex gap-5">
      {renderNavItems(pathname)}
    </NavbarContent>
  );
}

const renderNavItems = (pathname: string) => {
  const navItems = pathname.startsWith("/dashboard")
    ? siteConfig.dashboardNavItems
    : siteConfig.navItems;

  return navItems.map((item, index) => (
    <NavbarItem key={index} isActive={pathname === item.href}>
      <Link
        as={NextLink}
        href={item.href}
        color={pathname === item.href ? "primary" : "foreground"}
      >
        {item.label}
      </Link>
    </NavbarItem>
  ));
};