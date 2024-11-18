/* eslint-disable react/no-unescaped-entities */
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SuccessModal from './SuccessModal';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
}

interface AddProductFormProps {
  initialCategories: Category[]; // Fetch categories as objects with id and name
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  initialCategories,
}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories); // Now we store the whole category object
  const [newCategory, setNewCategory] = useState<string>(''); // State for new category
  const [imageGallery, setImageGallery] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      mainImage: null as File | null,
      regularPrice: '',
      salePrice: '',
      status: '',
      categoryId: '', // Now we store the categoryId
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Product title is required'),
      description: Yup.string().required('Product description is required'),
      mainImage: Yup.mixed().required('Main image is required'),
      regularPrice: Yup.number()
        .required('Regular price is required')
        .min(0, "Price can't be negative"),
      salePrice: Yup.number().min(0, "Sale price can't be negative"),
      status: Yup.string().required('Product status is required'),
      categoryId: Yup.string().nullable(), // We now validate categoryId instead of category name
      newCategory: Yup.string().nullable(),
    }).test(
      'one-category-method',
      'Please select a category or add a new category (not both).',
      function (values) {
        const { categoryId, newCategory } = values;

        // Check that only one of the fields is filled, but not both or none
        if ((categoryId && newCategory) || (!categoryId && !newCategory)) {
          return false;
        }
        return true;
      }
    ),
    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      if (values.mainImage) {
        formData.append('mainImage', values.mainImage);
      }
      imageGallery.forEach((image, index) =>
        formData.append(`galleryImage${String(index)}`, image)
      );
      formData.append('regularPrice', values.regularPrice);
      formData.append('salePrice', values.salePrice);
      formData.append('status', values.status);

      // Check if a new category was provided
      if (newCategory) {
        formData.append('newCategory', newCategory); // Send the new category to the server
      } else {
        formData.append('categoryId', values.categoryId); // Use existing category
      }

      // Submit form data to the API route
      try {
        const response = await fetch('/api/admin/add-product', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Success:', result.message); // Access the 'message' field
          console.log('Created product:', result.product); // Access the 'product' data if needed
          // Redirect to success page
          setShowModal(true);
          router.refresh();
          // Trigger page reload after a short delay
          setTimeout(() => {
            // window.location.reload();
          }, 3000); // Reloads after 3 seconds
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData.error);
          // Redirect to the error page with the error message
          // router.push(`/error?errorMessage=${encodeURIComponent(errorData.error.toString())}`);
        }
      } catch (error) {
        console.error('Error:', error);
        // router.push(/error?errorMessage=${encodeURIComponent(error.message)});
      } finally {
        setLoading(false);
        formik.resetForm();
        // reload
        router.refresh();
      }
    },
  });

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    router.refresh();
    formik.resetForm();
  };

  // Handle adding another product
  const handleAddAnotherProduct = () => {
    setShowModal(false);
    router.refresh();
    formik.resetForm();
    setImageGallery([]);
  };

  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue('mainImage', file);
    }
  };

  const handleImageGalleryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    // Check if adding these files exceeds the limit
    if (imageGallery.length + files.length > 4) {
      setError('You can only upload a maximum of 4 images.');
      return;
    }

    // Clear error if image count is valid
    setError(null);

    // Add new images to the gallery
    setImageGallery((prevImages) => [...prevImages, ...files]);
  };

  const handleImageDelete = (index: number) => {
    setImageGallery((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="py-4; w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col items-start justify-center gap-4 lg:flex-row"
      >
        <div className="w-full space-y-4 px-4 lg:w-3/5">
          <div className="max-w-4xl rounded bg-white p-4 shadow lg:shadow-lg">
            {/* Product Title */}
            <div>
              <label htmlFor="title" className="block font-medium">
                Product Title
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

            {/* Product Description */}
            <div>
              <label htmlFor="description" className="block font-medium">
                Product Description
              </label>
              <textarea
                id="description"
                name="description"
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red-500'
                    : ''
                }`}
                onChange={(e) => {
                  formik.handleChange(e);
                  e.target.style.height = 'auto'; // Reset height before adjusting
                  e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on content
                }}
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
            {/* Main Image */}
            <div className="mb-6">
              <label htmlFor="mainImage" className="block font-medium">
                Product Image
              </label>
              <p className="text-sm text-gray-600">Add Product main Image</p>
              <input
                id="mainImage"
                name="mainImage"
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
              />
              <label htmlFor="mainImage" className="mt-2 block cursor-pointer">
                <div className="flex w-full items-center justify-between rounded-md border border-gray-300 p-3">
                  <span>Choose file</span>
                  <span>
                    {formik.values.mainImage
                      ? (formik.values.mainImage as File).name
                      : 'No file chosen'}
                  </span>
                </div>
              </label>
              {formik.values.mainImage && (
                <div className="mt-4">
                  <Image
                    src={URL.createObjectURL(formik.values.mainImage as File)}
                    alt="Main Image Preview"
                    width={150}
                    height={150}
                    className="rounded"
                  />
                </div>
              )}
            </div>

            {/* Image Gallery */}
            <div>
              <label htmlFor="gallery" className="block font-medium">
                Product Gallery
              </label>
              <p className="text-sm text-gray-600">
                Add Product Gallery Images (Max 4)
              </p>

              <input
                id="gallery"
                name="gallery"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageGalleryChange}
                className="hidden"
              />
              <label htmlFor="gallery" className="mt-2 block cursor-pointer">
                <div className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-6">
                  <span>
                    Drag'n'drop some files here, or click to select files
                  </span>
                </div>
              </label>

              {/* Display error message */}
              {error && <p className="mt-2 text-red-600">{error}</p>}

              {/* Image Gallery */}
              {imageGallery.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {imageGallery.map((image, idx) => (
                    <div key={idx} className="relative">
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Gallery Image ${idx + 1}`}
                        width={150}
                        height={150}
                        className="rounded"
                      />
                      {/* X Button to Delete */}
                      <button
                        type="button"
                        onClick={() => handleImageDelete(idx)}
                        className="right-21 absolute top-0 rounded-full p-2 text-danger-dark"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:w-2/5 lg:max-w-2xl">
          <div className="mb-4 space-y-4 rounded bg-white px-4 py-6 shadow lg:shadow-lg">
            {/* Regular Price */}
            <div>
              <label htmlFor="regularPrice" className="block font-medium">
                Regular Price
              </label>
              <input
                id="regularPrice"
                name="regularPrice"
                type="number"
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${formik.touched.regularPrice && formik.errors.regularPrice ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.regularPrice}
              />
              {formik.touched.regularPrice && formik.errors.regularPrice ? (
                <p className="text-sm text-error">
                  {formik.errors.regularPrice}
                </p>
              ) : null}
            </div>

            {/* Sale Price */}
            <div>
              <label htmlFor="salePrice" className="block font-medium">
                Sale Price
              </label>
              <input
                id="salePrice"
                name="salePrice"
                type="number"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salePrice}
              />
              {formik.touched.salePrice && formik.errors.salePrice ? (
                <p className="text-sm text-error">{formik.errors.salePrice}</p>
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
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${formik.touched.status && formik.errors.status ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.status}
              >
                <option value="">Select Status</option>
                <option value="on_sale">On Sale</option>
                <option value="sold_out">Sold Out</option>
              </select>
              {formik.touched.status && formik.errors.status ? (
                <p className="text-sm text-error">{formik.errors.status}</p>
              ) : null}
            </div>

            {/* Category */}
            <div className="w-full">
              <label htmlFor="category" className="block font-medium">
                Category
              </label>
              <select
                id="category"
                name="categoryId"
                disabled={newCategory !== ''} // Disable dropdown if a new category is being added
                className={`mt-1 block w-full rounded-md border border-gray-300 p-2 ${formik.touched.categoryId && formik.errors.categoryId ? 'border-red-500' : ''}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.categoryId}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formik.touched.categoryId && formik.errors.categoryId ? (
                <p className="text-sm text-error">{formik.errors.categoryId}</p>
              ) : null}
            </div>
            {/* New Category Input */}
            <div className="flex w-full flex-col">
              <label htmlFor="newCategory" className="mb-1">
                New Category
              </label>
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter a new category"
                className="border px-4 py-2"
              />
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
                Adding Product...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>

      {/* Show modal if product was added successfully */}
      {showModal && (
        <SuccessModal
          onClose={handleCloseModal}
          onAddAnotherProduct={handleAddAnotherProduct}
        />
      )}
    </div>
  );
};

export default AddProductForm;
