import {IMAGES} from "../../../utils/images/images";
import {HeaderWrapper} from "../../../style/styled";

export default function Navbar() {
  return (
      <HeaderWrapper className="w-full fixed top-0">
        <nav className='fixed border-0 flex top-0 w-screen justify-between px-10 py-5 items-center bg-gray-900 z-10'>
          <h1 className='text-xl text-white font-bold'>NGOCTU COMPUTER</h1>
          <div className='flex items-center'>
            <div className='md:flex items-center border px-2 py-1 border-white rounded-md bg-white hidden'>
              <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 pt-0.5 text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='5' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <input className='ml-2  bg-white font-' type='text' name='search' id='search' placeholder='Search...' />
            </div>
            <ul className='flex items-center space-x-6 ml-6'>
              <li>
                <div className="cursor-pointer">
                  <img
                      src={IMAGES.icon.avatar as unknown as string}
                      className="rounded-full"
                      style={{
                        width: '43px',
                        height: '43px',
                      }}
                  />
                </div>
              </li>
              <li>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
              </li>
              <li>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth='2'
                >
                  <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                  />
                </svg>
              </li>
            </ul>
          </div>
        </nav>
      </HeaderWrapper>
  );
}
