import SearchBar from "../../../atoms/SearchBar";
import TableComponent from "../../../atoms/TableComponent";
import {useContext, useEffect, useMemo, useState} from "react";
import {createNewStaff, getList} from "../../../../api/manager/employee/staff/request";
import {toast} from "react-toastify";
import {AuthContext} from "../../../../context/AuthContext";
import CreatePopUp from "../../../molecules/CreatePopUp";
import {createNewManager, getAllBranch} from "../../../../api/manager/employee/manager/request";

export default function ManagerStaff() {
    const {token, user} = useContext(AuthContext)
    const headers = [
        {field: 'id', title: 'id', width: 5},
        {field: 'fullName', title: 'name', width: 15},
        {field: 'email', title: 'email', width: 15},
        {field: 'phone', title: 'phone', width: 12},
        {field: 'firstWorkedDate', title: 'first work date', width: 15},
        {field: 'workingPeriod', title: 'working period', width: 15},
        {field: 'salary', title: 'salary', width: 15}
    ]
    const [data, setData] = useState([])
    const [openAdd, setOpenAdd] = useState(false)
    const [fieldToAdd, setFieldToAdd] = useState([
        {
            domain: 'newUserDto', domainTitle: 'General Information',
            fields: [
                {field: 'firstName', label: 'First name ', type: 'input', editable: true},
                {field: 'lastName', label: 'Last name ', type: 'input', editable: true},
                {field: 'phone', label: 'Personal phone ', type: 'input', editable: true},
                {field: 'email', label: 'Personal email ', type: 'input', editable: true},
                {field: 'birthday', label: 'Birthday ', type: 'inputTime', editable: true},
                {field: 'username', label: 'Username ', type: 'input', editable: true},
                {field: 'password', label: 'Password ', type: 'input', editable: true}
            ]
        },
        {
            domain: 'newStaffDto', domainTitle: 'Staff Additional Information',
            fields: [
                {field: 'firstWorkedDate', label: 'First worked date ', type: 'inputTime', editable: true},
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
        orderField: 'id',
        salary: '',
        workingPeriod: '',
        staffRoleId: 0
    })
    const filterArray = [
        {
            type: 'input', queryField: 'searchString',
            handleFunction: setSearchQuery,
            displayText: 'Search',
            placeholder: 'Name, email, phone,... '
        },
        {
            type: 'select', queryField: 'salary',
            handleFunction: setSearchQuery,
            displayText: 'Salary',
            options: [
                {value: '', message: 'All'},
                {value: '<2', message: '< 2,000,000 VND'},
                {value: '2-5', message: '2,000,000 VND - 5,000,000 VND'},
                {value: '5-10', message: '5,000,000 VND - 10,000,000 VND'},
                {value: '10-20', message: '10,000,000 VND - 20,000,000 VND'},
                {value: '20-50', message: '20,000,000 VND - 50,000,000 VND'},
                {value: '>50', message: '> 50,000,000 VND'},
            ]
        },
        {
            type: 'select', queryField: 'workingPeriod',
            handleFunction: setSearchQuery,
            displayText: 'Working Periods',
            options: [
                {value: '', message: 'All'},
                {value: '< 2', message: '< 2 years'},
                {value: '2-5', message: '2 - 5 years'},
                {value: '5-10', message: '5 - 10 years'},
                {value: '10-20', message: '10 -20 years'},
                {value: '>20', message: ' > 20 years'},
            ]
        }
    ]

    useEffect(() => {
        (async () => {
            const staffRoleId = (user?.roleId === 1 || user?.roleId === 2) ? 0 :(user?.roleId === 3) ? 8: (user?.roleId === 4 ? 5: 9)
            const result = await getList(token, {...searchQuery, staffRoleId: staffRoleId});
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;
                dataRaw.map((e: any) => {
                    e.salary = e.salary.toLocaleString() + " VND"
                    const yearDiff = (new Date()).getFullYear() - (new Date(Number(e.firstWorkedDate))).getFullYear()
                    const monthDiff = (new Date()).getMonth() - (new Date(Number(e.firstWorkedDate))).getMonth()
                    e.workingPeriod = yearDiff === 0 ? ((monthDiff === 0) ? " This month" : (monthDiff + " months")) : (yearDiff + " years")
                    e.firstWorkedDate = new Date(Number(e.firstWorkedDate)).toLocaleDateString()
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message)
        })()
    }, [searchQuery, openAdd])

    const handleCreateNew = async (body: any) => {
        body.newUserDto.birthday = (body.newUserDto.birthday).getTime()
        body.newUserDto.roleId = (user?.roleId === 3) ? 8: 5
        body.newStaffDto.firstWorkedDate = (body.newStaffDto.firstWorkedDate).getTime()
        body.newStaffDto.salary = Number(body.newStaffDto.salary)
        body.newUserDto.status = 'ACTIVE'

        const createResult = await createNewStaff(token, body);
        if (createResult.meta.message === 'Successful') {
            toast.success('Created new manager successfully!')
        }
        else toast.error(createResult.message)

    }

    useMemo(() => {
        (async () => {
            const branchResult = await getAllBranch(token);
            const dataRaw = branchResult.data.map((e: any) => {
                return {value: e.id, label: `${e.name} - [Representative: ${e.representative}]` }
            })
            if (branchResult.meta.message === 'Successful') {
                const oldFieldToAdd = fieldToAdd;
                oldFieldToAdd[1].fields[1].options = dataRaw;
                setFieldToAdd(oldFieldToAdd)
            }
        })()
    }, [])
    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Staffs Management</div>
            <TableComponent
                headers= {headers}
                data={data}
                pagination={pagination}
                filterArray={filterArray}
                setOpenAdd={setOpenAdd}
                setSearchQuery={setSearchQuery}
                addPermission = {true}
            />
            {
                openAdd ?
                    <CreatePopUp
                        setOpenAdd={setOpenAdd}
                        title={'Create new staff'}
                        fields={fieldToAdd}
                        handleCreateNew={handleCreateNew}
                    ></CreatePopUp>
                    :<></>
            }
        </div>
    );
}

