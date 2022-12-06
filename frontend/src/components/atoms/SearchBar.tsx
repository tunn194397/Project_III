export default function SearchBar() {
    return (
        <div className='m-4 flex items-center justify-between '>
            <div className='md:flex items-center border px-1 py-2 border-white rounded-md bg-white hidden w-1/3'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 pt-0.5 text-gray-500'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='5' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
                <input className='ml-2 bg-white font- border-none outline-none' type='text' placeholder='Name, email, phone,... ' />
            </div>
            <div>
                <button className='bg-green-500 px-3 py-2 rounded font-semibold text-black  hover:bg-green-600'> Add new </button>
            </div>
        </div>
    );
}