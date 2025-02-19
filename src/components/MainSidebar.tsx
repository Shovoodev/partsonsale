import { Sidebar, SidebarProvider } from "./ui/sidebar";

export default function MainSidar() {
  return (
    <SidebarProvider>
      <Sidebar></Sidebar>
    </SidebarProvider>
  );
}
