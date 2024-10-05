/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SuccessModal from './SuccessModal';
import LoadingSpinner from '@/app/admin/components/LoadingSpinner';
import { useRouter } from 'next/navigation';

const AddPromotionForm: React.FC = () => {
  const [promotionImage, setPromotionImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
      promotionImage: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Promotion title is required'),
      description: Yup.string().required('Promotion description is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().required('End date is required'),
      status: Yup.string().required('Promotion status is required'),
      promotionImage: Yup.mixed().required('Promotion image is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('startDate', values.startDate);
      formData.append('endDate', values.endDate);
      formData.append('status', values.status);
      // Ensure you append the image file from the input
      if (values.promotionImage) {
        formData.append('image', values.promotionImage); // Append the image file
      }

      // Log form data before submission
      console.log('Form Values:', {
        title: values.title,
        description: values.description,
        startDate: values.startDate,
        endDate: values.endDate,
        status: values.status,
        promotionImage: values.promotionImage
          ? values.promotionImage.name
          : 'No Image',
      });

      try {
        const response = await fetch('/api/admin/promotions', {
          method: 'POST',
          body: formData,
        });

        console.log('Response:', response);

        if (response.ok) {
          setShowModal(true);
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData.error);
        }
      } catch (error) {
        console.error('Error:', error);
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
  const handleAddAnotherPromotion = () => {
    setShowModal(false);
    formik.resetForm();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue('promotionImage', file);
    }
  };

  return (
    <div className="w-full py-4">
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-start justify-center gap-4 lg:flex-row"
      >
        <div className="w-full space-y-4 px-4 lg:w-3/5">
          <div className="max-w-4xl rounded bg-white p-4 shadow lg:shadow-lg">
            {/* Promotion Title */}
            <div>
              <label htmlFor="title" className="block font-medium">
                Promotion Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${
                  formik.touched.title && formik.errors.title
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <p className="text-sm text-danger">{formik.errors.title}</p>
              ) : null}
            </div>

            {/* Promotion Description */}
            <div>
              <label htmlFor="description" className="block font-medium">
                Promotion Description
              </label>
              <textarea
                id="description"
                name="description"
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <p className="text-sm text-error">
                  {formik.errors.description}
                </p>
              ) : null}
            </div>
          </div>

          <div className="max-w-4xl rounded bg-white p-4 shadow lg:shadow-lg">
            {/* Promotion Image */}
            <div className="mb-6">
              <label htmlFor="promotionImage" className="block font-medium">
                Promotion Image
              </label>
              <input
                id="promotionImage"
                name="promotionImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="promotionImage"
                className="mt-2 block cursor-pointer"
              >
                <div className="flex w-full items-center justify-between rounded-md border border-gray-300 p-3">
                  <span>Choose file</span>
                  <span>
                    {formik.values.promotionImage
                      ? (formik.values.promotionImage as File).name
                      : 'No file chosen'}
                  </span>
                </div>
              </label>
              {formik.values.promotionImage && (
                <div className="mt-4">
                  <Image
                    src={URL.createObjectURL(
                      formik.values.promotionImage as File
                    )}
                    alt="Promotion Image Preview"
                    width={150}
                    height={150}
                    className="rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:w-2/5 lg:max-w-2xl">
          <div className="mb-4 space-y-4 rounded bg-white px-4 py-6 shadow lg:shadow-lg">
            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block font-medium">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${
                  formik.touched.startDate && formik.errors.startDate
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <p className="text-sm text-error">{formik.errors.startDate}</p>
              ) : null}
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="endDate" className="block font-medium">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${
                  formik.touched.endDate && formik.errors.endDate
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <p className="text-sm text-error">{formik.errors.endDate}</p>
              ) : null}
            </div>
          </div>

          <div className="mb-4 space-y-6 rounded bg-white px-4 py-6 shadow lg:shadow-lg">
            {/* Status */}
            <div className="w-full">
              <label htmlFor="status" className="block font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${
                  formik.touched.status && formik.errors.status
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <p className="text-sm text-error">{formik.errors.status}</p>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-button px-4 py-2 text-white transition-colors hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoadingSpinner />
                Adding Promotion...
              </>
            ) : (
              'Add Promotion'
            )}
          </button>
        </div>
      </form>

      {showModal && (
        <SuccessModal
          onClose={handleCloseModal}
          onAddAnotherPromotion={handleAddAnotherPromotion}
        />
      )}
    </div>
  );
};

export default AddPromotionForm;
