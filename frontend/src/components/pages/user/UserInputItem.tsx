import {Controller} from "react-hook-form";
import {IMAGES} from "../../../utils/images/images";
import DatePicker from "react-datepicker";
import Select from 'react-select';

export default function UserInputItem(props: any) {
    const {field, domain} = props;
    switch (field.type) {
        case 'input':{
            return (
                <div>
                    <input
                        className="text-sm w-full px-3 text-gray-700 outline-none"
                        type="text"
                        defaultValue={field.defaultValue || ''}
                    />
                </div>
            );
        }
        case 'image': {
            return (<div className='py-2 px-5'>
                <img
                    src={field.defaultValue}
                    className="rounded-xl border-2 border-gray-200 w-[100%]"
                />
            </div>)
        }
        default:
            return <></>;
    }
}