/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SuccessModal from './SuccessModal';
import LoadingSpinner from '@/app/admin/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { Promotion } from '@prisma/client';

interface EditProductFormProps {
  promotion: Promotion;
}

const EditPromotionForm: React.FC<EditProductFormProps> = ({ promotion }) => {
  const [promotionImage, setPromotionImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Prefill the form with promotion's data
  const formik = useFormik({
    initialValues: {
      title: promotion.title,
      description: promotion.description,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      status: promotion.status,
      promotionImage: null as File | null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Promotion title is required'),
      description: Yup.string().required('Promotion description is required'),
      promotionImage: Yup.mixed().nullable(),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().required('End date is required'),
      status: Yup.string().required('Promotion status is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('status', values.status);
      formData.append(
        'startDate',
        values.startDate
          ? new Date(values.startDate).toISOString().slice(0, 10)
          : ''
      );
      formData.append(
        'endDate',
        values.endDate
          ? new Date(values.endDate).toISOString().slice(0, 10)
          : ''
      );

      if (promotionImage) {
        formData.append('promotionImage', values.promotionImage!);
      }

      try {
        const response = await fetch(`/api/admin/promotions/${promotion.id}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result.message);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPromotionImage(file);
      formik.setFieldValue('promotionImage', file);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/admin/promotions'); // Navigate to promotions list after successful edit
  };

  if (!promotion) {
    return <div>Loading...</div>;
  }

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

          {/* Promotion Image */}
          <div className="max-w-4xl rounded bg-white p-4 shadow lg:shadow-lg">
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
                    alt="Current Promotion Image"
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
                // Convert Date to string format 'YYYY-MM-DD' if startDate is a valid Date object
                value={
                  formik.values.startDate
                    ? new Date(formik.values.startDate)
                        .toISOString()
                        .slice(0, 10)
                    : ''
                }
              />
              {formik.touched.startDate && formik.errors.startDate ? (
                <p className="text-sm text-error">
                  {String(formik.errors.startDate)}
                </p>
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
                value={
                  formik.values.endDate
                    ? new Date(formik.values.endDate).toISOString().slice(0, 10)
                    : ''
                }
              />
              {formik.touched.endDate && formik.errors.endDate ? (
                <p className="text-sm text-error">
                  {String(formik.errors.endDate)}
                </p>
              ) : null}
            </div>

            {/* Promotion Status */}
            <div>
              <label htmlFor="status" className="block font-medium">
                Promotion Status
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

          {/* Submit Button */}
          <div className="mb-4">
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
                'Update Promotion'
              )}
            </button>
          </div>
        </div>
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

export default EditPromotionForm;
