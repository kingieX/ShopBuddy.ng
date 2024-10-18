// components/AdminLayout.tsx
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="fixed hidden h-screen w-0 border-r border-gray-300 bg-gray-100 lg:block lg:w-64">
        {/* Your Sidebar Code */}
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="static flex flex-1 flex-col lg:ml-64">
        {/* TopBar, without overlapping the sidebar */}
        <TopBar />

        {/* Content below the top bar */}
        <div className="h-screen flex-1 overflow-y-auto bg-gray-50 p-4 pt-14 lg:mt-4 lg:pt-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
