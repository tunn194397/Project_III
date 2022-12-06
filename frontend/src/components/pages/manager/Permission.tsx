import SearchBar from "../../atoms/SearchBar";
import TableComponent from "../../atoms/TableComponent";

export default function ManagerPermission() {
    // const headers = [
    //     {title: 'id', width: 5},
    //     {title: 'name', width: 15},
    //     {title: 'email', width: 15},
    //     {title: 'phone', width: 15},
    //     {title: 'role', width: 15},
    //     {title: 'first work date', width: 10},
    //     {title: 'working period', width: 10},
    //     {title: 'salary', width: 10},
    //     {title: 'action', width: 5},
    // ]
    // const datas = [
    //     [1, 'Tran Tuan Dat', 'dat@gmail.com', '123456781', 'STAFF', '01/06/2022', '6 months', '8,000,000'],
    //     [2, 'Nguyen The Nhat', 'nhat@gmail.com', '123456782', 'STAFF', '01/02/2021', '1 year', '12,000,000'],
    //     [3, 'Vu Minh Thanh', 'thanh@gmail.com', '123456783', 'STAFF', '01/01/2018', '4 years', '25,000,000'],
    //     [4, 'Pham Cong Minh', 'minh@gmail.com', '123456784', 'STAFF', '01/12/2022', 'New', '6,000,000']
    // ]
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Permission Management</div>
            </div>
            <SearchBar />
            {/*<TableComponent  headers = {headers} datas={ datas}/>*/}
        </div>
    );
}


