import SidebarAdmin from "@/components/features/admin/SidebarAdmin";

const AdminControlLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col min-h-screen w-full">
      <div className="flex flex-1 w-full relative">
        <div className="bg-secondary shrink-0 h-screen sticky top-0 transition-all duration-300 z-40">
          <SidebarAdmin />
        </div>
        <div className="flex-1 lg:py-8 lg:px-10 p-4 bg-gray-50 overflow-x-hidden overflow-y-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AdminControlLayout;
