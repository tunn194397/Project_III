import SearchBar from "../../atoms/SearchBar";
import TableComponent from "../../atoms/TableComponent";

export default function ManagerSupply() {
    const headers = [
        {title: 'id', width: 5},
        {title: 'name', width: 15},
        {title: 'address', width: 15},
        {title: 'email', width: 15},
        {title: 'phone', width: 15},
        {title: 'representative', width: 20},
        {title: 'connected at', width: 15},
    ]
    const datas: any[] = [];
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Supplies Management</div>
            </div>
            <SearchBar />
            <TableComponent  headers = {headers} datas={ datas}/>
        </div>
    );
}


