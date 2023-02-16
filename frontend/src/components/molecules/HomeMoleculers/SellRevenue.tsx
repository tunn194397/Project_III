import TableDataWithNoSearchQuery from "../../atoms/TableDataWithNoSearchQuery";
import ItemCard from "../../atoms/ItemCard";
import {useState} from "react";

const sellHeaders = [
    {title: 'id', field: 'id', width: 2},
    {title: 'customer', field: 'customer',width: 14},
    {title: 'staff', field: 'staff',width: 14},
    {title: 'content', field: 'content',width: 14},
    {title: 'total price',field: 'totalPrice', width: 12},
    {title: 'sale ', field: 'saleOff',width: 5},
    {title: 'final price',field: 'finalPrice', width: 12},
    {title: 'time', field: 'updatedAt',width: 10},
    {title: 'action', field: '',width: 5},
]

const itemSellCountHeaders = [
    {title: 'product code ', field: 'productionCode',width: 10},
    {title: 'product time', field: 'productionTime',width: 9},
    {title: 'name', field: 'name',width: 14},
    {title: 'price', field: 'price',width: 10},
    {title: 'quantity', field: 'quantity', width: 7},
    {title: 'action', field: '',width: 5},
]

export default function SellRevenue (props: any) {
    const {sellHomeData, goToItemDetail} = props;
    const [openTable, setOpenTable] = useState(false)

    const receiptsData = sellHomeData.receipts;

    const itemSellCountData = sellHomeData?.itemSellCount.map((e: any) => {
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
                        <div className='text-semibold'> Total receipt quantity: {sellHomeData.countReceipt} (receipts)</div>
                        <div className='text-semibold'> Total item sole quantity: {sellHomeData.itemSellQuantity} (items) </div>
                        <div className='text-semibold'> Total item sole value: {sellHomeData.value.toLocaleString() + " VND"}</div>
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
                    <TableDataWithNoSearchQuery headers={sellHeaders} data={receiptsData}></TableDataWithNoSearchQuery>
                </div>
            }
            <hr/>

            <div className='flex flex-col space-y-2'>
                <div className='text-lg font-semibold'> Items sole in time</div>
                <TableDataWithNoSearchQuery headers={itemSellCountHeaders} data={itemSellCountData}></TableDataWithNoSearchQuery>
            </div>
            <hr/>
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'>
                    Items with maximum quantity sole:
                </div>
                <div className='grid grid-cols-5 space-x-2'>
                    {
                        sellHomeData?.itemsMaxCount?.map((e: any) => {
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
                    Items with maximum value sole:
                </div>
                <div className='grid grid-cols-5 space-x-2'>
                    {
                        sellHomeData?.itemsMaxValue?.map((e: any) => {
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