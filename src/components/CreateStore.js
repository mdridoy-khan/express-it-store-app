import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const CreateStore = () => {
  const [domainError, setDomainError] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Store name must be at least 3 characters long')
      .required('Store name is required'),
    domain: Yup.string()
      .required('Domain is required')
      .matches(/^[a-zA-Z0-9-]+$/, 'Domain can only contain letters, numbers, and hyphens'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      domain: '',
      country: 'Bangladesh',
      category: 'Fashion',
      currency: 'BDT',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Check domain availability
        const checkDomainUrl = `https://interview-task-green.vercel.app/task/domains/check/${values.domain}.expressitbd.com`;
        const domainResponse = await axios.get(checkDomainUrl);
        
        if (!domainResponse?.data?.data?.taken) {
          // If domain is not available, create store
          const createStoreUrl = 'https://interview-task-green.vercel.app/task/stores/create';
          const storeData = {
            name: values.name,
            currency: values.currency,
            country: values.country,
            domain: values.domain,
            category: values.category,
            email: values.email,
          };

          await axios.post(createStoreUrl, storeData);
          toast.success("Domain is created successfully.")
          // Handle success (e.g., redirect or show success message)
        } else {
          setDomainError('Domain is already taken. Please choose another.');
          toast.error("Domain is already Exists.")

        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Create a store</h1>
      <p className="text-gray-600 mb-6">Add your basic store information and complete the setup</p>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Give your online store a name
          </label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="How'd you like to call your store?"
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          )}
        </div>

        {/* Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your online store subdomain
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              name="domain"
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="enter your domain name"
              {...formik.getFieldProps('domain')}
            />
            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
              expressitbd.com
            </span>
          </div>
          {(formik.touched.domain && formik.errors.domain) || domainError ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.domain || domainError}
            </div>
          ) : null}
        </div>

        {/* Country Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Where's your store located?
          </label>
          <select
            name="country"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            {...formik.getFieldProps('country')}
          >
            <option value="Bangladesh">Bangladesh</option>
          </select>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            What's your Category?
          </label>
          <select
            name="category"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 border  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            {...formik.getFieldProps('category')}
          >
            <option value="Fashion">Fashion</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Choose store currency
          </label>
          <select
            name="currency"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...formik.getFieldProps('currency')}
          >
            <option value="BDT">BDT (Taka)</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Store contact email
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="you@example.com"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create store
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStore;