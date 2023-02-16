import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMAGES} from "../../../../utils/images/images";
import InfoDetail from "../../../atoms/InfoDetail";
import {getDetailCustomer, getList, getListUserWithRole} from "../../../../api/manager/customer/request";
import {AuthContext} from "../../../../context/AuthContext";
import {getAllDeviceType} from "../../../../api/manager/item/item/request";
import {getDetailVoucher} from "../../../../api/manager/voucher/request";

const buttonPermission = {
    total: 'MANAGER_CUSTOMER_VIEW',
    edit: 'MANAGER_CUSTOMER_UPDATE',
    save: 'MANAGER_CUSTOMER_UPDATE',
    submit: 'MANAGER_CUSTOMER_SUBMIT',
    approve: 'MANAGER_CUSTOMER_APPROVE'
}
const statusOptions = [
    {value: 'ACTIVE', label: 'Active'},
    {value: 'NON_ACTIVE', label: 'Inactive'},
    {value: 'DELETED', label: 'Deleted'},
]

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


export default function ManagerVoucherDetail() {
    const {id} = useParams()
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const firstData: any[] = [];
    const [data, setData] = useState(firstData)

    const handleBack = () =>  {
        const idLength = String(id).length;
        const currentPathLength = String(window.location.href).length
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = window.location.href.substring(length || 22, currentPathLength - idLength -1)
        navigate(`/${path}`)
    }

    const updateVoucher= async (body: any) => {
        console.log("body", body)
    }

    const getData = (result: any, deviceOptions: any) => {
        result.deviceTypeIds = result.deviceTypeIds.split(",").map((e: any) => {return Number(e)})
        result.deviceBranches = result.deviceBranches.split(",")

        const data = [
            {
                domain: 'voucher', domainTitle: 'Voucher Information',
                fields: [
                    {field: 'image', label: '', type: 'image', editable: true, name:'image', defaultValue: result.image},
                    {field: 'content', label: 'Content for Voucher', type: 'input', editable: true, name:'content', defaultValue: result.content},
                    {field: 'startedAt', label: 'Starting time', type: 'inputTime', editable: true, name:'startedAt', defaultValue: new Date(Number(result.startedAt))},
                    {field: 'finishedAt', label: 'Finishing time', type: 'inputTime', editable: true, name:'finishedAt', defaultValue: new Date(Number(result.finishedAt))},
                    {field: 'offValue', label: 'Off value of voucher (%) ', type: 'input', editable: true, name:'offValue', defaultValue: result.offValue},
                    {field: 'deviceTypeIds', label: 'Device type', type: 'multiSelect', editable: true, options: deviceOptions, name:'content',
                        defaultValue: result.deviceTypeIds.map((e: any) => {
                            return deviceOptions.find((c: any) => c.value === e)
                        })
                    },
                    {field: 'deviceBranches', label: 'Device branch', type: 'multiSelect', editable: true, options: branchOptions, name:'content',
                        defaultValue: result.deviceBranches.map((e: any) => {
                            return branchOptions.find((c: any) => c.value === e)
                        })
                    }
                ]
            },
        ]

        return data;
    }

    useMemo(() => {
        (async () => {
            const devices = await getAllDeviceType(token);
            const deviceOptions = devices.data.map((e: any) => {
                return{value: e.id, message: e.name, label: e.name}
            })
            deviceOptions.push({value: 0, message: 'All', label: 'All'})

            const idNumber = Number(id)
            const result = await getDetailVoucher(token, idNumber)
            const lastData = getData(result.data, deviceOptions)
            setData(lastData)

        })()
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Voucher Information</div>
            </div>
            <div className='px-5 py-3'>
                <InfoDetail updateFunction={updateVoucher} data={data} buttonPermission={buttonPermission}></InfoDetail>
            </div>

        </div>
    );
}



