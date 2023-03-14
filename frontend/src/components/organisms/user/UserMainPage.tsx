import {IMAGES} from "../../../utils/images/images";
import {UserHeaderWrapper, Image} from "../../../style/styled";
import {useContext, useEffect, useMemo, useState} from "react";
import GridItems from "../../atoms/GridItems";
import {getAllDeviceTypeHaveParameter, getListItems} from "../../../api/manager/item/item/request";
import {toast} from "react-toastify";
import {getListSupply} from "../../../api/manager/supply/request";
import {AuthContext} from "../../../context/AuthContext";
import {UserMainContext} from "../../../context/UserMainContext";
import UserGridItems from "../../atoms/UserGridItems";

export default function UserMainPage() {
    const {token} = useContext(AuthContext)
    const [data, setData] = useState([])

    const {searchQuery, setUserMainData} = useContext(UserMainContext)
    const setSearchQuery = (searchQuery: any) => {
        setUserMainData?.(searchQuery)
    }

    useEffect(() => {
        (async () => {
            const result = await getListItems(token, searchQuery);
            if (result.meta.message === 'Successful') {
                const dataRaw = result.data.result;
                dataRaw.map((e: any) => {
                    e.supply = e.supply.name
                    e.price = e.price.toLocaleString() + " VND"
                    e.branch = e.branch || 'Local branch';
                    e.productionTime = <div>
                        <div>{(new Date(Number(e.productionTime))).toLocaleDateString()}</div>
                    </div>

                    e.type = <div className='flex flex-row items-center text-xs space-x-1'>
                        <div>{e.type}</div>
                        <div>({e.branch})</div>
                    </div>

                    e.productionCode =<div>
                        <div>{e.productionCode}</div>
                        <div>{e.type}</div>
                    </div>

                    e.parameter = e.parameter.map((param: any) => {
                        if (param.value) return <div className='text-xs'><b>{param.paramName}</b>: {param.value}</div>
                    })
                })
                setData(dataRaw);
                setPagination(result.data.pagination);
            }
            else toast.error(result.message);
        })()
    }, [searchQuery])

    const [pagination, setPagination] = useState({})

    return (
        <div className='w-full h-full flex flex-col px-3 py-3 space-y-4'>
            <div className='w-full overflow-y-auto bg-cover bg-center transition-all ease-in-out duration-1000 transform translate-x-0 slide'>
                <div className='w-full overflow-y-auto flex justify-between px-50 pt-5 space-x-10'>
                    <div className='w-full'>
                        <UserGridItems data={data} pagination={pagination} setSearchQuery={setSearchQuery}></UserGridItems>
                    </div>
                </div>
            </div>
        </div>
    );
}
