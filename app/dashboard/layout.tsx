import AppBar from "./components/Appbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppBar />
      <div className='container mx-auto p-4'>
        {children}
      </div>
    </>
  );
}
