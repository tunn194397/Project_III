import SearchBar from "../../../atoms/SearchBar";
import TableComponent from "../../../atoms/TableComponent";

export default function ManagerItem() {
    return (
        <div className='flex flex-col m-2'>
            <div className='flex '>
                <div className='text-3xl text-black font-bold ml-3 mb-5'>Item Management</div>
            </div>
            <SearchBar />
        </div>
    );
}

