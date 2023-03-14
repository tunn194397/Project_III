import TableComponent from "../../atoms/TableComponent";
import {useContext, useEffect, useState} from "react";
import {createNewSupply, getListSupply} from "../../../api/manager/supply/request";
import {toast} from "react-toastify";
import {AuthContext} from "../../../context/AuthContext";
import CreatePopUp from "../../molecules/CreatePopUp";
import {IMAGES} from "../../../utils/images/images";
import {createNewCustomer, getListUserWithRole} from "../../../api/manager/customer/request";

const fieldToAddRepresentative = [
    {
        domain: 'newUserDto', domainTitle: 'Supply Representative Information',
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
]

const headers = [
    {title: 'id', field: 'id', width: 3},
    {title: 'name', field: 'name', width: 15},
    {title: 'address', field: 'address', width: 20},
    {title: 'email', field: 'email', width: 15},
    {title: 'hotline', field: 'phone', width: 12},
    {title: 'representative', field: 'representativeName', width: 15},
    {title: 'connected', field: 'updatedAt', width: 10}
]

export default function ManagerSupply() {
    const {token, roleId, user, permission} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [fieldToAdd, setFieldToAdd] = useState([
        {
            domain: 'newSupplyDto', domainTitle: 'Supply Information',
            fields: [
                {field: 'name', label: 'Supply name ', type: 'input', editable: true},
                {field: 'address', label: 'Address', type: 'input', editable: true},
                {field: 'phone', label: 'Hotline ', type: 'input', editable: true},
                {field: 'email', label: 'Email ', type: 'input', editable: true},
                {field: 'imageUrl', label: 'Image url', type: 'input', editable: true},
                {field: 'representativeId', label: 'Representative ', type: 'select', options: [{
                        value: '',
                        label: ''
                    }],
                    editable: true
                },
            ]
        },
    ])
    const [representative, setRepresentative] = useState([])
    const [pagination, setPagination] = useState({})
    const [openAddRep, setOpenAddRep] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [searchQuery, setSearchQuery] = useState({
        page: 1,
        pageSize: 10,
        startDate: null,
        endDate: null,
        status: null,
        searchString: '',
        orderBy: 'ASC',
        orderField: 'id'
    })
    useEffect(() => {
        (async () => {
            const result = await getListSupply(token, searchQuery);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;
                dataRaw.map((e: any) => {
                    e.updatedAt = <div>
                        <div>{(new Date(Number(e.updatedAt))).toLocaleDateString()}</div>
                        <div className="text-xs">{(new Date(Number(e.updatedAt))).toLocaleTimeString()}</div>
                    </div>
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message)

            const representativeResult = await getListUserWithRole(token, 7);
            if (representativeResult.meta.message === 'Successful') {
                const dataRaw = representativeResult.data.result.map((e: any) => {
                    return {
                        value: e.id,
                        label: `${e.fullName} [${e.email}]`
                    }
                });
                setRepresentative(dataRaw)
                return dataRaw
            }
            else toast.error(result.message)
        })().then((dataRaw: any) => {
            const data = fieldToAdd;
            data[0].fields[5].options = dataRaw;
            setFieldToAdd(data);
        })
    }, [searchQuery, openAdd, openAddRep])

    const filterArray = [
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
                {value: 'DELETED', message: 'Deleted'}
            ]
        },
        {
            type: 'coupleTime',
            minQueryField: 'startDate', maxQueryField: 'endDate',
            displayText: 'Connected date',
            handleFunction: setSearchQuery
        }
    ]

    const handleCreateNew = async (body: any) => {
        const bodyToPush = body.newSupplyDto;
        const createResult = await createNewSupply(token, bodyToPush);
        if (createResult.meta.message === 'Successful') {
            toast.success('Created new supply successfully!')
        }
        else toast.error(createResult.meta.message)
    }

    const handleCreateNewRepresentative = async (dataBody: any) => {
        const body =dataBody.newUserDto
        body.birthday = body.birthday.getTime()
        const newCustomer = {
            newUserDto: {
                ... body,
                roleId: 7,
                status: 'ACTIVE'
            },
            newCustomerDto: {
                registerType: (roleId === 5) ? 'STAFF': (roleId === 6) ? 'CUSTOMER': 'MANAGER',
                registerStaffId: user?.id || null
            }
        }
        const createResult = await createNewCustomer(token, newCustomer);
        if (createResult.meta.message === 'Successful') {
            toast.success('Created new supply representative successfully!')
        }
        else toast.error(createResult.meta.message)
    }

    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Supply Management</div>
            {permission.includes('MANAGER_SUPPLY_CREATE') && <div className='flex flex-col space-y-2 items-end'>
                <button className='border-[1px] border-black hover:ring-4 hover:ring-blue-400 px-2 py-2 bg-white rounded-md font-semibold' onClick={() => setOpenAddRep(true)}>
                    Add new supply representative
                </button>
            </div>}
            <TableComponent
                headers= {headers}
                data={data}
                pagination={pagination}
                filterArray={filterArray}
                setOpenAdd={setOpenAdd}
                addPermission = {permission.includes('MANAGER_SUPPLY_CREATE')}
                setSearchQuery={setSearchQuery}/>
            {
                openAdd ?
                    <CreatePopUp
                        setOpenAdd={setOpenAdd}
                        title={'Create new supply'}
                        fields={fieldToAdd}
                        handleCreateNew={handleCreateNew}
                    ></CreatePopUp>
                    :<></>
            }
            {
                openAddRep ?
                    <CreatePopUp
                        setOpenAdd={setOpenAddRep}
                        title={'Create new supply representative'}
                        fields={fieldToAddRepresentative}
                        handleCreateNew={handleCreateNewRepresentative}
                    ></CreatePopUp>
                    :<></>
            }
        </div>
    )
}


