import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {getDetailItem} from "../../../api/manager/item/item/request";
import UserInfoItemDetail from "./ItemInfoDetail";
import {useForm} from "react-hook-form";
import {createNewSellReceipt} from "../../../api/manager/item/sell/request";
import {toast} from "react-toastify";
import {addNewComment, deleteComment} from "../../../api/user/comment/request";
import CommentItem from "./CommentItem";
import ConfirmYesNoPopUp from "../../molecules/ConfirmYesNoPopUp";

const buttonPermission = {
    total: 'MANAGER_CUSTOMER_VIEW',
    edit: 'MANAGER_CUSTOMER_UPDATE',
    save: 'MANAGER_CUSTOMER_UPDATE',
    submit: 'MANAGER_CUSTOMER_SUBMIT',
    approve: 'MANAGER_CUSTOMER_APPROVE'
}
const statusOptions = [
    {value: 'NEW', label: 'New'},
    {value: 'OUT_DATED', label: 'Out of date'},
    {value: 'DELETED', label: 'Deleted'},
]

export default function UserItemDetail() {
    const {token, user, permission, isLogin} = useContext(AuthContext)
    const {id} = useParams()
    const firstData: any[] = [];
    const [data, setData] = useState(firstData)
    const [detail, setDetail] = useState({})
    const [openComment, setOpenComment] = useState(false)
    const [comments, setComments] = useState(firstData)
    const [deleteCommentId, setDeleteCommentId] = useState(0)
    const [isAddComment, setIsAddComment] = useState(false)
    const {register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit =  async (body: any) =>  {
        const createResult = await addNewComment(token, {...body, itemId: id, reporterId: user?.id})
        if (createResult.meta.message === "Successful") {
            toast.success("Add new comment successfully!")
            setIsAddComment(false)
        }
        else toast.error("Add new comment unsuccessfully!")
    }

    const handleDeleteYes = async () => {
        const deleteResult = await deleteComment(token, {id: user?.id, commentId: deleteCommentId})
        if (deleteResult.meta.message === "Successful") {
            toast.success("Delete comment successfully!")
            setIsAddComment(false)
        }
        else toast.error("Delete comment unsuccessfully!")
        setDeleteCommentId(0);
    }

    const handleDeleteNo = async () => {
        setDeleteCommentId(0);
    }
    const getData = (result: any) => {
        const data = [
            {
                domain: "Item main information",
                fields:  [
                    {field: "image", editable: true, name: "image", label: "", type: 'image', defaultValue: result.image},
                    {field: "branch", editable: false, name: "branch", label: "Branch", type: 'input', defaultValue: result.branch},
                    {field: "name", editable: false, name: "name", label: "Item name", type: 'input', defaultValue: result.name},
                    {field: "content", editable: true, name: "content", label: "Content", type: 'input',  defaultValue: result.content},
                    {field: "introduce", editable: true, name: "introduce", label: "Introduce", type: 'input', defaultValue: result.introduce},
                    {field: "type", editable: true, name: "type", label: "Type", type: 'input', defaultValue: result.type},
                    {field: "productionTime", editable: true, name: "productionTime", label: "Production time", type: 'input', defaultValue: (new Date(Number(result.productionTime))).toLocaleDateString()},
                    {field: "productionCode", editable: true, name: "productionCode", label: "Production code", type: 'input', defaultValue: result.productionCode},
                    {field: "status", editable: true, name: "status", label: "Status", type: 'input',defaultValue: result.status
                    }
                ]
            }
        ]

        const fieldOfIntro : any[] = [];
        const fieldOfParam : any[] = [];
        result.parameter.map((e: any) => {
            if (e.value) fieldOfIntro.push({field: "Param" + e.id, editable: false, name: "No", label:e.deviceParameterName, type: "input", defaultValue: e.value})
            fieldOfParam.push({field: "Param" + e.id, editable: false,  name: "No", label:e.deviceParameterName, type: "input", defaultValue: e.detail})
        })

        data.push({domain: 'Introduction', fields: fieldOfIntro}, {domain: 'Parameters Detail', fields: fieldOfParam})
        return data;
    }
    useEffect(() => {
        (async () => {
            const idNumber = Number(id)
            const result = await getDetailItem(token, idNumber);
            setData(getData(result.data))
            setDetail(result.data)
            setComments(result.data.comments)
        })()
    }, [isAddComment, deleteCommentId])

    return (
        <div className='w-full h-full flex flex-col px-3 py-3 space-y-4'>
            <div className='w-full overflow-y-auto bg-cover bg-center transition-all ease-in-out duration-1000 transform translate-x-0 slide'>
                <div className='w-full overflow-y-auto flex flex-col justify-between px-10 py-5 space-y-2'>
                    <UserInfoItemDetail data={data} detail={detail} buttonPermission={buttonPermission}></UserInfoItemDetail>
                    <div className="bg-white px-5 py-5 border-[1px] border-gray-200 rounded-xl space-y-14">
                        <div className={`flex flex-col space-y-5`}>
                            <div className="flex flex-col space-y-5 ">
                                <div className='flex flex-row justify-between mr-3'>
                                    <div className="text-xl font-semibold underline" >Comments</div>
                                    {
                                        comments.length > 5 &&
                                        <button className='underline font-semibold' onClick={()=>setOpenComment(!openComment)}> {openComment? 'Collapse comments': 'More comments'}  </button>
                                    }
                                </div>
                                <div className='flex flex-col space-y-5'>
                                    {
                                        (openComment? comments: comments.slice(0,5)).map((e: any) => {
                                            return (
                                                <CommentItem key={e.id} e={e} setDeleteComment={(id: number) => {
                                                    setDeleteCommentId(id)

                                                }}></CommentItem>
                                            )
                                        })
                                    }
                                    </div>
                            </div>
                        </div>
                        {
                            isAddComment &&
                            <form className='mb-3' onSubmit={handleSubmit(onSubmit)}>
                                <div className='space-y-1 items-center text-sm mx-5'>
                                    <div className=''> Comment about this item:  </div>
                                    <div className='px-2 flex flex-row space-x-2'>
                                        <input
                                            id='comment'
                                            className=' w-3/5 pl-2 outline-none text-base text-[#757575] border-b-2 py-1 px-3'
                                            type='text'
                                            placeholder=''
                                            {...register('message', { required: true })}
                                        />
                                        <button className='text-sm font-bold text-white col-span-1 rounded-md bg-blue-500 px-2 hover:ring-4 hover:ring-blue-200' type="submit"> Comment </button>
                                        <button className='text-sm font-bold text-white col-span-1 rounded-md bg-gray-400 px-2 hover:ring-4 hover:ring-gray-200' type="button" onClick={() => setIsAddComment(false)}> Cancel </button>
                                    </div>
                                </div>
                                {errors?.message?.type === 'required' && <p className='text-xs'>⚠ This field is required!</p>}
                            </form>
                        }
                        {   !isAddComment && isLogin && user?.roleId === 6 ?
                            <button className='rounded-md bg-green-500 text-white text-sm font-semibold px-3 py-1.5 hover:ring-4 hover:ring-green-200' onClick={()=>setIsAddComment(true)}>
                                Add new comments
                            </button>
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
            {
                deleteCommentId !== 0 &&
                <ConfirmYesNoPopUp
                    title={'Delete comment'}
                    setOpenAdd={setDeleteCommentId}
                    content={'Are you sure to delete this comment?'}
                    handleYes={handleDeleteYes}
                    handleNo={handleDeleteNo}
                />
            }
        </div>
    );
}



