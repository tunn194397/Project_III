import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMAGES} from "../../../../utils/images/images";
import InfoDetail from "../../../atoms/InfoDetail";
import {getDetailCustomer, getList} from "../../../../api/manager/customer/request";
import {toast} from "react-toastify";
import {AuthContext} from "../../../../context/AuthContext";
import {getAllBranch, getDetailManager} from "../../../../api/manager/employee/manager/request";
import {getDetailItem} from "../../../../api/manager/item/item/request";
import InfoItemDetail from "../../../atoms/InfoItemDetail";

const buttonPermission = {
    total: 'MANAGER_CUSTOMER_VIEW',
    edit: 'MANAGER_CUSTOMER_UPDATE',
    save: 'MANAGER_CUSTOMER_UPDATE',
    submit: 'MANAGER_CUSTOMER_SUBMIT',
    approve: 'MANAGER_CUSTOMER_APPROVE'
}
const statusOptions = [
    {value: 'NEW', label: 'New'},
    {value: 'OUT_DATED', label: 'Out of date'},
    {value: 'DELETED', label: 'Deleted'},
]


export default function ManagerItemDetail() {
    const {token, user, permission} = useContext(AuthContext)
    const {id} = useParams()
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

    const updateItem= async (body: any) => {
        console.log("body", body)
    }

    const getData = (result: any) => {
        const data = [
            {
                domain: "Item main information",
                fields:  [
                    {field: "image", editable: true, name: "image", label: "", type: 'image', defaultValue: result.image},
                    {field: "branch", editable: false, name: "branch", label: "Branch", type: 'input', defaultValue: result.branch},
                    {field: "name", editable: false, name: "name", label: "Item name", type: 'input', defaultValue: result.name},
                    {field: "content", editable: true, name: "content", label: "Content", type: 'input',  defaultValue: result.content},
                    {field: "introduce", editable: true, name: "introduce", label: "Introduce", type: 'input', defaultValue: result.introduce},
                    {field: "type", editable: true, name: "type", label: "Type", type: 'input', defaultValue: result.type},
                    {field: "productionTime", editable: true, name: "productionTime", label: "Production time", type: 'inputTime', defaultValue: new Date(Number(result.productionTime))},
                    {field: "productionCode", editable: true, name: "productionCode", label: "Production Code", type: 'input', defaultValue: result.productionCode},
                    {field: "status", editable: true, name: "status", label: "Status", type: 'select', options: statusOptions,
                        defaultValue: statusOptions.find((c: any) => c.value === result.status)
                    }
                ]
            }
        ]

        const fieldOfIntro : any[] = [];
        const fieldOfParam : any[] = [];
        result.parameter.map((e: any) => {
            if (e.value) fieldOfIntro.push({field: "Param" + e.id, editable: false, name: "No", label:e.deviceParameterName, type: "input", defaultValue: e.value})
            fieldOfParam.push({field: "Param" + e.id, editable: false,  name: "No", label:e.deviceParameterName, type: "input", defaultValue: e.detail})
        })

        data.push({domain: 'Intro', fields: fieldOfIntro}, {domain: 'Parameters Detail', fields: fieldOfParam})

        return data;
    }
    useMemo(() => {
        (async () => {
            const idNumber = Number(id)
            const result = await getDetailItem(token, idNumber);

            console.log("data", result.data)
            setData(getData(result.data))
        })()
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Item Detail Information</div>
            </div>
            <div className='px-5 py-3 flex flex-row'>
                <div className='grid-cols-2'>
                    <InfoItemDetail updateFunction={updateItem} data={data} buttonPermission={buttonPermission}></InfoItemDetail>
                </div>
            </div>

        </div>
    );
}



