"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import clsx from "clsx";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuExternalLink } from "react-icons/lu";

const roles = [
  { value: "admin", label: "管理者" },
  { value: "teacher", label: "教師" },
  { value: "student", label: "生徒" },
];

type items = {
  key: string;
  label: React.ReactNode;
  className?: string;
  endContent?: React.ReactNode;
}[];

export default function LoginButton({ session }: { session: Session | null }) {
  const router = useRouter();

  if (session) {
    const items: items = [
      {
        key: "profile",
        label: (
          <>
            <p className="font-bold">{session?.user?.name}</p>
            <p className="font-bold">{session?.user?.email}</p>
          </>
        ),
        className: "h-14 gap-2",
      },
      {
        key: "settings",
        label: "ユーザ設定",
      },
      {
        key: "logout",
        label: "ログアウト",
      }
    ];

    if (session?.user?.role === "admin") {
      items.splice(1, 0, {
        key: "dashboard",
        label: "ダッシュボード",
        endContent: <LuExternalLink />,
      });
    }

    return (
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              size: "sm",
            }}
            className="transition-transform"
            description={roles.find((role) => role.value === session?.user?.role)?.label || "未設定"}
            name={session?.user?.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat" items={items} onAction={(key) => {
          if (key === "logout") {
            signOut();
          } else if (key === "settings") {
            router.push("/settings");
          } else if (key === "dashboard") {
            router.push("/dashboard");
          }
        }}>
          {(item) => (
            <DropdownItem
              key={item.key}
              color={item.key === "logout" ? "danger" : "default"}
              className={clsx(item.key === "logout" ? "text-danger" : "", item.className)}
              endContent={item.endContent}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    )
  }
}