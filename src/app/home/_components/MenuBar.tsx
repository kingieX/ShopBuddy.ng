'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
}

const MenuBar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  //   const [loading, setLoading] = useState<boolean>(true);
  //   const [error, setError] = useState<string | null>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/categories');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data.categories);
        // console.log(data);

        // setLoading(false);
      } catch (err) {
        // setError((err as Error).message);
        // setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="hidden w-80 border-r bg-white py-4 pr-8 lg:block">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Dynamic Menu */}
        <ul className="flex flex-col gap-2">
          <li>
            <Link href="/products">
              <span className="hover:text-button hover:underline">
                All Products
              </span>
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/category/${category.id}`}>
                <span className="hover:text-button hover:underline">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div>{/* Other navigation items */}</div>
      </div>
    </nav>
  );
};

export default MenuBar;
