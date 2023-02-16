import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import {useNavigate} from "react-router-dom";

export default function GridItems(props: any) {
    const {data, pagination, setSearchQuery} = props;
    const navigate = useNavigate()
    const goToDetail = (id: number) => {
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = (window.location.href).substring(length || 22)
        navigate(`/${path}/${id}`)
    }
    return (
        <div className='bg-gray-100 pt-3 px-3 flex flex-col space-y-1'>
            <div className='grid grid-cols-5 gap-2 '>
                {data.map((item : any) => {
                    return (<ItemCard item={item} key={item.id} goToDetail={goToDetail}></ItemCard>)
                })}
            </div>
            <Pagination pagination={pagination} setSearchQuery={setSearchQuery}></Pagination>
        </div>
    )
}