import { RiAccountCircleLine } from '@remixicon/react';
import { useState } from 'react';
export default function Account() {
  const [isDropdownVisible, setIsDropdoVisible] = useState(false);
  const toggleDropdown = () => setIsDropdoVisible((prev) => !prev);
  return (
    <div
      className='flex justify-evenly items-center cursor-pointer relative'
      onClick={toggleDropdown}
    >
      <div className='flex justify-center items-center'>
        <RiAccountCircleLine className='w-12 h-12' />
        <span className='ps-2'>Reanz Arthur</span>
      </div>
      {isDropdownVisible && (
        <div className='absolute top-[110%] right-[-5px] mt-4 w-40 rounded-md bg-white py-2 shadow-lg dark:bg-gray-800'>
          <hr className='mt-3 mb-2' />
          <div className='mb-2 flex flex-col justify-center items-center'>
            <div className='mb-2'>Account</div>
            <div className='text-red-700'>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}
