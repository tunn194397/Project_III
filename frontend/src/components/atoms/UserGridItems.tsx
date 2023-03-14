import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import {useNavigate} from "react-router-dom";

export default function UserGridItems(props: any) {
    const {data, pagination, setSearchQuery} = props;
    const navigate = useNavigate()
    const goToDetail = (id: number) => {
        navigate(`/user/items/${id}`)
    }
    return (
        <div className='bg-gray-100 pt-3 px-3 flex flex-col'>
            <div className='grid grid-cols-4 gap-3 mb-5'>
                {data.map((item : any) => {
                    return (<ItemCard item={item} key={item.id} goToDetail={goToDetail}></ItemCard>)
                })}
            </div>
            <hr className="border-[1.5px]"/>
            {data.length ? <Pagination pagination={pagination} setSearchQuery={setSearchQuery}></Pagination>: <></>}
        </div>
    )
}