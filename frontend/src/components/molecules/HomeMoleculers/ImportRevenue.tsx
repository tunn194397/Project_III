import TableDataWithNoSearchQuery from "../../atoms/TableDataWithNoSearchQuery";
import ItemCard from "../../atoms/ItemCard";
import {useState} from "react";

const importHeaders = [
    {title: 'id', field: 'id', width: 5},
    {title: 'supply', field: 'supply', width: 12},
    {title: 'content', field: 'content',width: 15},
    {title: 'note', field: 'note',width: 15},
    {title: 'sale', field: 'saleOff',width: 5},
    {title: 'final price',field: 'finalPrice', width: 12},
    {title: 'time', field: 'updatedAt',width: 10},
    {title: 'action', field: '',width: 5},
]

const itemImportCountHeaders = [
    {title: 'product code ', field: 'productionCode',width: 10},
    {title: 'product time', field: 'productionTime',width: 9},
    {title: 'name', field: 'name',width: 14},
    {title: 'price', field: 'price',width: 10},
    {title: 'supply ', field: 'supply',width: 5},
    {title: 'quantity', field: 'quantity', width: 7},
    {title: 'action', field: '',width: 5},
]

export default function ImportRevenue (props: any) {
    const {importHomeData, goToItemDetail} = props;
    const [openTable, setOpenTable] = useState(false)

    const itemImportCountData = importHomeData?.itemImportCount.map((e: any) => {
        console.log("EEE", e)
        return {
            name: e.item.name,
            price: e.item.price.toLocaleString() + " VND",
            branch:  e.item.branch || 'Local branch',
            productionTime : <div>
                <div>{(new Date(Number(e.item.productionTime))).toLocaleDateString()}</div>
            </div>,

            type: <div className='flex flex-row items-center text-xs space-x-1'>
                <div>{e.item.type}</div>
                <div>({e.item.branch})</div>
            </div>,

            productionCode: <div>
                <div>{e.item.productionCode}</div>
                <div>{e.item.type}</div>
            </div>,
            supply: e.item.supply?.name,
            quantity: e.quantity
        }

    })
    return (
        <div className='flex flex-col space-y-14 py-14 px-3'>
            <div className='flex flex-row justify-between'>
                <div className='space-y-3 w-1/2 border-[2px] border-gray-200 px-5 py-2 rounded-lg'>
                    <div className='text-xl font-semibold underline'> Main Report</div>
                    <div className='flex flex-col space-y-2 '>
                        <div className='text-semibold'> Total receipt quantity: {importHomeData.countReceipt} (receipts)</div>
                        <div className='text-semibold'> Total item imported quantity: {importHomeData.itemImportQuantity} (items) </div>
                        <div className='text-semibold'> Total item imported value: {importHomeData.value.toLocaleString() + " VND"}</div>
                    </div>
                    {
                        !openTable && <div>
                            <button className='bg-white rounded-md py-1 text-gray-800 font-bold ' onClick={() => setOpenTable(true)}> See total receipt </button>
                        </div>
                    }
                    {
                        openTable && <div>
                            <button className='bg-white rounded-md py-1 text-gray-800 font-bold ' onClick={() => setOpenTable(false)}> Collapse </button>
                        </div>
                    }
                </div>
                <div>
                    <button className='bg-green-600 rounded-lg px-4 py-2 text-white font-bold ring-green-300 ring-2 hover:ring-4 ' > Download Report </button>
                </div>
            </div>
            {
                openTable && <div>
                    <TableDataWithNoSearchQuery headers={importHeaders} data={importHomeData.receipts}></TableDataWithNoSearchQuery>
                </div>
            }
            <hr/>

            <div className='flex flex-col space-y-2'>
                <div className='text-lg font-semibold'> Items Imported in time</div>
                <TableDataWithNoSearchQuery headers={itemImportCountHeaders} data={itemImportCountData}></TableDataWithNoSearchQuery>
            </div>
            <hr/>
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'>
                    Items with maximum quantity import:
                </div>
                <div className='grid grid-cols-5 space-x-2'>
                    {
                        importHomeData?.itemsMaxCount?.map((e: any) => {
                            const price = e.item.price;
                            return (
                                <div key={e.itemId} className='flex flex-col space-y-3'>
                                    <ItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></ItemCard>
                                    <div className='mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * price).toLocaleString() + " VND"}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <hr/>
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'>
                    Items with maximum value import:
                </div>
                <div className='grid grid-cols-5 space-x-2'>
                    {
                        importHomeData?.itemsMaxValue?.map((e: any) => {
                            const price = e.item.price;
                            return (
                                <div key={e.itemId} className='flex flex-col space-y-3'>
                                    <ItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></ItemCard>
                                    <div className='mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * price).toLocaleString() + " VND"}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}