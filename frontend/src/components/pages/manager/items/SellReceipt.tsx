import SearchBar from "../../../atoms/SearchBar";
import TableComponent from "../../../atoms/TableComponent";

export default function ManagerSellReceipt() {
    const headers = [
        {title: 'id', width: 5},
        {title: 'customer', width: 15},
        {title: 'staff', width: 15},
        {title: 'total price', width: 15},
        {title: 'content', width: 15},
        {title: 'note', width: 10},
        {title: 'sale off', width: 10},
        {title: 'final price', width: 10},
        {title: 'date', width: 10},
        {title: 'action', width: 5},
    ]
    const datas: any[] = []
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Sell Receipts Management</div>
            </div>
            <SearchBar />
            <TableComponent  headers = {headers} datas={ datas}/>
        </div>
    );
}

