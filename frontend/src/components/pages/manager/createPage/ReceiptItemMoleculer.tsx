import {useState} from "react";

export default function ReceiptItemMoleculer(props: any) {
    const {field, register, errors, setSearchQuery, setAddParam, domain} = props;

    const [itemIdValue, setItemIdValue] = useState([])
    const handleChange = (value: any) => {
        setSearchQuery((prevState: any) => ({
            ... prevState, deviceType: value,
        }))
        setAddParam(false)
    }
    return (
        <div className='flex flex-row'>
            <div className='flex flex-col space-y-2'>
                <div className='flex flex-col space-y-1'>
                    <div>Item: </div>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 outline-none text-sm focus:border-blue-500 focus:border-2"
                        type="text"
                        defaultValue={''}
                        {...register('itemId', {required: true})}
                        placeholder='Name/production code'
                    />
                    {errors.itemId && <span className="text-red-500 text-sm"> ⚠ This field is required!</span>}
                </div>
                <div className='flex flex-col space-y-1'>
                    <div>Quantity: </div>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 outline-none text-sm focus:border-blue-500 focus:border-2"
                        type="text"
                        defaultValue={0}
                        {...register('quantity', {required: true, pattern: /^[0-9]+$/,})}
                        placeholder='Name/production code'
                    />
                    {errors.quantity && <span className="text-red-500 text-sm"> ⚠ This field is required or must be number!</span>}
                </div>
            </div>
            <div></div>
        </div>
    );
}