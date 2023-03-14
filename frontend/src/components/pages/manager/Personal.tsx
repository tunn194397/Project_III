import {AuthContext} from "../../../context/AuthContext";
import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import InfoDetail from "../../atoms/InfoDetail";
import {getDetailStaff} from "../../../api/manager/employee/staff/request";
import {getDetailManager} from "../../../api/manager/employee/manager/request";
import {updatePersonal} from "../../../api/manager/customer/request";

const buttonPermission = {
    total: 'MANAGER_PERSONAL_VIEW',
    edit: 'MANAGER_PERSONAL_UPDATE',
    save: 'MANAGER_PERSONAL_UPDATE',
    submit: 'MANAGER_PERSONAL_SUBMIT',
    approve: 'MANAGER_PERSONAL_APPROVE'
}

export default function ManagerPersonal() {
    const {token, user, permission} = useContext(AuthContext)
    const navigate = useNavigate()
    const [personal, setPersonal] = useState({
        id: null,
        name: '',
        email :'',
        nationality: '',
        phone: '',
        avatarImage: '',
        birthday: 0,
        firstName: '',
        lastName: '',
        status: ''
    })
    const firstData: any[] = [];
    const [data, setData] = useState(firstData)

    const updateCustomer= async (body: any) => {
        body.userUpdate.birthday = (body.userUpdate.birthday).getTime()
        const updateResult = await updatePersonal(token, user?.id, body.userUpdate)
        if (updateResult?.meta?.code === 200) {
            toast.success("Update personal information successful!")
        }
        else toast.error("Update personal information unsuccessful!")
    }

    const getData = (personal: any) => {
        const data = [
            {
                domain: 'userUpdate', domainTitle:"Your personal information",
                fields:  [
                    {field: "avatarImage", editable: false, name: "id", label: "Avatar", type: 'image', defaultValue: personal.avatarImage},
                    {field: "fullName", editable: false, name: "fullName", label: "Full name", type: 'input', defaultValue: personal.fullName},
                    {field: "firstName", editable: true, name: "firstName", label: "First name", type: 'input',  defaultValue: personal.firstName},
                    {field: "lastName", editable: true, name: "lastName", label: "Last name", type: 'input', defaultValue: personal.lastName},
                    {field: "email", editable: true, name: "email", label: "Email", type: 'input', defaultValue: personal.email},
                    {field: "phone", editable: true, name: "phone", label: "Phone number", type: 'input', defaultValue: personal.phone},
                    {field: "nationality", editable: true, name: "nationality", label: "Nationality", type: 'input', defaultValue: personal.nationality || 'Vietnamese'},
                    {field: "birthday", editable: true, name: "birthday", label: "Birthday", type: 'inputTime', defaultValue: new Date(Number(personal.birthday))},
                ]
            },
        ]

        return data;
    }
    useEffect(() => {
        (async () => {
            if (user?.roleId === 5 || user?.roleId === 8) {
                const result = await getDetailStaff(token, user?.id || 0);
                if (result.meta.message === 'Successful') {
                    const dataRaw = result.data.user;
                    setPersonal(dataRaw)
                    return dataRaw
                }
                else toast.error(result.message)
            }
            else {
                const result = await getDetailManager(token, user?.id || 0);
                if (result.meta.message === 'Successful') {
                    const dataRaw = result.data.user;
                    setPersonal(dataRaw)
                    return dataRaw
                }
                else toast.error(result.message)
            }
        })().then((dataRaw) => {
            const lastData = getData(dataRaw)
            setData(lastData)
        })
    }, [])

    return (
        <div className='flex flex-col space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <div className='text-2xl text-black font-bold px-5'>Personal Information</div>
            </div>
            <div className='px-5 py-3'>
                <InfoDetail updateFunction={updateCustomer} data={data} buttonPermission={buttonPermission}></InfoDetail>
            </div>

        </div>
    );
}
