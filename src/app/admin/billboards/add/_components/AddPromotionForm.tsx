'use client';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FaCalendarAlt } from 'react-icons/fa'; // Import the FontAwesome calendar icon
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card } from '@/components/ui/card';

// Validation schema using Yup
const PromotionSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'End date cannot be before start date')
    .required('End date is required'),
  image: Yup.mixed().required('Image is required'),
});

interface PromotionFormProps {
  onSubmit: (data: any) => void;
}

const AddPromotionForm: React.FC<PromotionFormProps> = ({ onSubmit }) => {
  const [isActive, setIsActive] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      startDate: null,
      endDate: null,
      image: null,
    },
    validationSchema: PromotionSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, isActive });
    },
  });

  return (
    <Card className="lg:w-1/2">
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-8 lg:px-12">
        {/* Title */}
        <div>
          <Label htmlFor="title">Promotion Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter the promotion title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-500">{formik.errors.title}</p>
          ) : null}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter the promotion description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <p className="text-red-500">{formik.errors.description}</p>
          ) : null}
        </div>

        <div className="flex w-full space-x-2">
          {/* Start Date with Icon */}
          <div className="w-full">
            <Label htmlFor="startDate">Start Date</Label>
            <div className="relative">
              <DatePicker
                id="startDate"
                selected={formik.values.startDate}
                onChange={(date) => formik.setFieldValue('startDate', date)}
                onBlur={formik.handleBlur}
                dateFormat="yyyy-MM-dd"
                className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50" // Padding to the left for the icon
              />
              <FaCalendarAlt className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
            </div>
            {formik.touched.startDate && formik.errors.startDate ? (
              <p className="text-red-500">{formik.errors.startDate}</p>
            ) : null}
          </div>

          {/* End Date with Icon */}
          <div className="w-full">
            <Label htmlFor="endDate">End Date</Label>
            <div className="relative">
              <DatePicker
                id="endDate"
                selected={formik.values.endDate}
                onChange={(date) => formik.setFieldValue('endDate', date)}
                onBlur={formik.handleBlur}
                dateFormat="yyyy-MM-dd"
                className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 pl-10 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50" // Padding to the left for the icon
              />
              <FaCalendarAlt className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
            </div>
            {formik.touched.endDate && formik.errors.endDate ? (
              <p className="text-red-500">{formik.errors.endDate}</p>
            ) : null}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="image">Promotion Image</Label>
          <Input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(event) =>
              formik.setFieldValue('image', event.currentTarget.files?.[0])
            }
          />
          {formik.touched.image && formik.errors.image ? (
            <p className="text-red-500">{formik.errors.image}</p>
          ) : null}
        </div>

        {/* Active Status */}
        <div className="flex items-center space-x-2">
          <Label htmlFor="isActive">Active Status</Label>
          <Switch
            id="isActive"
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-button text-white hover:bg-blue-500"
          type="submit"
        >
          Submit Promotion
        </Button>
      </form>
    </Card>
  );
};

export default AddPromotionForm;
