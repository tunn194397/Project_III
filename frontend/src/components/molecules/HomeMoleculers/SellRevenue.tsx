import TableDataWithNoSearchQuery from "../../atoms/TableDataWithNoSearchQuery";
import {useNavigate} from "react-router-dom";
import MiniItemCard from "../../atoms/MiniItemCard";
import BarChart from "../../atoms/BarChart";

const sellHeaders = [
    {title: 'id', field: 'id', width: 2},
    {title: 'customer', field: 'customer',width: 14},
    {title: 'staff', field: 'staff',width: 14},
    {title: 'content', field: 'content',width: 14},
    {title: 'total price',field: 'totalPrice', width: 12},
    {title: 'sale ', field: 'saleOff',width: 5},
    {title: 'final price',field: 'finalPrice', width: 12},
    {title: 'time', field: 'updatedAt',width: 10}
]

const itemSellCountHeaders = [
    {title: 'product code ', field: 'productionCode',width: 10},
    {title: 'product time', field: 'productionTime',width: 9},
    {title: 'name', field: 'name',width: 14},
    {title: 'price', field: 'price',width: 10},
    {title: 'quantity', field: 'quantity', width: 7}
]


export default function SellRevenue (props: any) {
    const {sellHomeData, goToItemDetail, searchQuery} = props;
    const receiptsData = sellHomeData.receipts;
    const navigate = useNavigate()

    const goToReceiptDetail = (id: number) => {
        navigate(`/manager/items/supply/${id}`)
    }

    const itemSellCountData = sellHomeData?.itemSellCount?.map((e: any) => {
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
                        <div className='text-semibold'> Total item sole value: {sellHomeData.value?.toLocaleString() + " VND"}</div>
                    </div>
                </div>
                <div>
                    <button className='bg-green-600 rounded-lg px-4 py-2 text-white font-bold ring-green-300 ring-2 hover:ring-4 ' > Download Report </button>
                </div>
            </div>

            <div className='w-full px-3 py-3 space-y-5 flex flex-col'>
                <div className='text-lg font-semibold'>
                    Monthly sell revenue report:
                </div>
                <div className='border-2 px-5 py-3 bg-gray-100 rounded-md h-full'>
                    <BarChart chartName={
                        "Quantity and Value of items sole in the last 12 months"
                    }
                              data={
                                  {
                                      labels: sellHomeData?.monthlyData?.map((e: any) => {return `${e.month}/${e.year}` }),
                                      datasets: [
                                          {
                                              label: 'Quantity of sole receipts',
                                              data: sellHomeData?.monthlyData?.map((e: any) => {return e.monthReceiptQty}),
                                              backgroundColor: 'green',
                                          },
                                          {
                                              label: 'Quantity of sole items (10 items)',
                                              data: sellHomeData?.monthlyData?.map((e: any) => {return e.monthItemQty/10}),
                                              backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                          },
                                          {
                                              label: 'Value (100,000,000 VND)',
                                              data: sellHomeData?.monthlyData?.map((e: any) => {return e.monthValue/100000000}),
                                              backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                          },
                                      ],
                                  }
                              }/>
                </div>
            </div>
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'>
                    Items with maximum/minimum quantity sole:
                </div>
                <div className='grid grid-cols-5 px-5 gap-4'>
                    <div className='flex flex-col space-y-3 col-span-2'>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Maximum quantity: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    sellHomeData?.itemsMaxCount?.slice(0,3).map((e: any) => {
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
                                    sellHomeData?.itemsMinCount?.slice(0,3).map((e: any) => {
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
                                "Quantity of items sole " +
                                `(From ${new Date(Number(searchQuery.startedAt)).toLocaleDateString()} to ${new Date(Number(searchQuery.finishedAt)).toLocaleDateString()})`
                            }
                                      data={
                                          {
                                              labels: sellHomeData?.itemSellCount?.sort((a: any,b: any) => {
                                                  if (a.quantity > b.quantity) return -1
                                                  else return 1
                                              }).slice(0,15).map((e: any) => {return e.itemId}),
                                              datasets: [
                                                  {
                                                      label: 'Quantity (items)',
                                                      data: sellHomeData?.itemSellCount?.sort((a: any,b: any) => {
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
                    Items with maximum/minimum value sole:
                </div>
                <div className='grid grid-cols-5 px-5 gap-4'>
                    <div className='flex flex-col space-y-3 col-span-2'>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Maximum value: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    sellHomeData?.itemsMaxValue?.slice(0,3).map((e: any) => {
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
                                    sellHomeData?.itemsMinValue?.slice(0,3).map((e: any) => {
                                        const price = e.item.price;
                                        return (
                                            <div key={e.itemId} className='flex flex-col items-center space-y-1.5 border-2 border-gray-200 rounded-lg'>
                                                <MiniItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></MiniItemCard>
                                                <div className='text-[9px] font-semibold mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * (e.item.price - e.item.importPrice)).toLocaleString() + " VND"}</div>
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
                                "Value of items sole " +
                                `(From ${new Date(Number(searchQuery.startedAt)).toLocaleDateString()} to ${new Date(Number(searchQuery.finishedAt)).toLocaleDateString()})`
                            }
                                      data={
                                          {
                                              labels: sellHomeData?.itemSellCount?.sort((a: any,b: any) => {
                                                  if (a.quantity * a.item.price> b.quantity * b.item.price) return -1
                                                  else return 1
                                              }).slice(0,15).map((e: any) => {return e.itemId}),
                                              datasets: [
                                                  {
                                                      label: 'Value (VND)',
                                                      data: sellHomeData?.itemSellCount?.sort((a: any,b: any) => {
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
            <div className='flex flex-col space-y-5'>
                <div className='text-lg font-semibold'>
                    Items with maximum/minimum profit:
                </div>
                <div className='grid grid-cols-5 px-5 gap-4'>
                    <div className='flex flex-col space-y-3 col-span-2'>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Maximum profit: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    sellHomeData?.itemsMaxProfit?.slice(0,3).map((e: any) => {
                                        const price = e.item.price;
                                        return (
                                            <div key={e.itemId} className='flex flex-col items-center space-y-1.5 border-2 border-gray-200 rounded-lg'>
                                                <MiniItemCard item={e.item} key={e.itemId} goToDetail={goToItemDetail}></MiniItemCard>
                                                <div className='text-[9px] font-semibold mx-auto'>Quantity: {e.quantity} ~ {(e.quantity * (e.item.price - e.item.importPrice)).toLocaleString() + " VND"}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 w-full'>
                            <div className='text-sm font-semibold text-orange-600'>Minimum profit: </div>
                            <div className=' grid grid-cols-3 gap-2'>
                                {
                                    sellHomeData?.itemsMinProfit?.slice(0,3).map((e: any) => {
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
                                "Value of items sole " +
                                `(From ${new Date(Number(searchQuery.startedAt)).toLocaleDateString()} to ${new Date(Number(searchQuery.finishedAt)).toLocaleDateString()})`
                            }
                                      data={
                                          {
                                              labels: sellHomeData?.itemSellCount?.sort((a: any,b: any) => {
                                                  if (a.quantity * (a.item.price - a.item.importPrice)> b.quantity* (b.item.price - b.item.importPrice)) return -1
                                                  else return 1
                                              }).slice(0,15).map((e: any) => {return e.itemId}),
                                              datasets: [
                                                  {
                                                      label: 'Value (VND)',
                                                      data: sellHomeData?.itemSellCount?.sort((a: any,b: any) => {
                                                          if (a.quantity * (a.item.price - a.item.importPrice)> b.quantity* (b.item.price - b.item.importPrice)) return -1
                                                          else return 1
                                                      }).slice(0,15).map((e: any) => {return e.quantity * (e.item.price - e.item.importPrice)}),
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
                    <div className='text-lg font-semibold'>Sell receipts in time: </div>
                    <TableDataWithNoSearchQuery headers={sellHeaders} data={receiptsData} goToDetail={goToReceiptDetail}></TableDataWithNoSearchQuery>
                </div>
            }
            <div className='flex flex-col space-y-2'>
                <div className='text-lg font-semibold'> Items sole in time</div>
                <TableDataWithNoSearchQuery headers={itemSellCountHeaders} data={itemSellCountData} goToDetail={goToItemDetail}></TableDataWithNoSearchQuery>
            </div>
        </div>
    )
}