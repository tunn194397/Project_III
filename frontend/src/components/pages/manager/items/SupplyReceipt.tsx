import SearchBar from "../../../atoms/SearchBar";
import TableComponent from "../../../atoms/TableComponent";

export default function ManagerSupplyReceipt() {
    const headers = [
        {title: 'id', width: 5},
        {title: 'supplier', width: 15},
        {title: 'total price', width: 15},
        {title: 'content', width: 15},
        {title: 'note', width: 15},
        {title: 'sale off', width: 10},
        {title: 'final price', width: 10},
        {title: 'time', width: 10},
        {title: 'action', width: 10},
    ]
    const datas = [
        [1, 'Phong Vu Computer', '25,000,000', '3 Computers', '', '20%', '20,000,000', '25/11/2022'],
        [1, 'Ha Noi Computer', '100,000,000', '10 Computers', '', '10%', '90,000,000', '03/12/2022'],
        [1, 'Asus', '75,000,000', '2 Computers', '', '2%', '73,000,000', '04/12/2022'],
        [1, 'Velzis', '40,000,000', '10 Monitors', '', '1%', '39,600,000', '04/12/2022'],
        [1, 'Thai Ha Dell', '1,000,000', '10 Mouse', '', '0%', '1,000,000', '06/12/2022']
    ]
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Supply Receipts Management</div>
            </div>
            <SearchBar />
            <TableComponent  headers = {headers} datas={ datas}/>
        </div>
    );
}


