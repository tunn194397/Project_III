import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMAGES} from "../../../../utils/images/images";
import InfoDetail from "../../../atoms/InfoDetail";
import {
    getListUserWithRole,
} from "../../../../api/manager/customer/request";
import {AuthContext} from "../../../../context/AuthContext";
import {getDetailSupply, updateSupply} from "../../../../api/manager/supply/request";
import {toast} from "react-toastify";

const buttonPermission = {
    total: 'MANAGER_SUPPLY_VIEW',
    edit: 'MANAGER_SUPPLY_UPDATE',
    save: 'MANAGER_SUPPLY_UPDATE'
}
const statusOptions = [
    {value: 'ACTIVE', label: 'Active'},
    {value: 'NON_ACTIVE', label: 'Inactive'},
    {value: 'DELETED', label: 'Deleted'},
]


export default function ManagerSupplyDetail() {
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

    const update= async (body: any) => {
        body.supply.createdAt = (body.supply.createdAt).getTime()
        const updateResult = await updateSupply(token, Number(id), body.supply)
        if (updateResult?.meta?.code === 200) {
            toast.success("Update supply information successful!")
        }
        else toast.error("Update supply information unsuccessful!")
    }

    const getData = (result: any, representativeOptions: any) => {
        const data = [
            {
                domain: 'supply', domainTitle: "Supply information",
                fields:  [
                    {field: "imageUrl", editable: false, name: "imageUrl", label: "", type: 'image', defaultValue: result.imageUrl},
                    {field: "name", editable: true, name: "name", label: "Name", type: 'input', defaultValue: result.name},
                    {field: "address", editable: true, name: "address", label: "Supply address", type: 'input',  defaultValue: result.address},
                    {field: "phone", editable: true, name: "phone", label: "Hotline", type: 'input', defaultValue: result.phone},
                    {field: "email", editable: true, name: "email", label: "Supply email", type: 'input', defaultValue: result.email},
                    {field: "representativeId", editable: true, name: "representativeId", label: "Representative", type: 'select', options: representativeOptions,
                        defaultValue: representativeOptions.find((c: any) => c.value === result.representativeId)
                    },
                    {field: "createdAt", editable: false, name: "createdAt", label: "Connection date", type: 'inputTime', defaultValue: new Date(Number(result.createdAt))},
                    {field: "status", editable: true, name: "status", label: "Status", type: 'select', options: statusOptions,
                        defaultValue: statusOptions.find((c: any) => c.value === result.status)
                    }
                ]
            }
        ]

        return data;
    }

    useEffect(() => {
        (async () => {
            const idNumber = Number(id)
            const result = await getDetailSupply(token, idNumber)
            const representatives = await getListUserWithRole(token, 7);
            const representativeOptions = representatives.data.result.map((e: any) => {
                return {
                    value: e.id,
                    label: `${e.fullName} [${e.email}]`
                }
            });
            const lastData = getData(result.data, representativeOptions)
            setData(lastData)
        })()
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Supply Information</div>
            </div>
            <div className='px-5 py-3'>
                <InfoDetail updateFunction={update} data={data} buttonPermission={buttonPermission}></InfoDetail>
            </div>

        </div>
    );
}



