'use client';

import { useState } from 'react';
import { RiEyeLine, RiEyeCloseLine } from '@remixicon/react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup attempt:', { formData });
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='w-full max-w-md p-8 space-y-6 bg-second-dark shadow-2xl border border-gray-600 rounded-2xl px-4 py-4'>
        <h1 className='text-3xl font-bold text-center text-gray-900 dark:text-white'>
          Create an Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          {/* Name Input */}
          <div>
            <label
              htmlFor='firstName'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              First Name
            </label>
            <div className='mt-1'>
              <Input
                id='firstName'
                name='firstName'
                type='text'
                required
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder='John Doe'
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='middleName'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Middle Name
            </label>
            <div className='mt-1'>
              <Input
                id='middleName'
                name='middleName'
                type='text'
                required
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder='Doe'
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='lastName'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Last Name
            </label>
            <div className='mt-1'>
              <Input
                id='lastName'
                name='lastName'
                type='text'
                required
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder='Doe'
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Email address
            </label>
            <div className='mt-1'>
              <Input
                id='email'
                name='email'
                type='email'
                required
                autoComplete='email'
                value={formData.email}
                onChange={handleInputChange}
                placeholder='you@example.com'
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Password
            </label>
            <div className='mt-1 relative'>
              <Input
                id='password'
                name='password'
                type={showPassword.password ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder='••••••••'
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('password')}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                aria-label={
                  showPassword.password ? 'Hide password' : 'Show password'
                }
              >
                {showPassword.password ? <RiEyeLine /> : <RiEyeCloseLine />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor='confirmPassword'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Confirm Password
            </label>
            <div className='mt-1 relative'>
              <Input
                id='confirmPassword'
                name='confirmPassword'
                type={showPassword.confirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder='••••••••'
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('confirmPassword')}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                aria-label={
                  showPassword.confirmPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword.confirmPassword ? (
                  <RiEyeLine />
                ) : (
                  <RiEyeCloseLine />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type='submit'
              className='text-black bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary'
            >
              Create Account
            </Button>
          </div>
        </form>

        <div className='text-center text-sm text-gray-600 dark:text-gray-400'>
          Already have an account?{' '}
          <a
            href='/signin'
            className='font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
