// Import Prisma client from the centralized module
import prisma from "@/lib/db/prisma";
import AddProductForm from "./_components/AddProductForm";
import AdminLayout from "../page";

export default async function AddProduct() {
  // Fetch categories from DB
  const categories = await prisma.category.findMany(); 

  // No need to map to only names, just pass the categories directly
  return (
    <AdminLayout>
    <div>
      <h1 className="text-xl lg:text-2xl text-black font-semibold ml-4 mb-4">Add Product</h1>
      {/* Pass categories with id and name as props to the form */}
      <AddProductForm initialCategories={categories} />
    </div>
    </AdminLayout>
  );
}