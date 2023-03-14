import {useForm} from "react-hook-form";
import {useContext, useEffect, useMemo, useState} from "react";
import InputItem from "../../../atoms/InputItem";
import InputItemForItemCreation from "../../../atoms/InputItemForItemCreation";
import {
    createNewItem,
    getAllDeviceParameter,
    getAllDeviceTypeHaveParameter,
} from "../../../../api/manager/item/item/request";
import {AuthContext} from "../../../../context/AuthContext";
import {IMAGES} from "../../../../utils/images/images";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {getListSupply} from "../../../../api/manager/supply/request";

export default function CreateItem() {
    const {token} = useContext(AuthContext)
    const navigate = useNavigate()
    const { control, register, handleSubmit, formState: { errors } } = useForm({
        criteriaMode: "all"
    });

    const [deviceTypeToAdd, setDeviceTypeToAdd] = useState({deviceType: 0})
    const [supply, setSupply] = useState([])
    const [deviceTypes, setDeviceTypes] = useState([])
    const [reload, setReload] = useState(true)
    const [fields, setFields] = useState([
        {
            domain: 'item', domainTitle: 'Item main information',
            fields: [
                {field: 'name', label: 'Name ', type: 'input', editable: true},
                {field: 'deviceTypeId', label: 'Type', type: 'select', options: deviceTypes, editable: true},
                {field: 'supplyId', label: 'Supplier', type: 'select', options: supply, editable: true},
                {field: 'importPrice', label: 'Import price (VND) ', type: 'input', editable: true},
                {field: 'price', label: 'Price (when sale) (VND)', type: 'input', editable: true},
                {field: 'content', label: 'Content', type: 'input', editable: true},
                {field: 'image', label: 'Image url ', type: 'input', editable: true},
                {field: 'introduce', label: 'Intro ', type: 'input', editable: true},
                {field: 'branch', label: 'Branch ', type: 'input', editable: true},
                {field: 'productionTime', label: 'Production time ', type: 'inputTime', editable: true},
                {field: 'productionCode', label: 'Production code ', type: 'input', editable: true}
            ]
        }
    ])
    const [paramFields, setParamFields] = useState([
        {
            domain: 'itemIntro', domainTitle: 'Item introduce parameter',
            fields: [{field: '', label: '', type: 'input', editable: true}]
        },
        {
            domain: 'itemParam', domainTitle: 'Item detail parameter',
            fields: [{field: '', label: '', type: 'input', editable: true}]
        }
    ])
    const [addParam, setAddParam] = useState(false)

    const handleBack = () =>  {
        const idLength = 6;
        const currentPathLength = String(window.location.href).length
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = window.location.href.substring(length || 22, currentPathLength - idLength -1)
        navigate(`/${path}`)
    }

    useEffect(() => {
        (async () => {
            const deviceParameter = await getAllDeviceParameter(token, deviceTypeToAdd.deviceType)
            const fieldToAddObject = paramFields;
            const deviceIntroParameterOptions : any[] =[]
            const deviceParameterOptions: any[] = [];
            deviceParameter.data.map((e: any) => {
                if (e.isFirstIntro) deviceIntroParameterOptions.push(
                    {field: String("Param"+e.id), label: e.paramName, type: 'input', editable: true}
                )
                deviceParameterOptions.push({field: String("Param"+e.id), label: e.paramName, type: 'input', editable: true})
            })

            fieldToAddObject[0].fields = deviceIntroParameterOptions
            fieldToAddObject[1].fields = deviceParameterOptions
            setParamFields(fieldToAddObject)
        })()
    }, [deviceTypeToAdd, reload])

    useMemo(() => {
        (async () => {
            const devices = await getAllDeviceTypeHaveParameter(token);
            const deviceOptions = devices.data.map((e: any) => {
                return{value: e.id, message: e.name, label: e.name}
            })
            deviceOptions.push({value: 0, message: 'All'})
            setDeviceTypes(deviceOptions)

            const supplies = await getListSupply(token, {page: 1, pageSize: 1000, searchString: '', orderField: 'name', orderBy: 'ASC', status: null, startDate: null, endDate: null})
            const supplyOptions = supplies.data.result.map((e: any) => {
                return{value: e.id, message: e.name, label: e.name}
            })
            supplyOptions.push({value: 0, message: 'All'})
            setSupply(supplyOptions)

            const fieldToAddObject = fields;
            (fieldToAddObject[0].fields)[1].options = deviceOptions;
            (fieldToAddObject[0].fields)[2].options = supplyOptions;
            setFields(fieldToAddObject)
        })()
    }, [])

    const onSubmit = async (body: any) => {
        body.item.productionTime = body.item.productionTime.getTime()
        body.item.price = Number(body.item.price) || 0
        const itemParameters = Object.keys(body.itemParam).map((e: any) => {
            return {
                deviceParameterId: Number(String(e).substring(5)),
                detail: body.itemParam[e],
                value: body.itemIntro[e]
            }
        })
        const createResult = await createNewItem(token, {item: body.item, itemParameters: itemParameters})
        if (createResult.meta.code === 201) {
            toast.success("Create new item successfully!")
            navigate(`/manager/items/items`)
        }
        else toast.error("Create new item unsuccessfully!")


    }
    return (
        <div className='bg-gray-100 space-y-5'>
            <div className='flex flex-row items-center space-x-4'>
                <button onClick={handleBack}>
                    <svg height={32} width={32} >{IMAGES.icon.backBlackIcon}</svg>
                </button>
                <div className='text-2xl text-black font-bold'>Create new Item</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='overflow-y-auto px-3 py-5 bg-white border-2 border-gray-200 rounded-lg'>
                <div  className='flex flex-col py-2 space-y-4 '>
                    {
                        fields.map((domain: any) => {
                            return (
                                <div className='flex flex-col bg-white space-y-5 border-2 border-gray-200 px-10 py-5 rounded-md' key={domain.domain}>
                                    <div className='text-lg font-semibold'>{domain.domainTitle}</div>
                                    <hr/>
                                    <div className='grid grid-cols-3 gap-5'>
                                        {domain.fields.map((e: any ) => {
                                            return (
                                                <div key={e.field} className='space-y-1' >
                                                    <div className='text-sm'>{e.label}</div>
                                                    {
                                                        e.label !== 'Type' ?
                                                            <InputItem domain={domain.domain} field={e} register={register} control={control} errors={errors} isEdit={true}></InputItem>
                                                            :
                                                            <InputItemForItemCreation
                                                                domain={domain.domain} field={e} register={register} control={control} errors={errors} isEdit={true} setSearchQuery={setDeviceTypeToAdd} setAddParam={setAddParam}
                                                            ></InputItemForItemCreation>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }
                </div>
                {addParam && <div  className='flex flex-col py-2 space-y-4 '>
                    {
                        paramFields.map((domain: any) => {
                            return (
                                <div className='flex flex-col bg-white space-y-5 border-2 border-gray-200 px-10 py-5 rounded-md' key={domain.domain}>
                                    <div className='text-lg font-semibold'>{domain.domainTitle}</div>
                                    <hr/>
                                    <div className='grid grid-cols-4 gap-5'>
                                        {domain.fields.map((e: any ) => {
                                            return (
                                                <div key={e.field} className='space-y-1' >
                                                    <div className='text-sm'>{e.label}</div>
                                                    <InputItem domain={domain.domain} field={e} register={register} control={control} errors={errors} isEdit={true}></InputItem>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <br/>
                                </div>
                            )
                        })
                    }
                </div>}
                {addParam? <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md" type="submit"> Create new item  </button>
                    : <button className="text-white ring-2 hover:ring-4 ring-blue-200 bg-blue-700 font-bold py-2 px-4 rounded-md" type="button" onClick={() => setAddParam(true)}>
                        Next
                    </button>
                }
            </form>
        </div>
    );
}