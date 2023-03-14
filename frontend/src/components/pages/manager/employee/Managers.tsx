import TableComponent from "../../../atoms/TableComponent";
import {useContext, useEffect, useMemo, useState} from "react";
import {createNewManager, getAllBranch, getList} from "../../../../api/manager/employee/manager/request";
import {toast} from "react-toastify";
import {AuthContext} from "../../../../context/AuthContext";
import CreatePopUp from "../../../molecules/CreatePopUp";

export default function ManagerManager() {
    const {token} = useContext(AuthContext)
    const headers = [
        {field: 'id',  title: 'id', width: 5},
        {field: 'fullName', title: 'name', width: 15},
        {field: 'branch', title: 'branch', width: 10},
        {field: 'email', title: 'email', width: 15},
        {field: 'phone', title: 'phone', width: 10},
        {field: 'role', title: 'role', width: 10},
        {field: 'status', title: 'status', width: 10}
    ]
    const [data, setData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [fieldToAdd, setFieldToAdd] = useState([
        {
            domain: 'newUserDto', domainTitle: 'Customer Information',
            fields: [
                {field: 'firstName', label: 'First name ', type: 'input', editable: true},
                {field: 'lastName', label: 'Last name ', type: 'input', editable: true},
                {field: 'phone', label: 'Personal phone ', type: 'input', editable: true},
                {field: 'email', label: 'Personal email ', type: 'input', editable: true},
                {field: 'birthday', label: 'Birthday ', type: 'inputTime', editable: true},
                {field: 'username', label: 'Username ', type: 'input', editable: true},
                {field: 'password', label: 'Password ', type: 'input', editable: true},
                {field: 'roleId', label: 'Role', type:'select', editable: true, options: [
                        {value: 1, label: 'Super Admin'},
                        {value: 2, label: 'Super Manager'},
                        {value: 3, label: 'Supply Manager'},
                        {value: 4, label: 'Sell Manager'},
                    ]
                }
            ]
        },
        {
            domain: 'newManagerDto', domainTitle: 'Manager Additional Information',
            fields: [
                {field: 'certificates', label: 'Certificates ', type: 'input', editable: true},
                {field: 'introduce', label: 'Basic introduce ', type: 'input', editable: true},
                {field: 'branchId', label: 'Branch ', type: 'select', options: [{value: '', label: ''}], editable: true},
                {field: 'salary', label: 'Salary (VND) ', type: 'input', editable: true},
            ]
        },
    ])

    const [pagination, setPagination] = useState({})
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        searchString: '',
        orderBy: 'ASC',
        orderField: 'id'
    })
    const filterArray = [{
        type: 'input', queryField: 'searchString',
        handleFunction: setSearchQuery,
        displayText: 'Search',
        placeholder: 'Name, email, phone,... '
    }]

    const handleCreateNew = async (body: any) => {
        body.newManagerDto.salary = Number(body.newManagerDto.salary)
        body.newUserDto.status = 'ACTIVE'
        body.newUserDto.birthday = (body.newUserDto.birthday).getTime()
        const createResult = await createNewManager(token, body);
        if (createResult.meta.message === 'Successful') {
            toast.success('Created new manager successfully!')
        }
        else toast.error(createResult.message)

    }

    useEffect(() => {
        (async () => {
            const result = await getList(token, searchQuery);
            if (result.meta.message === 'Successful') {
                setData(result.data.result);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message)
        })()
    }, [searchQuery, openAdd])

    useMemo(() => {
        (async () => {
            const branchResult = await getAllBranch(token);
            const dataRaw = branchResult.data.map((e: any) => {
                return {value: e.id, label: `${e.name} - [Representative: ${e.representative}]` }
            })
            if (branchResult.meta.message === 'Successful') {
                const oldFieldToAdd = fieldToAdd;
                oldFieldToAdd[1].fields[2].options = dataRaw;
                setFieldToAdd(oldFieldToAdd)
            }
        })()
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Managers Management</div>
            <TableComponent
                headers= {headers}
                data={data}
                pagination={pagination}
                filterArray={filterArray}
                setOpenAdd={setOpenAdd}
                addPermission = {true}
                setSearchQuery={setSearchQuery}
            />
            {
                openAdd ?
                    <CreatePopUp
                        setOpenAdd={setOpenAdd}
                        title={'Create new manager'}
                        fields={fieldToAdd}
                        handleCreateNew={handleCreateNew}
                    ></CreatePopUp>
                    :<></>
            }
        </div>
    );
}
