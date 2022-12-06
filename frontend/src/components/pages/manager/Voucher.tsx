import SearchBar from "../../atoms/SearchBar";
import TableComponent from "../../atoms/TableComponent";

export default function ManagerVoucher() {
    const headers = [
        {title: 'id', width: 5},
        {title: 'content', width: 15},
        {title: 'device', width: 15},
        {title: 'branch', width: 15},
        {title: 'time', width: 15},
        {title: 'status', width: 10},
        {title: 'value', width: 7},
        {title: 'created at', width: 13},
        {title: 'action', width: 5},
    ]
    const datas: any [] = [];
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Vouchers Management</div>
            </div>
            <SearchBar />
            <TableComponent  headers = {headers} datas={ datas}/>
        </div>
    );
}


