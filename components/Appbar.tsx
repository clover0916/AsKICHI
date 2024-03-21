import { siteConfig } from "@/config/site";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import UserButton from "@/components/UserButton";
import { SignIn } from "@/components/auth-components";
import { auth } from "@/auth";
import { ThemeSwitch } from "@/components/theme-switch";
import Link from "next/link";
import AppbarContent from "./AppbarContent";

const AppBar = async ({ title }: { title: string }) => {
  const session = await auth();

  return (
    <Navbar>
      <NavbarBrand className="mr-4">
        <Link href="/" className="font-bold text-inherit">{title}</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <AppbarContent />
      </NavbarContent>
      <NavbarContent as="div" className="items-center" justify="end">
        <ThemeSwitch />
        {
          session ? (
            <UserButton session={session} />
          ) : (
            <SignIn />
          )
        }
      </NavbarContent>
    </Navbar>
  );
}

export default AppBar;