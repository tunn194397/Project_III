import TableDataWithNoSearchQuery from "../../atoms/TableDataWithNoSearchQuery";
import ItemCard from "../../atoms/ItemCard";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import MiniItemCard from "../../atoms/MiniItemCard";
import BarChart from "../../atoms/BarChart";

const importHeaders = [
    {title: 'id', field: 'id', width: 5},
    {title: 'supply', field: 'supply', width: 12},
    {title: 'content', field: 'content',width: 15},
    {title: 'note', field: 'note',width: 15},
    {title: 'sale', field: 'saleOff',width: 5},
    {title: 'final price',field: 'finalPrice', width: 12},
    {title: 'time', field: 'updatedAt',width: 10}
]

const itemImportCountHeaders = [
    {title: 'product code ', field: 'productionCode',width: 10},
    {title: 'last imported time', field: 'createdAt',width: 9},
    {title: 'name', field: 'name',width: 14},
    {title: 'price', field: 'price',width: 10},
    {title: 'supply ', field: 'supply',width: 5},
    {title: 'quantity', field: 'quantity', width: 7}
]

const warehouseHeaders = [
    {title: 'product code ', field: 'productionCode',width: 10},
    {title: 'name', field: 'name',width: 14},
    {title: 'price', field: 'price',width: 10},
    {title: 'remain', field: 'remainQuantity', width: 7},
    {title: 'sole', field: 'soleQuantity', width: 7},
    {title: 'updated last time', field: 'updatedAt',width: 9},
]

