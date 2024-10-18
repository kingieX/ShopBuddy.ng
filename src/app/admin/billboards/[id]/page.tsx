import prisma from '@/lib/db/prisma';
import AdminLayout from '../../layout';
import PromotionDetailComponent from './_components/PromotionDetailComponent';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

// Server Component (this can be a server action or a page component)
const PromotionDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Debugging: Log the ID to make sure it's correct
  console.log('Fetching promotion with ID:', id);

  try {
    // Fetch the promotion by ID
    const promotion = await prisma.promotion.findUnique({
      where: { id },
    });

    // Check if the promotion exists
    if (!promotion) {
      return <p>Promotion not found</p>; // Or handle the error in another way
    }

    return (
      <AdminLayout>
        <div>
          <header className="stick z-5 top-0 mt-5 flex h-14 items-center gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Breadcrumb className="flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/admin/billboards">Billboards</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Promotion Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="my-4">
            <PromotionDetailComponent promotion={promotion} />
          </div>
        </div>
      </AdminLayout>
    );
  } catch (error) {
    console.error('Error fetching promotion:', error); // Log the error
    return <p>Internal Server Error. Please try again later.</p>;
  }
};

export default PromotionDetailPage;
