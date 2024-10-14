'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SuccessModal from './SuccessModal';
import LoadingSpinner from '@/app/admin/components/LoadingSpinner';

const AddCategoryForm: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Category name is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', values.name);

      try {
        const response = await fetch('/api/admin/categories', {
          method: 'POST',
          body: formData,
        });

        console.log('Response', response);

        if (response.ok) {
          setShowModal(true);
          // Trigger page reload after a short delay
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Reloads after 3 seconds
        } else {
          const errorData = await response.json();
          console.error('Error', errorData.error);
        }
      } catch (error) {
        console.error('Error', error);
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

  // Handle adding another product
  const handleAddAnotherCategory = () => {
    setShowModal(false);
    formik.resetForm();
  };

  return (
    <div className="flex w-full items-center justify-center py-4">
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-start justify-center gap-4 border p-8 lg:max-w-md"
      >
        {/* Category Name */}
        <div className="mb-4 w-full">
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
              <LoadingSpinner />
              Adding Category...
            </>
          ) : (
            'Add Category'
          )}
        </button>
      </form>

      {showModal && (
        <SuccessModal
          onClose={handleCloseModal}
          onAddAnotherCategory={handleAddAnotherCategory}
        />
      )}
    </div>
  );
};

export default AddCategoryForm;
