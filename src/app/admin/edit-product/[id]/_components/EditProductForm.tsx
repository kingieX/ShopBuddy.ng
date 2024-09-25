/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Image from "next/image";
import { useFormik } from 'formik'
import * as Yup from "yup";
import SuccessModal from "./SuccessModal";
import LoadingSpinner from "@/app/admin/components/LoadingSpinner";
import { useRouter } from "next/navigation";
// import { useNavigate } from 'react-router-dom';
import { Category, Product } from "@prisma/client";

interface EditProductFormProps {
  product: Product; // Adjust according to your product interface/type
  initialCategories: Category[]; // Array of categories
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, initialCategories }) => {
  const [categories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState<string>(""); // For adding new category
  const [imageGallery, setImageGallery] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false); 
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const navigate = useNavigate();

  // Prefill the form with the product's data
  const formik = useFormik({
    initialValues: {
      title: product.title,
      description: product.description,
      mainImage: null as File | null,
      regularPrice: product.regularPrice,
      salePrice: product.salePrice,
      status: product.status,
      categoryId: product.categoryId ,  // Use categoryId from the product
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Product title is required"),
      description: Yup.string().required("Product description is required"),
      mainImage: Yup.mixed().nullable(),
      regularPrice: Yup.number()
        .required("Regular price is required")
        .min(0, "Price can't be negative"),
      salePrice: Yup.number().min(0, "Sale price can't be negative"),
      status: Yup.string().required("Product status is required"),
      categoryId: Yup.string().nullable(),  // Validate categoryId instead of category name
      newCategory: Yup.string().nullable(),
    }).test('one-category-method', 'Please select a category or add a new category (not both).', function (values) {
      const { categoryId, newCategory } = values;
      
      // Check that only one of the fields is filled, but not both or none
      if ((categoryId && newCategory) || (!categoryId && !newCategory)) {
        return false;
      }
      return true;
    }),
    onSubmit: async (values) => {
      setLoading(true);

      const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.mainImage) {
        formData.append("mainImage", values.mainImage);
    }
    imageGallery.forEach((image, index) =>
        formData.append(`galleryImage${index.toString()}`, image)
    );
    formData.append("regularPrice", values.regularPrice.toString());
    formData.append("salePrice", values.salePrice?.toString() || "");
    formData.append("status", values.status);

      if (newCategory) {
        formData.append("newCategory", newCategory);
      } else {
        formData.append("categoryId", values.categoryId);
      }

      // API call for updating the product
    try {
        const response = await fetch(`/api/products/${product.id}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Success:", result.message);
            setShowModal(true); // Show success modal
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            router.push(`/error?errorMessage=${encodeURIComponent(errorData.error)}`);
        }
    } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  // const handleMainImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     formik.setFieldValue("mainImage", file);
  //   }
  // };

  // const handleImageGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(event.target.files || []);
  //   if (files.length <= 4) {
  //     setImageGallery(files);
  //   }
  // };

   // Handle closing the modal
   const handleCloseModal = () => {
    setShowModal(false);
    formik.resetForm();
  };

  // Handle adding another product
  const handleAddAnotherProduct = () => {
    setShowModal(false);
    // formik.resetForm();
    // setImageGallery([]);
    // navigate('/admin/products')
  };

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="w-full flex lg:flex-row flex-col justify-center items-start gap-4">
        <div className="w-full lg:w-3/5 space-y-4 px-4">
          <div className="max-w-4xl p-4 bg-white rounded lg:shadow-lg shadow">
            {/* Product Title */}
            <div>
              <label htmlFor="title" className="block font-medium">
                Product Title
              </label>
            <input
                id="title"
                name="title"
                type="text"
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                    formik.touched.title && formik.errors.title ? "border-red-500" : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
            />
              {formik.touched.title && formik.errors.title ? (
                <p className="text-error text-sm">{formik.errors.title}</p>
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
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                    formik.touched.description && formik.errors.description
                        ? "border-red-500"
                        : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
            />
              {formik.touched.description && formik.errors.description ? (
                <p className="text-error text-sm">{formik.errors.description}</p>
              ) : null}
            </div>
          </div>

          {/* <div className="max-w-4xl p-4 bg-white rounded lg:shadow-lg shadow">
            // Main Image
            <div className="mb-6">
              <label htmlFor="mainImage" className="block font-medium">
                Product Image
              </label>
              <p className="text-sm text-gray-600">Update Product main Image</p>
              <input
                id="mainImage"
                name="mainImage"
                type="file"
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
              />
              <label htmlFor="mainImage" className="block mt-2 cursor-pointer">
                <div className="flex items-center justify-between w-full border border-gray-300 rounded-md p-3">
                  <span>Choose file</span>
                  <span>
                    {formik.values.mainImage
                      ? (formik.values.mainImage as File).name
                      : "No file chosen"}
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

            // Image Gallery
            <div>
              <label htmlFor="gallery" className="block font-medium">
                Product Gallery
              </label>
              <p className="text-sm text-gray-600">
                Update Product Gallery Images (Max 4)
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
              <label htmlFor="gallery" className="block mt-2 cursor-pointer">
                <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md p-6">
                  <span>
                    Drag'n'drop some files here, or click to select files
                  </span>
                </div>
              </label>
            {imageGallery.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {imageGallery.map((image, idx) => (
                        <div key={idx} className="relative">
                            <Image
                                src={URL.createObjectURL(image)}
                                alt={`Gallery Image ${idx + 1}`}
                                width={150}
                                height={150}
                                className="rounded"
                            />
                        </div>
                    ))}
                </div>
            )}
            </div>
          </div> */}

          {/* Prices */}
          <div className="max-w-4xl p-4 bg-white rounded lg:shadow-lg shadow">
            <div>
              <label htmlFor="regularPrice" className="block font-medium">
                Regular Price
              </label>
            <input
                id="regularPrice"
                name="regularPrice"
                type="number"
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                    formik.touched.regularPrice && formik.errors.regularPrice
                        ? "border-red-500"
                        : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.regularPrice}
            />
              {formik.touched.regularPrice && formik.errors.regularPrice ? (
                <p className="text-error text-sm">{formik.errors.regularPrice}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="salePrice" className="block font-medium">
                Sale Price
              </label>
            <input
                id="salePrice"
                name="salePrice"
                type="number"
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                    formik.touched.salePrice && formik.errors.salePrice
                        ? "border-red-500"
                        : ""
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.salePrice ?? ''}
            />
              {formik.touched.salePrice && formik.errors.salePrice ? (
                <p className="text-error text-sm">{formik.errors.salePrice}</p>
              ) : null}
            </div>
          </div>

        </div>

        <div className="w-full lg:w-1/3 space-y-4 px-4">
          {/* Status */}
          <div className="max-w-4xl p-4 bg-white rounded lg:shadow-lg shadow">
            <label htmlFor="status" className="block font-medium">
              Product Status
            </label>
            <select
              id="status"
              name="status"
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${formik.touched.status && formik.errors.status ? "border-red-500" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.status}
            >
              <option value="">Select Status</option>
              <option value="on_sale">On Sale</option>
              <option value="sold_out">Sold Out</option>
            </select>
            {formik.touched.status && formik.errors.status ? (
              <p className="text-error text-sm">{formik.errors.status}</p>
            ) : null}
          </div>

          {/* Categories */}
          <div className="max-w-md p-4 bg-white rounded lg:shadow-lg shadow">
            <label htmlFor="categoryId" className="block font-medium">
              Product Category
            </label>
            <select
                id="categoryId"
                name="categoryId"
                className={`mt-1 block w-full border border-gray-300 rounded-md p-2 ${
                    formik.touched.categoryId && formik.errors.categoryId
                        ? "border-red-500"
                        : ""
                }`}
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
              <p className="text-error text-sm">{formik.errors.categoryId}</p>
            ) : null}
          </div>

          {/* Add New Category */}
          <div className="max-w-md p-4 bg-white rounded lg:shadow-lg shadow">
            <div className="w-full">
              <label htmlFor="newCategory" className="block font-medium mb-2">
                Or Add New Category
              </label>
              <input
                id="newCategory"
                name="newCategory"
                type="text"
                className="border w-full py-2 px-4"
                onChange={(e) => setNewCategory(e.target.value)}
                onBlur={formik.handleBlur}
                value={newCategory}
                placeholder="Enter a new category"
              />
    
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-button text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition-colors flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading ? (
            <>
              <LoadingSpinner />
              Saving Changes...
            </>
            ) : (
              "Save Change"
            )}
          </button>
        </div>

          {/* Success Modal */}
          {showModal && <SuccessModal onClose={handleCloseModal} onAddAnotherProduct={handleAddAnotherProduct} />}
      </form>
    </div>
  );
};

export default EditProductForm