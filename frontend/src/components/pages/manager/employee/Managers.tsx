import SearchBar from "../../../atoms/SearchBar";
import TableComponent from "../../../atoms/TableComponent";

export default function ManagerManager() {
    const headers = [
        {title: 'id', width: 5},
        {title: 'name', width: 20},
        {title: 'email', width: 20},
        {title: 'phone', width: 20},
        {title: 'role', width: 10},
        {title: 'introduce', width: 5},
        {title: 'certificate', width: 5},
        {title: 'action', width: 5},
    ]
    const datas = [
        [1, 'Tu Nguyen', 'tunn@gmail.com', '123456778', 'ADMIN', 'No', 'No']
    ]
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Managers Management</div>
            </div>
            <SearchBar />
            <TableComponent  headers = {headers} datas={ datas}/>
        </div>
    );
}
