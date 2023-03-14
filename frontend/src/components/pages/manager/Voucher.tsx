import {useContext, useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";
import TableComponent from "../../atoms/TableComponent";
import {createNewVoucher, getListVoucher} from "../../../api/manager/voucher/request";
import {getListSupply} from "../../../api/manager/supply/request";
import {getAllDeviceType, getAllDeviceTypeHaveParameter} from "../../../api/manager/item/item/request";
import CreatePopUp from "../../molecules/CreatePopUp";


const branchOptions = [
    {value: "HP", label: "HP", message: "HP"},
    {value: "ASUS", label: "ASUS", message: "ASUS"},
    {value: "Acer", label: "Acer", message: "Acer"},
    {value: "Dell", label: "Dell", message: "Dell"},
    {value: "Macbook", label: "Macbook", message: "Macbook"},
    {value: "MSI", label: "MSI", message: "MSI"},
    {value: "Kingston", label: "Kingston", message: "Kingston"},
    {value: "Kingmax", label: "Kingmax", message: "Kingmax"},
    {value: "AMD", label: "AMD", message: "AMD"},
    {value: "Intel", label: "Intel", message: "Intel"},
    {value: "View Sonic", label: "View Sonic", message: "View Sonic"},
    {value: "Samsung", label: "Samsung", message: "Samsung"},
    {value: "Xiaomi", label: "Xiaomi", message: "Xiaomi"},
    {value: "Lotus", label: "Lotus", message: "Lotus"},
    {value: "Lenovo", label: "Lenovo", message: "Lenovo"},
    {value: "Philips", label: "Philips", message: "Philips"},
    {value: "Dragon", label: "Dragon", message: "Dragon"},
]
export default function ManagerVoucher() {
    const {token, user, permission} = useContext(AuthContext)
    const headers = [
        {title: 'id', field: 'id', width: 3},
        {title: 'content', field: 'content', width: 15},
        {title: 'for branch', field: 'deviceBranch',width: 10},
        {title: 'for type', field: 'deviceType',width: 15},
        {title: 'time',field: 'time', width: 12},
        {title: 'status',field: 'status', width: 12},
        {title: 'off value',field: 'offString', width: 10}
    ]
    const [data, setData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [deviceTypes, setDeviceTypes] = useState([])
    const [pagination, setPagination] = useState({})
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        deviceType: '',
        deviceBranch: '',
        startedAt: 0,
        finishedAt: 100000000000000,
        minOff: 0,
        maxOff: 100,
        status:'',
        searchString: '',
        orderBy: '',
        orderField: ''
    })

    const [fieldToAdd, setFieldToAdd] = useState([
        {
            domain: 'voucher', domainTitle: 'Voucher Information',
            fields: [
                {field: 'content', label: 'Content for Voucher', type: 'input', editable: true},
                {field: 'startedAt', label: 'Starting time', type: 'inputTime', editable: true},
                {field: 'finishedAt', label: 'Finishing time', type: 'inputTime', editable: true},
                {field: 'image', label: 'Image url', type: 'input', editable: true},
                {field: 'offValue', label: 'Off value of voucher (%) ', type: 'input', editable: true},
                {field: 'deviceTypeIds', label: 'Device type', type: 'multiSelect', editable: true, options: deviceTypes},
                {field: 'deviceBranches', label: 'Device branch', type: 'multiSelect', editable: true, options: branchOptions}
            ]
        },
    ])

    const handleCreateNew = async (body: any) => {
        const createBody = body.voucher;
        createBody.offValue = Number(createBody.offValue);
        createBody.deviceBranches = (createBody.deviceBranches.map((e: any) => {return e.value}))
        createBody.deviceTypeIds = (createBody.deviceTypeIds.map((e: any) => {return e.value}))
        createBody.startedAt = createBody.startedAt.getTime()
        createBody.finishedAt = createBody.finishedAt.getTime()

        if (createBody.startedAt <= (new Date()).getTime()) toast.error("Voucher will be started after today!")
        else if (createBody.finishedAt <= createBody.startedAt) toast.error("Finishing time must after the starting time of voucher")
        else if (createBody.offValue < 0 || createBody.offValue > 100) toast.error("Off value of the voucher must be lest than 100%")
        else {
            const createResult = await createNewVoucher(token, createBody);
            if (createResult.meta.message === 'Successful') {
                toast.success('Created new manager successfully!')
            }
            else toast.error(createResult.message)
        }
    }

    useEffect(() => {
        (async () => {
            const result = await getListVoucher(token, searchQuery);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;
                dataRaw.map((e: any) => {
                    e.time = <div>
                        <div>From {(new Date(Number(e.startedAt))).toLocaleDateString()}</div>
                        <div>To {(new Date(Number(e.finishedAt))).toLocaleDateString()}</div>
                    </div>

                    e.deviceBranch = e.deviceBranch.split(",").map((branch: any) => {
                        return <div key={branch}>+ {branch}</div>
                    })
                    e.deviceType = e.deviceType.split(",").map((type: any) => {
                        return <div key={type}>+ {type}</div>
                    })
                    e.status = (e.startedAt >= (new Date()).getTime()) ? 'Open soon'
                        : (e.finishedAt >= (new Date()).getTime()) ? 'Opening'
                            : 'Finished'
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message);
        })()
    }, [searchQuery, openAdd])

    const filterArray = [
        {
            type: 'input', queryField: 'searchString',
            handleFunction: setSearchQuery,
            displayText: 'Search',
            placeholder: 'Content..'
        },
        {
            type: 'coupleInput',
            minQueryField: 'minOff', maxQueryField: 'maxOff',
            displayText: 'Off Value',
            handleFunction: setSearchQuery
        },
        {
            type: 'coupleTime',
            minQueryField: 'startedAt', maxQueryField: 'finishedAt',
            displayText: 'Time of Voucher',
            handleFunction: setSearchQuery
        },
        {
            type: 'select', queryField: 'deviceType',
            handleFunction: setSearchQuery,
            displayText: 'Device Type',
            options: deviceTypes
        },
        {
            type: 'input', queryField: 'deviceBranch',
            handleFunction: setSearchQuery,
            displayText: 'Branch',
            placeholder: ''
        },
    ]

    useMemo(() => {
        (async () => {
            const devices = await getAllDeviceType(token);
            const deviceOptions = devices.data.map((e: any) => {
                return{value: e.id, message: e.name, label: e.name}
            })
            deviceOptions.push({value: 0, message: 'All', label: 'All'})
            setDeviceTypes(deviceOptions)

            const fields = fieldToAdd;
            fields[0].fields[5].options = deviceOptions;
            setFieldToAdd(fields)
        })()
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Voucher Management</div>
            <TableComponent
                headers= {headers}
                data={data}
                pagination={pagination}
                filterArray={filterArray}
                setOpenAdd={setOpenAdd}
                addPermission = {permission.includes('MANAGER_VOUCHER_CREATE')}
                setSearchQuery={setSearchQuery}/>
            {
                openAdd ?
                    <CreatePopUp
                        setOpenAdd={setOpenAdd}
                        title={'Create new voucher'}
                        fields={fieldToAdd}
                        handleCreateNew={handleCreateNew}
                    ></CreatePopUp>
                    :<></>
            }
        </div>
    );
}


