'use client';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SuccessModal from './SuccessModal';
import LoadingSpinner from '@/app/admin/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { Category } from '@prisma/client';

interface EditCategoryFormProps {
  category: Category;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ category }) => {
  const [categoryName, setCategoryName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Prefill the form with the category name
  const formik = useFormik({
    initialValues: {
      name: category.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', values.name);

      try {
        const response = await fetch(`/api/admin/categories/${category.id}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Success', result.message);
          setShowModal(true);
        } else {
          const errorData = await response.json();
          console.error('Error', errorData.message);
        }
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/admin/categories');
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full py-4">
      <form onSubmit={formik.handleSubmit} className="mx-auto max-w-lg">
        <div className="mb-4">
          <label htmlFor="categoryName" className="block font-medium">
            Category Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${
              formik.touched.name && formik.errors.name ? 'border-red-500' : ''
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="text-sm text-danger">{formik.errors.name}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-button px-4 py-2 text-white transition-colors hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <>
              {' '}
              <LoadingSpinner /> Updating..
            </>
          ) : (
            'Update Category'
          )}
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <SuccessModal
          // message="Promotion updated successfully!"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EditCategoryForm;
