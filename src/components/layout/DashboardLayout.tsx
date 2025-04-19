
import { ReactNode, useState, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { FallbackLoader } from "@/components/common/FallbackLoader";
import { useAuth } from "@/context/AuthContext";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // If not logged in, redirect to home
  if (!isLoggedIn) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      <Topbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} />
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8 max-w-7xl">
            <Suspense fallback={<FallbackLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
