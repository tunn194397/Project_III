import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../../context/AuthContext';
import SearchBarValidateCoupleTime from "../../atoms/SearchBarValidateCoupleTime";
import {toast} from "react-toastify";
import {getImportHomeData} from "../../../api/manager/item/supply/request";
import {getSellHomeData} from "../../../api/manager/item/sell/request";
import {useNavigate} from "react-router-dom";
import ImportRevenue from "../../molecules/HomeMoleculers/ImportRevenue";
import SellRevenue from "../../molecules/HomeMoleculers/SellRevenue";

export default function ManagerHome() {
    const { token, permission, isLogin} = useContext(AuthContext)
    const navigate = useNavigate()
    const [tab, setTab] = useState(1)
    const goToItemDetail = (id: number) => {
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = (window.location.href).substring(length || 22)
        navigate(`/${path}/items/items/${id}`)
    }
    const [importHomeData, setImportHomeData] = useState({
        itemsMaxCount: [],
        itemsMaxValue: [],
        itemsMinCount: [],
        itemsMinValue: [],
        countReceipt: 0,
        itemImportCount: [],
        itemImportQuantity: 0,
        value: 0,
        receipts: [],
        warehouse: [],
        monthlyData: []
    })
    const [sellHomeData, setSellHomeData] = useState({})
    const [searchQuery, setSearchQuery] = useState({
        startedAt: new Date((new Date()).setMonth(new Date().getMonth() -1)).getTime(),
        finishedAt: new Date().getTime()
    })
    const filter = {
        type: 'coupleTime',
        minQueryField: 'startedAt', maxQueryField: 'finishedAt',
        minDefaultValue : searchQuery.startedAt, maxDefaultValue: searchQuery.finishedAt,
        displayText: '',
        handleFunction: setSearchQuery
    }

    useEffect(() => {
       (async () => {
           if (!isLogin || !permission.includes('MANAGER_HOME_VIEW')) {
               navigate('/manager/personal')
           }
           const importResult = await getImportHomeData(token, searchQuery);
            if (importResult.meta.message === 'Successful') {
                const dataRaw = importResult.data.importReceiptCountResult;
                dataRaw.receipts.map((e: any) => {
                    e.content = (e.content.length > 40 )  ? e.content.substring(0,40) + "..." : e.content;
                    e.updatedAt = <div>
                        <div>{(new Date(Number(e.updatedAt))).toLocaleDateString()}</div>
                        <div className="text-xs">{(new Date(Number(e.updatedAt))).toLocaleTimeString()}</div>
                    </div>
                    e.finalPrice = (e.finalPrice)?.toLocaleString() + " VND"
                    e.saleOff = e.saleOff?.toLocaleString() + " %"
                    e.note = (e.note.length > 40) ? e.note.length.substring(0,40) + "..." : e.note
                    e.supply = e.supply.name
                })
                setImportHomeData(dataRaw);
            }
            else toast.error(importResult.message)

           const sellResult = await getSellHomeData(token, searchQuery);
           if (sellResult.meta.message === 'Successful') {
               const dataRaw = sellResult.data.sellReceiptCountResult;
               dataRaw.receipts.map((e: any) => {
                   e.totalPrice = (e.totalPrice)?.toLocaleString() +" VND"
                   e.saleOff = String(e.saleOff) + " %"
                   e.finalPrice = (e.finalPrice)?.toLocaleString() + " VND"
                   e.customer = <div><div>{e.customer?.fullName}</div><div className="text-xs">({e.customerId})</div></div>;
                   e.staff = <div><div>{e.staff?.fullName || e.manager?.fullName}</div><div className="text-xs">({e.staffId})</div></div>;
                   e.updatedAt = <div>
                       <div>{(new Date(Number(e.updatedAt))).toLocaleDateString()}</div>
                       <div className="text-xs">{(new Date(Number(e.updatedAt))).toLocaleTimeString()}</div>
                   </div>
               })
               setSellHomeData(dataRaw);
           }
           else toast.error(sellResult.message)

        })();

    }, [searchQuery])

    const activeButton = 'bg-blue-600 px-5 py-2 rounded-lg text-white font-semibold'
    const inactiveButton = 'bg-gray-400 px-5 py-2 rounded-lg text-white font-semibold'
    return (
        <div className='flex flex-col'>
            <div className='text-2xl text-black font-bold ml-3 mb-5'>Revenue Report </div>
            <div className = 'flex flex-col bg-white py-3 px-3 space-y-8 rounded-xl border-[1px] border-gray-300 '>
                <div className='flex flex-col space-y-4'>
                    <div className='flex flex-row text-black space-x-1 items-center justify-between'>
                        <div className='flex flex-row text-black space-x-1 items-center'>
                            {permission.includes('MANAGER_HOME_VIEWS_SUPPLY') && <button className={tab===1 ? activeButton: inactiveButton} onClick={() => setTab(1)}> Import Revenue</button>}
                            {permission.includes('MANAGER_HOME_VIEWS_SELL') && <button className={tab===2 ? activeButton: inactiveButton} onClick={() => setTab(2)}> Sell Revenue </button>}
                            {/*<button className={tab===3 ? activeButton: inactiveButton} onClick={() => setTab(3)}> Total Revenue</button>*/}
                        </div>
                        <SearchBarValidateCoupleTime filter={filter}></SearchBarValidateCoupleTime>
                    </div>
                    <div>
                        {
                            (tab === 1 && permission.includes('MANAGER_HOME_VIEWS_SUPPLY')) ?
                                <ImportRevenue importHomeData={importHomeData} goToItemDetail={goToItemDetail} searchQuery={searchQuery}></ImportRevenue>
                            :
                                (tab === 2 && permission.includes('MANAGER_HOME_VIEWS_SELL')) ?
                                <div>
                                    <SellRevenue sellHomeData={sellHomeData} goToItemDetail={goToItemDetail} searchQuery={searchQuery}></SellRevenue>
                                </div>
                                :
                                <div>

                                </div>
                        }
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}
