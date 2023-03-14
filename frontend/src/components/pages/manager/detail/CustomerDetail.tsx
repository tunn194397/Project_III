import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IMAGES} from "../../../../utils/images/images";
import InfoDetail from "../../../atoms/InfoDetail";
import {getDetailCustomer, getList, updateCustomer as updateCustomerDetail} from "../../../../api/manager/customer/request";
import {toast} from "react-toastify";
import {AuthContext} from "../../../../context/AuthContext";

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

const registerTypeOptions = [
    {value: 'STAFF', label: 'Staff'},
    {value: 'MANAGER', label: 'Manager'},
    {value: 'CUSTOMER', label: 'Customer'},
]

const levelOptions = [
    {value: 'NEW', label: 'New'},
    {value: '1 YEARS', label: '1 year'},
    {value: '2 YEARS', label: '2 years'},
    {value: '3 YEARS', label: '3 years'},
]

export default function ManagerCustomerDetail() {
    const {token, user, permission} = useContext(AuthContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState({
        id: null,
        name: '',
        email :'',
        nationality: '',
        phone: '',
        avatarImage: '',
        birthday: 0,
        firstName: '',
        lastName: '',
        status: '',
        customer: {
            registerType: '',
            registerStaffId: 0,
            level: '',
            score: 0
        }
    })
    const firstData: any[] = [];
    const [data, setData] = useState(firstData)
    const handleBack = () =>  {
        const idLength = String(id).length;
        const currentPathLength = String(window.location.href).length
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = window.location.href.substring(length || 22, currentPathLength - idLength -1)
        navigate(`/${path}`)
    }

    const updateCustomer= async (body: any) => {
        body.updateUser.birthday = (body.updateUser.birthday).getTime()
        const updateResult = await updateCustomerDetail(token, Number(id), body)
        if (updateResult.meta.code === 200) {
            toast.success("Update customer information successful!")
        }
        else toast.error("Update customer information unsuccessful!")
    }

    const getData = (customer: any) => {
        const data = [
            {
                domain: "updateUser", domainTitle: "User personal information",
                fields:  [
                    {field: "avatarImage", editable: false, name: "id", label: "Avatar", type: 'image', defaultValue: customer.avatarImage},
                    {field: "fullName", editable: false, name: "fullName", label: "Full name", type: 'input', defaultValue: customer.name},
                    {field: "firstName", editable: true, name: "firstName", label: "First name", type: 'input',  defaultValue: customer.firstName},
                    {field: "lastName", editable: true, name: "lastName", label: "Last name", type: 'input', defaultValue: customer.lastName},
                    {field: "email", editable: true, name: "email", label: "Customer email", type: 'input', defaultValue: customer.email},
                    {field: "phone", editable: true, name: "phone", label: "Customer phone number", type: 'input', defaultValue: customer.phone},
                    {field: "nationality", editable: true, name: "nationality", label: "Nationality", type: 'input', defaultValue: customer.nationality || 'Vietnamese'},
                    {field: "bankName", editable: true, name: "bankName", label: "Bank name", type: 'input', defaultValue: customer.bankName},
                    {field: "bankAccount", editable: true, name: "bankAccount", label: "Bank account", type: 'input', defaultValue: customer.bankAccount},
                    {field: "bankOwner", editable: true, name: "bankOwner", label: "Bank owner", type: 'input', defaultValue: customer.bankOwner},
                    {field: "address", editable: true, name: "address", label: "Address", type: 'input', defaultValue: customer.address},
                    {field: "birthday", editable: true, name: "birthday", label: "Birthday", type: 'inputTime', defaultValue: new Date(Number(customer.birthday))},
                    {field: "status", editable: true, name: "status", label: "Status", type: 'select', options: statusOptions,
                        defaultValue: statusOptions.find((c: any) => c.value === customer.status)
                    },
                ]
            },
            {
                domain: "updateCustomer", domainTitle: "Customer additional information",
                fields: [
                    {field: "registerType", editable: false, name: "registerType", label: "Register type", type: 'select', options: registerTypeOptions,
                        defaultValue: registerTypeOptions.find((c: any) => c.value === customer.customer.registerType)
                    },
                    {field: "registerStaffId", editable: false, name: "registerStaffId", label: "Register Staff/Manager Id", type: 'input', defaultValue: customer.customer.registerStaffId},
                    {field: "level", editable: false, name: "level", label: "Customer level", type: 'select', options: levelOptions,
                        defaultValue: levelOptions.find((c: any) => c.value === customer.customer.level)
                    },
                    {field: "score", editable: false, name: "score", label: "Score", type: 'input', defaultValue: String(customer.customer.score)},
                ]
            }
        ]

        return data;
    }
    useEffect(() => {
        (async () => {
            const idNumber = Number(id)
            const result = await getDetailCustomer(token, idNumber);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data;
                setCustomer(dataRaw)
                return dataRaw
            }
            else toast.error(result.message)
        })().then((dataRaw) => {
            const lastData = getData(dataRaw)
            setData(lastData)
        })
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Customer Account</div>
            </div>
            <div className='px-5 py-3'>
                <InfoDetail updateFunction={updateCustomer} data={data} buttonPermission={buttonPermission}></InfoDetail>
            </div>

        </div>
    );
}



