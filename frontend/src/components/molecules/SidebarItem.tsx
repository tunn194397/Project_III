import { Link } from 'react-router-dom';

interface SubSidebarItemProps {
    title: string;
    path: string;
    icon: string;
}

interface SidebarItemProps {
  title: string;
  path: string;
  icon: string;
  subRoute: Array<SubSidebarItemProps>;
}

export default function SidebarItem({ title, path, icon, subRoute }: SidebarItemProps) {
  return (
    <Link to={path}>
      <div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'>
        <i className={icon}></i>
        <span className='text-[15px] ml-4 text-gray-200 font-bold'>{title}</span>
      </div>
    </Link>
  );
}