import SearchBar from "../../../atoms/SearchBar";
import {useContext, useEffect, useState} from "react";
import {getList} from "../../../../api/manager/item/supply/request";
import {toast} from "react-toastify";
import TableComponent from "../../../atoms/TableComponent";
import {AuthContext} from "../../../../context/AuthContext";
import {getListSupply} from "../../../../api/manager/supply/request";
import SearchBarWithCreatePage from "../../../atoms/SearchBarWithCreatePage";
import TableData from "../../../atoms/TableData";
import {useNavigate} from "react-router-dom";

export default function ManagerSupplyReceipt() {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const headers = [
        {title: 'id', field: 'id', width: 5},
        {title: 'supply', field: 'supply', width: 12},
        {title: 'content', field: 'content',width: 15},
        {title: 'note', field: 'note',width: 15},
        {title: 'sale', field: 'saleOff',width: 5},
        {title: 'final price',field: 'finalPrice', width: 12},
        {title: 'time', field: 'updatedAt',width: 10},
        {title: 'action', field: '',width: 5},
    ]
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({})
    const [suppliers, setSuppliers] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        supplyId: null,
        minPrice: 0,
        maxPrice: 100000000000000,
        minSaleOff: 0,
        maxSaleOff: 100,
        searchString: '',
        orderBy: 'ASC',
        orderField: 'id'
    })
    const changeToCreatePage = () => {
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = (window.location.href).substring(length || 22)
        navigate(`/${path}/create`)
    }

    useEffect(() => {
        (async () => {
            const result = await getList(token, searchQuery);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;

                dataRaw.map((e: any) => {
                    e.content = (e.content.length > 40 )  ? e.content.substring(0,40) + "..." : e.content;
                    e.updatedAt = <div>
                        <div>{(new Date(Number(e.updatedAt))).toLocaleDateString()}</div>
                        <div className="text-xs">{(new Date(Number(e.updatedAt))).toLocaleTimeString()}</div>
                    </div>
                    e.finalPrice = (e.finalPrice).toLocaleString() + " VND"
                    e.saleOff = e.saleOff.toLocaleString() + " %"
                    e.note = (e.note.length > 40) ? e.note.length.substring(0,40) + "..." : e.note
                    e.supply = e.supply.name
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message);

            const supplyResult = await getListSupply(token, {page: 1, pageSize: 1000, searchString: '', orderField: 'name', orderBy: 'ASC', status: null, startDate: null, endDate: null})
            if (supplyResult.meta.message === 'Successful') {
                const options = supplyResult.data.result.map((e: any) => {
                    return {
                        value: e.id,
                        message: `${e.name}`,
                        key: e.id
                    }
                })
                options.push({value: 0, message: 'All'})
                setSuppliers(options);
            }
            else toast.error(result.message)
        })()
    }, [searchQuery])

    const filterArray = [
        {
            type: 'input', queryField: 'searchString',
            handleFunction: setSearchQuery,
            displayText: 'Search',
            placeholder: 'Name, email, phone,... '
        },
        {
            type: 'coupleInput',
            minQueryField: 'minPrice', maxQueryField: 'maxPrice',
            displayText: 'Price',
            handleFunction: setSearchQuery
        },
        {
            type: 'coupleInput',
            minQueryField: 'minSaleOff', maxQueryField: 'maxSaleOff',
            displayText: 'Sale off',
            handleFunction: setSearchQuery
        },
        {
            type: 'select',
            queryField: 'supplyId',
            displayText: 'Supplier',
            handleFunction: setSearchQuery,
            options: suppliers
        }
    ]

    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Supply Receipts Management</div>
            <div className = 'flex flex-col bg-white mt-3 py-6 space-y-8 rounded-xl border-[1px] border-gray-300 '>
                <SearchBarWithCreatePage filterArray={filterArray} handleAdd={changeToCreatePage}/>
                <TableData headers={headers} data={data} pagination={pagination} setSearchQuery={setSearchQuery} ></TableData>
            </div>
        </div>
    );
}


