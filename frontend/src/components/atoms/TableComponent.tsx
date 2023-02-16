import {FC} from "react";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import TableData from "./TableData";

interface Props {
    headers: any;
    data: any;
    pagination: any;
    filterArray: any;
    setSearchQuery: any;
    setOpenAdd: any
}

const TableComponent: FC<Props> = ({ headers, data, pagination, filterArray, setSearchQuery, setOpenAdd}) => {
    return (
        <div className = 'flex flex-col bg-white mt-3 py-6 space-y-8 rounded-xl border-[1px] border-gray-300 '>
            <SearchBar filterArray={filterArray} setOpenAdd={setOpenAdd}/>
            <TableData headers={headers} data={data} pagination={pagination} setSearchQuery={setSearchQuery} ></TableData>
        </div>
    );
}

export default TableComponent