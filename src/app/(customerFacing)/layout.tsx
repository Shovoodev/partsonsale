import { AppSidebar } from "@/components/AppSidebar";
import { Nav, NavLink } from "@/components/Nav";
import { TanstackProvider } from "@/components/provider/tanstack-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export const dynamic = "force-dynamic";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className=" flex h-screen w-full ">
          <div className=" w-full">
            <Nav>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/products">Products</NavLink>
              <NavLink href="/orders">My Orders</NavLink>
            </Nav>
            <div className="container my-6">
              <TanstackProvider>{children}</TanstackProvider>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
