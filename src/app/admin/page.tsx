// components/AdminLayout.tsx
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="lg:w-64 w-0 hidden lg:block bg-gray-100 h-screen border-r border-gray-300 fixed">
        {/* Your Sidebar Code */}
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* TopBar, without overlapping the sidebar */}
        <TopBar />

        {/* Content below the top bar */}
        <div className="flex-1 overflow-y-auto lg:pt-16 p-4 mt-4 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
