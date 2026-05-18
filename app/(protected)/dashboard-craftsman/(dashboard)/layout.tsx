import SidebarCraftsman from "@/components/features/craftsman/SidebarCraftsman";
import EmailVerificationBanner from "@/components/features/craftsman/EmailVerificationBanner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col min-h-screen w-full">
      <EmailVerificationBanner />
      
      <div className="flex flex-1 w-full relative">
        <div className="bg-secondary shrink-0 h-screen sticky top-0 transition-all duration-300 z-40">
          <SidebarCraftsman />
        </div>
        <div className="flex-1 lg:py-6 lg:px-8 p-3 overflow-x-hidden">
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
