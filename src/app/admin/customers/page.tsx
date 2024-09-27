import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '../page';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { File, ListFilter, Package2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
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

const Customers = () => {
  return (
    <AdminLayout>
      <div className="bg-muted/40 flex min-h-screen w-full flex-col py-4">
        <header className="stick z-5 bg-background top-0 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Customers</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Customers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="lg:grid-cols- xl:grid-cols- grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  {/* <TabsTrigger value="week">Week</TabsTrigger>
                                    <TabsTrigger value="month">Month</TabsTrigger>
                                    <TabsTrigger value="year">Year</TabsTrigger> */}
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Unactive
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>

                  {/* search */}
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

              {/* Order Cards */}
              <TabsContent value="week">
                <Card className="bg-white" x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Email
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Location
                          </TableHead>
                          <TableHead className="text-">Date Created</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          {/* <TableHead className="text-right">Actions</TableHead> */}
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow className="bg-accent">
                          <TableCell className="flex items-center space-x-1">
                            <div className="rounded-full bg-button">
                              <Image
                                src={'/images/avatars/avatar-1.jpg'}
                                alt="NB"
                                width={28}
                                height={28}
                                className="h-8 w-8 rounded-full"
                              />
                            </div>
                            <div className="font-semibold">Liam Johnson</div>
                          </TableCell>
                          <TableCell className="">09036381640</TableCell>
                          <TableCell className="hidden md:table-cell">
                            shopbuddy@gmail.com
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            10, James street, Lagos
                          </TableCell>
                          <TableCell className="">26/09/2024</TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge
                              className="rounded-full bg-blue-100 text-xs text-green-700"
                              variant="secondary"
                            >
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Customers;
