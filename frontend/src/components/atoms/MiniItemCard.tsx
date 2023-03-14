export default function MiniItemCard(props: any) {
    const {item, goToDetail} = props;
    return (
        <div className='bg-white flex flex-col border-b-[2px] border-gray-200 px-1 py-2 items-center space-y-1 h-[150px] justify-between'  onClick={() => {goToDetail(item.id)}}>
            <div className='flex flex-col items-center'>
                <div className='px-0 py-0 overflow-hidden'>
                    <img src={item.image} className='h-[80px] rounded-lg'/>
                </div>
                <div className='font-semibold text-[9px] px-3 text-center'>
                    {item.name.slice(0,32)}
                </div>
            </div>
            <div className='flex flex-col text-center'>
                <div className='text-[9px] font-bold text-blue-700'>
                    IN: {item.importPrice.toLocaleString() + " VND"}
                </div>
                <div className='text-[9px] font-bold text-blue-700'>
                    OUT: {item.price.toLocaleString() + " VND"}
                </div>
            </div>
        </div>
    )
}