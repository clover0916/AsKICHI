import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">AzKICHI</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              ホーム
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/users">
              ユーザー
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/events">
              イベント
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/ad">
              広告
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}

export default DashboardPage;