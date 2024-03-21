export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AsKICHI",
  description: "混雑状況管理システム",
  navItems: [
    {
      label: "ホーム",
      href: "/",
    },
    {
      label: "広告",
      href: "/ads",
    },
  ],
  dashboardNavItems: [
    {
      label: "ホーム",
      href: "/dashboard",
    },
    {
      label: "ユーザー",
      href: "/dashboard/users",
    },
    {
      label: "イベント",
      href: "/dashboard/events",
    },
    {
      label: "広告",
      href: "/dashboard/ads",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
