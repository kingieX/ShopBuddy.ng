import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '../page';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  CircleUser,
  File,
  ListFilter,
  Menu,
  Package2,
  Search,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Billboards = () => {
  return (
    <AdminLayout>
      <header className="stick z-5 top-0 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Billboards</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Billboards</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl">
          <div className="grid w-full gap-6">
            <div className="flex flex-col items-start justify-between gap-4 border-b px-4 pb-4 lg:flex-row lg:items-center">
              {/* Add Product Button */}
              <Link
                href="/admin/billboards/add"
                className="flex items-center justify-center gap-2 rounded-md bg-button px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                + Add Promotion
              </Link>

              {/* Search Input */}
              <div className="flex items-center space-x-2">
                <p className="text-gray-500">Search:</p>
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default Billboards;
