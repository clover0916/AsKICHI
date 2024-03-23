"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import UserButton from "@/components/UserButton";
import { ThemeSwitch } from "@/components/theme-switch";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const AppBar = ({ title }: { title: string }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const renderMenuItems = (pathname: string) => {
    const navItems = pathname.startsWith("/dashboard")
      ? siteConfig.dashboardNavItems
      : siteConfig.navItems;

    return navItems.map((item, index) => (
      <NavbarMenuItem key={index} isActive={pathname === item.href}>
        <Link
          onClick={() => setIsMenuOpen(false)}
          as={NextLink}
          href={item.href}
          color={pathname === item.href ? "primary" : "foreground"}
        >
          {item.label}
        </Link>
      </NavbarMenuItem>
    ));
  }

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="mr-4">
          <Link href="/" className="font-bold text-inherit">{title}</Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarContent className="gap-5">
          {renderNavItems(pathname)}
        </NavbarContent>
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <ThemeSwitch />
        {
          status != "loading" && (
            session ? (
              <UserButton session={session} />
            ) : (
              <Button onClick={() => signIn()}>ログイン</Button>
            )
          )
        }
      </NavbarContent>
      <NavbarMenu>
        {renderMenuItems(pathname)}
      </NavbarMenu>
    </Navbar>
  );
}

export default AppBar;