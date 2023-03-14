import {IMAGES} from "../../utils/images/images";


export default function ConfirmYesNoPopUp(props: any) {
    const {title, setOpenAdd, content, handleYes, handleNo} = props;
    return (
        <div className='fixed mx-auto my-auto inset-5 h-[300px] w-[500px] bg-gray-100 shadow-gray-300 shadow-xl rounded-lg'>
            <div className="relative flex-1 bg-green-300 font-bold text-xl text-black rounded-t-md text-center py-2">
                <div>{title}</div>
                <div className="absolute right-0 top-0 px-2 py-2">
                    <button onClick={() => setOpenAdd(0)}>
                        <svg height={28} width={28}>{IMAGES.icon.close}</svg>
                    </button>
                </div>
            </div>
            <hr className='h-[2px]'/>
            <div className='h-[260px] flex flex-col justify-between px-10 py-5'>
                <div>
                    {content}
                </div>
                <div className='flex flex-row justify-end space-x-3'>
                    <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-500 font-bold py-2 px-8 rounded-md" type="button" onClick={handleYes}>
                        Yes
                    </button>
                    <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-red-500 font-bold py-2 px-8 rounded-md" type="button" onClick={handleNo}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}