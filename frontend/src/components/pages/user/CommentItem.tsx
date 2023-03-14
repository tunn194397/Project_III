import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {addNewComment, updateComment} from "../../../api/user/comment/request";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";

export default function CommentItem(props: any) {

    const {e, setDeleteComment} = props;
    const {token, user} = useContext(AuthContext)
    const [isEdit, setIsEdit] = useState(false)
    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit =  async (body: any) =>  {
        const updateResult = await updateComment(token, {...body, commentId: Number(e.id), id: user?.id})
        if (updateResult.meta.message === "Successful") {
            toast.success("Update comment successfully!")
            setIsEdit(false)
        }
        else toast.error("Update comment unsuccessfully!")
    }

    return (
        <div className=' flex flex-row space-x-3 border-b-2 border-gray-200 px-5 py-2'  key={e.id}>
            <div className='border-[1px] bg-gray-300 rounded-full col-span-1 w-[5%]'>
                <img className='border-[1px] bg-gray-300 rounded-full w-full'
                     src={e.reporter.avatarImage || 'https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I='}>
                </img>
            </div>
            <div className='w-full flex-col space-y-1 text-sm col-span-11'>
                <div className='flex flex-row justify-between'>
                    <div className='font-semibold text-blue-700'>
                        {(e.reporterId === user?.id) ? 'You' :  e.reporter.fullName}:
                    </div>
                    <div className='text-xs'>
                        {new Date(Number(e.updatedAt)).toLocaleDateString() + " " + new Date(Number(e.updatedAt)).toLocaleTimeString() }
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='text-xs flex flex-row justify-between space-x-10'>
                        <input
                            id='comment'
                            className={`w-full text-sm outline-none text-[#757575] disabled:bg-white ${(isEdit? 'border-b-2': '')}` }
                            type='text'
                            placeholder=''
                            {...register(`message`, { required: true })}
                            defaultValue={e.message}
                            disabled={!isEdit}
                        />
                        {e.reporterId === user?.id &&
                            <div className='flex flex-row space-x-3'>
                                {
                                    isEdit && <button className='text-xs underline font-bold text-green-500 hover:text-green-700' type='submit'> Oke </button>
                                }
                                {
                                    isEdit && <button className='text-xs underline font-bold text-gray-400 hover:text-gray-500' type='button' onClick={()=>setIsEdit(false)}> Cancel </button>
                                }
                                {
                                    !isEdit && <button className='text-xs underline font-bold text-blue-500 hover:text-blue-700' type='button' onClick={()=>setIsEdit(true)}> Edit </button>
                                }
                                {
                                    <button className='text-xs underline font-bold text-red-500 hover:text-red-700' type='button' onClick={()=> {
                                        setDeleteComment(e.id)
                                    }}> Delete </button>
                                }
                            </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}



