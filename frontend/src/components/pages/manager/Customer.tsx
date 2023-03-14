import SearchBar from "../../atoms/SearchBar";
import TableComponent from "../../atoms/TableComponent";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {createNewCustomer, getList} from "../../../api/manager/customer/request";
import {toast} from "react-toastify";
import CreatePopUp from "../../molecules/CreatePopUp";
import CreateItemPopUp from "../../molecules/CreateItemPopUp";

const headers = [
    {title: 'id', field: 'id', width: 5},
    {title: 'name', field: 'name',width: 10},
    {title: 'email', field: 'email',width: 10},
    {title: 'phone',field: 'phone', width: 8},
    {title: 'bank information',field: 'bank', width: 12},
    {title: 'address',field: 'address', width: 10},
    {title: 'register', field: 'staff',width: 10}
]
const fieldToAdd = [
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
            {field: 'bankName', label: 'Bank ', type: 'input', editable: true},
            {field: 'bankAccount', label: 'Bank account ', type: 'input', editable: true},
            {field: 'bankOwner', label: 'Name of bank owner ', type: 'input', editable: true},
            {field: 'address', label: 'Address ', type: 'input', editable: true},
        ]
    },
]

export default function ManagerCustomer() {
    const {token, roleId, permission, user} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({})
    const [openAdd, setOpenAdd] = useState(false)

    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        registerStaffId: null,
        registerType:  null,
        level: null,
        minScore:  null,
        maxScore: null,
        status:  null,
        searchString: '',
        orderBy: 'ASC',
        orderField: 'id'
    })

    const handleCreateNew = async (body: any) => {
        const bodyToPush = body.newUserDto
        bodyToPush.birthday = bodyToPush.birthday.getTime()
        const newCustomer = {
            newUserDto: {
                ... bodyToPush,
                roleId: 6,
                status: 'ACTIVE'
            },
            newCustomerDto: {
                registerType: (roleId === 5) ? 'STAFF': (roleId === 6) ? 'CUSTOMER': 'MANAGER',
                registerStaffId: user?.id || null
            }
        }
        const createResult = await createNewCustomer(token, newCustomer);
        if (createResult.meta.message === 'Successful') {
            toast.success('Created new customer successfully!')
        }
        else toast.error(createResult.message)
    }

    useEffect(() => {
        (async () => {
            let result: any;
            if (user?.roleId === 5 || user?.roleId === 8) {
                result = await getList(token, {...searchQuery, registerStaffId: user?.id || 0});
            }
            else result = await getList(token, searchQuery);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;
                dataRaw.map((e: any) => {
                    e.staff = (e.staff?.fullName || '') + ` (${e.registerType})`
                    e.bank = <div>
                        <div>{e.bankOwner}</div>
                        <div className='text-sm'>{e.bankName} - {e.bankAccount}</div>
                    </div>
                })
                setData(dataRaw);
                setPagination(result.data.pagination);

                if (user?.roleId !== 5 && user?.roleId !== 8) {
                    const filterArrayTmp = filterArray;
                    if (filterArrayTmp.length === 2) filterArrayTmp.push({
                        type: 'select', queryField: 'registerType',
                        handleFunction: setSearchQuery,
                        displayText: 'Register by',
                        options: [
                            {value: '', message: 'All'},
                            {value: 'STAFF', message: 'Staff'},
                            {value: 'CUSTOMER', message: 'Customer'},
                            {value: 'MANAGER', message: 'Manager'},
                        ]
                    },)
                    setFilterArray(filterArrayTmp)
                }
            }
            else toast.error(result.message)
        })()
    }, [searchQuery, openAdd])

    const [filterArray, setFilterArray] = useState([
        {
            type: 'input', queryField: 'searchString',
            handleFunction: setSearchQuery,
            displayText: 'Search',
            placeholder: 'Name, email, phone,... '
        },
        {
            type: 'select', queryField: 'status',
            handleFunction: setSearchQuery,
            displayText: 'Status',
            options: [
                {value: '', message: 'All'},
                {value: 'ACTIVE', message: 'Active'},
                {value: 'NON_ACTIVE', message: 'Inactive'},
                {value: 'DELETED', message: 'Deleted'},
            ]
        },
        // {
        //     type: 'select', queryField: 'level',
        //     handleFunction: setSearchQuery,
        //     displayText: 'Level',
        //     options: [
        //         {value: '', message: 'All'},
        //         {value: 'NEW', message: 'New'},
        //         {value: '1 YEAR', message: '1 Year'},
        //         {value: '2 YEAR', message: '2 Years'},
        //         {value: '5 YEAR', message: '5 years'},
        //     ]
        // },
        // {
        //     type: 'coupleInput',
        //     minQueryField: 'minScore', maxQueryField: 'maxScore',
        //     displayText: 'Score',
        //     handleFunction: setSearchQuery
        // },
    ])

    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Customer Management</div>
            <TableComponent
                headers= {headers}
                data={data}
                pagination={pagination}
                filterArray={filterArray}
                setOpenAdd={setOpenAdd}
                setSearchQuery={setSearchQuery}
                addPermission = {permission.includes('MANAGER_CUSTOMER_CREATE')}
            />
            {
                openAdd ?
                    <CreatePopUp
                        setOpenAdd={setOpenAdd}
                        title={'Create new customer'}
                        fields={fieldToAdd}
                        handleCreateNew={handleCreateNew}
                    ></CreatePopUp>
                    :<></>
            }
        </div>
    );
}



