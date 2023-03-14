
export default function ItemCard(props: any) {
    const {item, goToDetail} = props;
    return (
        <div className='relative bg-white flex flex-col border-[2px] border-gray-200 hover:ring-4 hover:ring-blue-200 hover:shadow-md rounded-lg px-1 pb-8 pt-2 rounded-lg items-center space-y-1 h-[300px]' onClick={() => {goToDetail(item.id)}}>
            <div className='px-0 py-0 overflow-hidden'>
                <img src={item.image} className='h-[180px] rounded-lg'/>
                <hr className='border-[1px]'/>
            </div>
            <div className='font-semibold text-sm px-3 text-center'>
                {item.name}
            </div>
            <div className='text-xs px-3 text-center'>
                {item.content}
            </div>
            <div className='absolute bottom-2 font-bold px-3 text-blue-700'>
                {item.price.toLocaleString() + " VND"}
            </div>
        </div>
    )
}