export default function ImportRevenue (props: any) {
    const {importHomeData, goToItemDetail, searchQuery} = props;
    const [tab, setTab] = useState(1)
    const navigate = useNavigate()

    const goToReceiptDetail = (id: number) => {
        navigate(`/manager/items/supply/${id}`)
    }
    const goToDetail = (id: number) => {
        navigate(`/manager/items/items/${id}`)
    }

    const itemImportCountData = importHomeData?.itemImportCount.map((e: any) => {
        return {
            id: e.item.id,
            name: e.item.name,
            price: e.item.price.toLocaleString() + " VND",
            branch:  e.item.branch || 'Local branch',
            productionTime : <div>
                <div>{(new Date(Number(e.item.productionTime))).toLocaleDateString()}</div>
            </div>,
            createdAt : <div className='flex flex-col space-y-1.5'>
                <div>{(new Date(Number(e.createdAt))).toLocaleDateString()}</div>
                <div className='text-sm'>{(new Date(Number(e.createdAt))).toLocaleTimeString()}</div>
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

    const warehouseData = importHomeData?.warehouse.map((e: any) => {
        return {
            id: e.item.id,
            name: e.item.name,
            price: e.item.price.toLocaleString() + " VND",
            branch:  e.item.branch || 'Local branch',
            productionTime : <div>
                <div>{(new Date(Number(e.item.productionTime))).toLocaleDateString()}</div>
            </div>,
            updatedAt : <div className='flex flex-col space-y-1.5'>
                <div>{(new Date(Number(e.updatedAt))).toLocaleDateString()}</div>
                <div className='text-sm'>{(new Date(Number(e.updatedAt))).toLocaleTimeString()}</div>
            </div>,

            type: <div className='flex flex-row items-center text-xs space-x-1'>
                <div>{e.item.type}</div>
                <div>({e.item.branch})</div>
            </div>,

            productionCode: <div>
                <div>{e.item.productionCode}</div>
                <div>{e.item.type}</div>
            </div>,
            remainQuantity: e.remainQuantity,
            soleQuantity: e.soleQuantity
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
                </div>
                <div>
                    <button className='bg-green-600 rounded-lg px-4 py-2 text-white font-bold ring-green-300 ring-2 hover:ring-4 ' > Download Report </button>
                </div>
            </div>

            <div className='w-full px-3 py-3 space-y-5 flex flex-col'>
                <div className='text-lg font-semibold'>
                    Monthly import revenue report:
                </div>
                <div className='border-2 px-5 py-3 bg-gray-100 rounded-md h-full'>
                    <BarChart chartName={
                        "Quantity and Value of items imported in the last 12 months"
                    }
                              data={
                                  {
                                      labels: importHomeData?.monthlyData.map((e: any) => {return `${e.month}/${e.year}` }),
                                      datasets: [
                                          {
                                              label: 'Quantity of import receipts',
                                              data: importHomeData?.monthlyData.map((e: any) => {return e.monthReceiptQty}),
                                              backgroundColor: 'green',
                                          },
                                          {
                                              label: 'Quantity of import items (10 items)',
                                              data: importHomeData?.monthlyData.map((e: any) => {return e.monthItemQty/10}),
                                              backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                          },
                                          {
                                              label: 'Value (100,000,000 VND)',
                                              data: importHomeData?.monthlyData.map((e: any) => {return e.monthValue/100000000}),
                                              backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                          },
                                      ],
                                  }
                              }/>
                </div>
            </div>
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'>
                    Items with maximum/minimum quantity import:
                </div>
                <div className='grid grid-cols-5 px-5 gap-4'>
                    <div className='flex flex-col space-y-3 col-span-2'>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Maximum quantity: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    importHomeData?.itemsMaxCount?.slice(0,3).map((e: any) => {
                                        const price = e.item.price;
                                        return (
                                            <div key={e.itemId} className='flex flex-col items-center space-y-1.5 border-2 border-gray-200 rounded-lg'>
                                                <MiniItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></MiniItemCard>
                                                <div className='text-[9px] font-semibold mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * price).toLocaleString() + " VND"}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Minimum quantity: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    importHomeData?.itemsMinCount?.slice(0,3).map((e: any) => {
                                        const price = e.item.price;
                                        return (
                                            <div key={e.itemId} className='flex flex-col items-center space-y-1.5 border-2 border-gray-200 rounded-lg'>
                                                <MiniItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></MiniItemCard>
                                                <div className='text-[9px] font-semibold mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * price).toLocaleString() + " VND"}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='border-2 px-5 py-3 bg-gray-100 rounded-md h-full'>
                            <BarChart chartName={
                                                "Quantity of items imported " +
                                                `(From ${new Date(Number(searchQuery.startedAt)).toLocaleDateString()} to ${new Date(Number(searchQuery.finishedAt)).toLocaleDateString()})`
                                            }
                                      data={
                                        {
                                            labels: importHomeData?.itemImportCount.sort((a: any,b: any) => {
                                                if (a.quantity > b.quantity) return -1
                                                else return 1
                                            }).slice(0,15).map((e: any) => {return e.itemId}),
                                            datasets: [
                                                {
                                                    label: 'Quantity (items)',
                                                    data: importHomeData?.itemImportCount.sort((a: any,b: any) => {
                                                        if (a.quantity > b.quantity) return -1
                                                        else return 1
                                                    }).slice(0,15).map((e: any) => {return e.quantity}),
                                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                }
                                            ],
                                        }
                            }/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'>
                    Items with maximum/minimum value import:
                </div>
                <div className='grid grid-cols-5 px-5 gap-4'>
                    <div className='flex flex-col space-y-3 col-span-2'>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Maximum value: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    importHomeData?.itemsMaxValue?.slice(0,3).map((e: any) => {
                                        const price = e.item.price;
                                        return (
                                            <div key={e.itemId} className='flex flex-col items-center space-y-1.5 border-2 border-gray-200 rounded-lg'>
                                                <MiniItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></MiniItemCard>
                                                <div className='text-[9px] font-semibold mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * price).toLocaleString() + " VND"}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Minimum value: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    importHomeData?.itemsMaxValue?.slice(0,3).map((e: any) => {
                                        const price = e.item.price;
                                        return (
                                            <div key={e.itemId} className='flex flex-col items-center space-y-1.5 border-2 border-gray-200 rounded-lg'>
                                                <MiniItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></MiniItemCard>
                                                <div className='text-[9px] font-semibold mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * price).toLocaleString() + " VND"}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='border-2 px-5 py-3 bg-gray-100 rounded-md h-full'>
                            <BarChart chartName={
                                "Value of items imported " +
                                `(From ${new Date(Number(searchQuery.startedAt)).toLocaleDateString()} to ${new Date(Number(searchQuery.finishedAt)).toLocaleDateString()})`
                            }
                                      data={
                                          {
                                              labels: importHomeData?.itemImportCount.sort((a: any,b: any) => {
                                                  if (a.quantity * a.item.price> b.quantity * b.item.price) return -1
                                                  else return 1
                                              }).slice(0,15).map((e: any) => {return e.itemId}),
                                              datasets: [
                                                  {
                                                      label: 'Value (VND)',
                                                      data: importHomeData?.itemImportCount.sort((a: any,b: any) => {
                                                          if (a.quantity * a.item.price> b.quantity * b.item.price) return -1
                                                          else return 1
                                                      }).slice(0,15).map((e: any) => {return e.quantity * e.item.price}),
                                                      backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                                  },
                                              ],
                                          }
                                      }/>
                        </div>
                    </div>
                </div>
            </div>
            {
                <div className='flex flex-col space-y-5'>
                    <div className='text-lg font-semibold'>Import receipts in time: </div>
                    <TableDataWithNoSearchQuery headers={importHeaders} data={importHomeData.receipts} goToDetail={goToReceiptDetail}></TableDataWithNoSearchQuery>
                </div>
            }
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'> Items Imported in time</div>
                <TableDataWithNoSearchQuery headers={itemImportCountHeaders} data={itemImportCountData} goToDetail={goToDetail}></TableDataWithNoSearchQuery>
            </div>

            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'> Warehouse Status </div>
                <TableDataWithNoSearchQuery headers={warehouseHeaders} data={warehouseData} goToDetail={goToDetail}></TableDataWithNoSearchQuery>
            </div>
        </div>
    )
}