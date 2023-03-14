
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";
import TableComponent from "../../atoms/TableComponent";
import {getListWarehouse} from "../../../api/manager/warehouse/request";

export default function ManagerWarehouse() {
    const {token} = useContext(AuthContext)
    const headers = [
        {title: 'id', field: 'itemId', width: 3},
        {title: 'code', field: 'code', width: 12},
        {title: 'price', field: 'price',width: 14},
        {title: 'type/branch', field: 'type',width: 20},
        {title: 'total',field: 'totalQuantity', width: 10},
        {title: 'sole',field: 'soleQuantity', width: 10},
        {title: 'remain',field: 'remainQuantity', width: 10},
        {title: 'updated', field: 'updatedAt',width: 12}
    ]
    const [data, setData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [pagination, setPagination] = useState({})
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        minTotalQuantity: null,
        maxTotalQuantity: null,
        minSoleQuantity: null,
        maxSoleQuantity: null,
        minRemainQuantity: null,
        maxRemainQuantity: null,
        itemId: null,
        deviceTypeId: null,
        branch: '',
        searchString: '',
        orderBy: 'ASC',
        orderField: 'id'
    })

    useEffect(() => {
        (async () => {
            const result = await getListWarehouse(token, searchQuery);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;

                dataRaw.map((e: any) => {
                    e.type = `${e.type} (${e.branch || 'Local branch'})`
                    e.price = e.price.toLocaleString() + " VND"
                    e.updatedAt = <div>
                        <div>{(new Date(Number(e.updatedAt))).toLocaleDateString()}</div>
                        <div className="text-xs">{(new Date(Number(e.updatedAt))).toLocaleTimeString()}</div>
                    </div>
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message);
        })()
    }, [searchQuery])

    const filterArray = [
        {
            type: 'input', queryField: 'searchString',
            handleFunction: setSearchQuery,
            displayText: 'Search',
            placeholder: 'Name, email, phone,... '
        }
    ]

    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Warehouse Management</div>
            <TableComponent
                headers= {headers}
                data={data}
                pagination={pagination}
                filterArray={filterArray}
                setOpenAdd={setOpenAdd}
                setSearchQuery={setSearchQuery}
                addPermission = {true}
            />
        </div>
    );
}


