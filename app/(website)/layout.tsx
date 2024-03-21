import AppBar from "@/components/Appbar";
import { siteConfig } from "@/config/site";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar title={siteConfig.name} />
      <div className='container mx-auto p-4'>
        {children}
      </div>
    </>
  )
}