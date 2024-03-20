"use client"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AppBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session);
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">AzKICHI</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/dashboard">
            ホーム
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard/users">
            ユーザー
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard/events">
            イベント
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/dashboard/ad">
            広告
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                className="transition-transform"
                description={session?.user?.email}
                name={session?.user?.name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat" onAction={(key) => {
              if (key === "logout") {
                signOut();
              } else if (key === "settings") {
                router.push("/dashboard/settings");
              }
            }}>
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">{session?.user?.name}</p>
                <p className="font-bold">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                ユーザ設定
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                ログアウト
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default AppBar;