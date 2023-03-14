import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMAGES} from "../../../../utils/images/images";
import InfoDetail from "../../../atoms/InfoDetail";
import {getDetailCustomer, getList} from "../../../../api/manager/customer/request";
import {toast} from "react-toastify";
import {AuthContext} from "../../../../context/AuthContext";
import {getAllBranch, getDetailManager, updateManager} from "../../../../api/manager/employee/manager/request";
import {updateStaff} from "../../../../api/manager/employee/staff/request";

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


export default function ManagerManagerDetail() {
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
        body.updateUser.birthday = (body.updateUser.birthday).getTime();

        const updateResult = await updateManager(token, Number(id), body)
        if (updateResult?.meta?.code === 200) {
            toast.success("Update manager information successful!")
        }
        else toast.error("Update manager information unsuccessful!")
    }

    const getData = (result: any, branchResult: any) => {
        const data = [
            {
                domain: 'updateUser', domainTitle: "User personal information",
                fields:  [
                    {field: "avatarImage", editable: false, name: "id", label: "Avatar", type: 'image', defaultValue: result.user.avatarImage},
                    {field: "fullName", editable: false, name: "fullName", label: "Full name", type: 'input', defaultValue: result.user.fullName},
                    {field: "firstName", editable: true, name: "firstName", label: "First name", type: 'input',  defaultValue: result.user.firstName},
                    {field: "lastName", editable: true, name: "lastName", label: "Last name", type: 'input', defaultValue: result.user.lastName},
                    {field: "email", editable: true, name: "email", label: "Customer email", type: 'input', defaultValue: result.user.email},
                    {field: "phone", editable: true, name: "phone", label: "Customer phone number", type: 'input', defaultValue: result.user.phone},
                    {field: "nationality", editable: true, name: "nationality", label: "Nationality", type: 'input', defaultValue: result.user.nationality || 'Vietnamese'},
                    {field: "birthday", editable: true, name: "birthday", label: "Birthday", type: 'inputTime', defaultValue: new Date(Number(result.user.birthday))},
                    {field: "status", editable: true, name: "status", label: "Status", type: 'select', options: statusOptions,
                        defaultValue: statusOptions.find((c: any) => c.value === result.user.status)
                    }
                ]
            },
            {
                domain: 'updateManager', domainTitle: "Manager additional information",
                fields: [
                    {field: "branchId", editable: true, name: "branchId", label: "Branch", type: 'select', options: branchResult,
                        defaultValue: branchResult.find((c: any) => c.value === result.manager.branchId)
                    },
                    {field: "certificates", editable: true, name: "certificates", label: "Certificates", type: 'input',
                        defaultValue: result.manager.certificates
                    },
                    {field: "introduce", editable: true, name: "introduce", label: "Introduce of Manager", type: 'input',
                        defaultValue: result.manager.introduce
                    },
                    {field: "salary", editable: true, name: "salary", label: "Salary of Manager", type: 'input',
                        defaultValue: result.manager?.salary?.toLocaleString()
                    }
                ]
            }
        ]

        return data;
    }
    useEffect(() => {
        (async () => {
            const idNumber = Number(id)
            const result = await getDetailManager(token, idNumber);
            const branchResult = await getAllBranch(token)

            return {result: result.data, branchResult: branchResult.data.map((e: any) => {return {value: e.id, label: e.name}})}
        })().then((dataRaw) => {
            const lastData = getData(dataRaw.result, dataRaw.branchResult)
            setData(lastData)
        })
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Manager Account</div>
            </div>
            <div className='px-5 py-3'>
                <InfoDetail updateFunction={update} data={data} buttonPermission={buttonPermission}></InfoDetail>
            </div>

        </div>
    );
}



