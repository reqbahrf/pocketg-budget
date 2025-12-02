import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col justify-center items-center py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-4xl font-bold mb-4 text-center'>
            Track You Money. Even Without Internet.
          </h1>
          <h2 className='text-2xl indent-8 text-center'>
            A simple, offline-ready budget tracker built for students. Log
            expenses anytime, get real-world insights, and stay in control of
            your daily spending.
          </h2>
          <Link
            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            href='/signup'
          >
            Get Started
          </Link>
          <Link
            className='mt-4 text-white hover:text-blue-500'
            href='/signin'
          >
            Already have an account?
          </Link>
        </div>
      </main>
    </div>
  );
}
