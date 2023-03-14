import {useContext, useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {AuthContext} from "../../../../context/AuthContext";
import {
    getAllDeviceTypeHaveParameter,
    getListItems
} from "../../../../api/manager/item/item/request";
import TableData from "../../../atoms/TableData";
import {IMAGES} from "../../../../utils/images/images";
import {getListSupply} from "../../../../api/manager/supply/request";
import GridItems from "../../../atoms/GridItems";
import {useNavigate} from "react-router-dom";
import SearchBarWithCreatePage from "../../../atoms/SearchBarWithCreatePage";

export default function ManagerItem() {
    const {token, user, permission} = useContext(AuthContext)
    const navigate = useNavigate()
    const headers = [
        {title: 'id', field: 'id',width: 3},
        {title: 'image', field: 'image', width: 8, type: 'image'},
        {title: 'product code ', field: 'productionCode',width: 10},
        {title: 'product time', field: 'productionTime',width: 9},
        {title: 'name', field: 'name',width: 14},
        {title: 'price', field: 'price',width: 10},
        {title: 'remain', field: 'remain',width: 3},
        {title: 'supply', field: 'supply',width: 5}
    ]
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({})
    const [gridView, setGridView] = useState(false)
    const [deviceTypes, setDeviceTypes] = useState([])
    const [supply, setSupply] = useState([])
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        minPrice: 0,
        maxPrice: 1000000000000000,
        supplyId: 0,
        deviceType: 0,
        branch: '',
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
            const result = await getListItems(token, searchQuery);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;
                dataRaw.map((e: any) => {
                    e.supply = e.supply.name
                    e.price = e.price.toLocaleString() + " VND"
                    e.branch = e.branch || 'Local branch';
                    e.productionTime = <div>
                        <div>{(new Date(Number(e.productionTime))).toLocaleDateString()}</div>
                    </div>

                    e.type = <div className='flex flex-row items-center text-xs space-x-1'>
                        <div>{e.type}</div>
                        <div>({e.branch})</div>
                    </div>

                    e.productionCode =<div>
                        <div>{e.productionCode}</div>
                        <div>{e.type}</div>
                    </div>

                    e.parameter = e.parameter.map((param: any) => {
                        if (param.value) return <div className='text-xs'><b>{param.paramName}</b>: {param.value}</div>
                    })
                    e.remain = e.warehouse?.remainQuantity || 0;
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message);
        })()
    }, [searchQuery])

    useMemo(() => {
        (async () => {
            const supplies = await getListSupply(token, {page: 1, pageSize: 1000, searchString: '', orderField: 'name', orderBy: 'ASC', status: null, startDate: null, endDate: null})
            const supplyOptions = supplies.data.result.map((e: any) => {
                return{value: e.id, message: e.name}
            })
            supplyOptions.push({value: 0, message: 'All'})
            setSupply(supplyOptions)

            const devices = await getAllDeviceTypeHaveParameter(token);
            const deviceOptions = devices.data.map((e: any) => {
                return{value: e.id, message: e.name, label: e.name}
            })
            deviceOptions.push({value: 0, message: 'All'})
            setDeviceTypes(deviceOptions)
        })()
    }, [])

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
            type: 'input', queryField: 'branch',
            handleFunction: setSearchQuery,
            displayText: 'Branch',
            placeholder: ''
        },
        {
            type: 'select',
            queryField: 'deviceType',
            displayText: 'Type',
            handleFunction: setSearchQuery,
            options: deviceTypes
        },
        {
            type: 'select',
            queryField: 'supplyId',
            displayText: 'Supplier',
            handleFunction: setSearchQuery,
            options: supply
        }
    ]

    const activeButtonClassName = "flex flex-row items-center space-x-1 px-3 py-1.5 border-[2px] border-b-0 rounded-t-md text-sm bg-gray-100";
    const inactiveButtonClassName = "flex flex-row items-center space-x-1 px-3 py-1.5 border-0 text-sm"
    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Items Management</div>
            <div className = 'flex flex-col bg-white mt-3 py-6 space-y-8 rounded-xl border-[1px] border-gray-300 '>
                <SearchBarWithCreatePage filterArray={filterArray} handleAdd={changeToCreatePage} addPermission={permission.includes('MANAGER_ITEM_CREATE')}/>
                <div>
                    <div className = "flex flex-row mx-2">
                        <button className={gridView? inactiveButtonClassName: activeButtonClassName} onClick={() => setGridView(false)}>
                            <svg height={15} width={15}>{IMAGES.icon.table}</svg>
                            <div>Table</div>
                        </button>
                        <button className={gridView? activeButtonClassName: inactiveButtonClassName} onClick={() => setGridView(true)}>
                            <svg height={15} width={15}>{IMAGES.icon.grid}</svg>
                            <div>Grid</div>
                        </button>
                    </div>
                    {
                        (gridView?
                                <GridItems data={data} pagination={pagination} setSearchQuery={setSearchQuery}></GridItems>
                            : <TableData headers={headers} data={data} pagination={pagination} setSearchQuery={setSearchQuery} ></TableData>
                        )
                    }
                </div>
            </div>
        </div>
    );
}



