import SearchBar from "../../atoms/SearchBar";
import TableComponent from "../../atoms/TableComponent";

export default function ManagerCustomer() {
    const headers = [
        {title: 'id', width: 5},
        {title: 'name', width: 15},
        {title: 'email', width: 15},
        {title: 'phone', width: 15},
        {title: 'register type', width: 10},
        {title: 'register staff id', width: 10},
        {title: 'level', width: 10},
        {title: 'score', width: 10},
        {title: 'action', width: 5},
    ]
    const datas : any[] = [];
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Customers Management</div>
            </div>
            <SearchBar />
            <TableComponent  headers = {headers} datas={ datas}/>
        </div>
    );
}



