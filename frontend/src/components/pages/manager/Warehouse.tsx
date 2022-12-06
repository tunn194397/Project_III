import SearchBar from "../../atoms/SearchBar";
import TableComponent from "../../atoms/TableComponent";

export default function ManagerWarehouse() {
    const headers = [
        {title: 'id', width: 5},
        {title: 'item name', width: 15},
        {title: 'item code', width: 15},
        {title: 'total', width: 10},
        {title: 'sole', width: 10},
        {title: 'remain', width: 10},
        {title: 'imported at', width: 10},
    ]
    const datas : any[] = []
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Warehouse Management</div>
            </div>
            <SearchBar />
            <TableComponent  headers = {headers} datas={ datas}/>
        </div>
    );
}


