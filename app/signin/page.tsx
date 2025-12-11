'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiEyeLine, RiEyeCloseLine } from '@remixicon/react';
import Input from '@/components/Input/Input';
import Button from '@/components/Button';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSetCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Simple handler, can be expanded later
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { credentials });
    // Test implementation
    router.push('/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='w-full max-w-md p-8 space-y-6 bg-second-dark shadow-2xl border border-gray-600 rounded-2xl'>
        <h1 className='text-3xl font-bold text-center text-gray-900 dark:text-white'>
          Sign In
        </h1>

        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
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
                value={credentials.email}
                onChange={handleSetCredentials}
                placeholder='you@example.com'
              />
            </div>
          </div>

          {/* Password Input with Toggle */}
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
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete='current-password'
                value={credentials.password}
                onChange={handleSetCredentials}
                placeholder='••••••••'
              />
              <button
                type='button'
                onClick={togglePasswordVisibility}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type='submit'
              className='text-black bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary'
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
