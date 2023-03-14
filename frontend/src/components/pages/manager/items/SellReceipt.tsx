import SearchBar from "../../../atoms/SearchBar";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import TableComponent from "../../../atoms/TableComponent";
import {AuthContext} from "../../../../context/AuthContext";
import {getList as getListCustomer}  from "../../../../api/manager/customer/request";
import {getList as getListStaff}  from "../../../../api/manager/employee/staff/request";
import {getList} from "../../../../api/manager/item/sell/request";
import SearchBarWithCreatePage from "../../../atoms/SearchBarWithCreatePage";
import TableData from "../../../atoms/TableData";
import {useNavigate} from "react-router-dom";

export default function ManagerSellReceipt() {
    const navigate = useNavigate()
    const {token, user, permission} = useContext(AuthContext)
    const headers = [
        {title: 'id', field: 'id', width: 2},
        {title: 'customer', field: 'customer',width: 14},
        {title: 'staff', field: 'staff',width: 14},
        {title: 'total price',field: 'totalPrice', width: 12},
        {title: 'sale ', field: 'saleOff',width: 5},
        {title: 'final price',field: 'finalPrice', width: 12},
        {title: 'time', field: 'updatedAt',width: 10}
    ]
    const [data, setData] = useState([])
    const [customers, setCustomers] = useState([])
    const firstStaffData : any[] = []
    const [staffs, setStaffs] = useState(firstStaffData)
    const [pagination, setPagination] = useState({})
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        customerId: null,
        staffId: null,
        minPrice: 0,
        maxPrice: 1000000000000000,
        minSaleOff: 0,
        maxSaleOff: 100,
        searchString: '',
        orderBy: 'ASC',
        orderField: 'name'
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
                    e.totalPrice = (e.totalPrice).toLocaleString() + " VND"
                    e.saleOff = String(e.saleOff) + "%"
                    e.finalPrice = (e.finalPrice).toLocaleString() + " VND"
                    e.note = (e.note).length > 20 ? (e.note.substring(0,20) + "...") : e.note
                    e.content = (e.content).length > 20 ? (e.content.substring(0,20) + "...") : e.content
                    e.customer = <div><div>{e.customer?.fullName}</div><div className="text-xs">({e.customerId})</div></div>;
                    e.staff = <div>
                                <div>{e.staff?.fullName || e.manager?.fullName || ''}</div>
                                <div className="text-xs">{e.staffId? `(${e.staffId})` : ''}</div>
                            </div>;
                    e.updatedAt = <div>
                        <div>{(new Date(Number(e.updatedAt))).toLocaleDateString()}</div>
                        <div className="text-xs">{(new Date(Number(e.updatedAt))).toLocaleTimeString()}</div>
                    </div>
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message)

            const customerResult = await getListCustomer(token, {page: 1, pageSize: 1000, searchString: '', orderField: 'name', orderBy: 'ASC', registerType: null, registerStaffId: null, minScore: null, maxScore: null, status: null, level: null  })
            if (customerResult.meta.message === 'Successful') {
                const options = customerResult.data.result.map((e: any) => {
                    return {
                        value: e.id,
                        message: `${e.name}`,
                        key: e.id
                    }
                })
                options.push({value: 0, message: 'All'})
                setCustomers(options);
            }
            else toast.error(result.message)

            const staffResult = await getListStaff(token, {page: 1, pageSize: 1000, searchString: '', orderField: 'name', orderBy: 'ASC', staffRoleId: 0})
            if (staffResult.meta.message === 'Successful') {
                const options = staffResult.data.result.map((e: any) => {
                    return {
                        value: e.id,
                        message: `${e.fullName}`,
                        key: e.id
                    }
                })
                options.push({value: 0, message: 'All'})
                setStaffs(options);
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
            type: 'select',
            queryField: 'customerId',
            displayText: 'Customer',
            handleFunction: setSearchQuery,
            options: customers
        },
        {
            type: 'select',
            queryField: 'staffId',
            displayText: 'Staff',
            handleFunction: setSearchQuery,
            options: staffs
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
    ]

    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Sell Receipts Management</div>
            <div className = 'flex flex-col bg-white mt-3 py-6 space-y-8 rounded-xl border-[1px] border-gray-300 '>
                <SearchBarWithCreatePage filterArray={filterArray} handleAdd={changeToCreatePage} addPermission={permission.includes('MANAGER_SELL_CREATE')}/>
                <TableData headers={headers} data={data} pagination={pagination} setSearchQuery={setSearchQuery} ></TableData>
            </div>
        </div>
    );
}


