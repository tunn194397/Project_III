export default function RevenueInTime (props: any) {
    const {data} = props;
    return (
        <div className = 'flex flex-col bg-white py-3 px-3 space-y-8 rounded-xl border-[1px] border-gray-300 '>
            <div className='flex flex-col space-y-4'>
                <div className='flex flex-row text-black space-x-5 items-center'>
                    <div className='font-semibold text-lg'>
                        Revenue in time:
                    </div>
                    <div>
                        01/12/2022 - 02/12/2022
                    </div>
                </div>
                <div className='flex flex-row space-x-5'>
                    <div className="flex flex-row border-gray-200 border-[1px] px-2 py-2 rounded-lg w-5/6">
                        {
                            data.monthlyRevenue.map((e: any) => {
                                return (
                                    <div className='relative flex flex-col w-1/5 items-center' key={e.field}>
                                        <div className='font-semibold text-md text-blue-800'>{e.message}</div>
                                        <div className='absolute bottom-8 font-bold'> {e.count}</div>
                                        <div className='absolute bottom-2'> {(e.isAddition ? "+": "-") + e.value.toLocaleString() + " VND"}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='bg-blue-700 text-white px-3 py-3 border-blue-600 rounded-lg w-1/6 text-sm'>
                        <div>Total payment: </div>
                        <div>Total get: </div>
                        <div>Total debt: </div>
                        <div>Revenue: </div>
                        <div>Profit: </div>
                    </div>
                </div>
            </div>
        </div>
    )
}