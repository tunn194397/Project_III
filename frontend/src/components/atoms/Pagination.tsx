import {FC} from "react";
import {IMAGES} from "../../utils/images/images";
interface Props {
    pagination: any,
    setSearchQuery: any
}
const Pagination: FC<Props> = ({pagination, setSearchQuery}) => {
    const {pageSize, currentPageSize, currentPage, totalItem, totalPage} = pagination;
    const pageArray: any [] = [];
    for (let i = 1; i <= totalPage; i ++) pageArray.push(i);

    const handleNextButton = () => {
        console.log("HL")
        setSearchQuery((prevState: any) => ({
            ... prevState,
            page: (prevState.page >= totalPage) ? prevState.page : (prevState.page + 1)
        }))
    }

    const handlePrevButton = () => {
        setSearchQuery((prevState: any) => ({
            ... prevState,
            page: (prevState.page <= 1) ? prevState.page: (prevState.page - 1)
        }))
    }

    const handleChangeButton = (event: any) => {
        setSearchQuery((prevState: any) => ({
            ... prevState,
            page: Number(event.target.id)
        }))
    }
    return (
        <div className='bg-gray-100'>
            <div className='flex items-center justify-between px-8 py-3 border-b-[2px] border-gray-200' >
            <div className='text-sm font-semibold'>{(currentPage -1) * pageSize}-{(currentPage -1) * pageSize +currentPageSize} of {totalItem}</div>
                <div className='flex flex-row space-x-1'>
                    <button onClick={handlePrevButton}>
                        <svg height={20} width={20}>{IMAGES.icon.leftPaginationIcon}</svg>
                    </button>
                    {
                        (totalPage <= 6) ?
                            (<div>
                                {pageArray.map((page: number) => {
                                    const classNameOfButton = `px-3 py-0.5 font-semibold rounded-md ${page === currentPage ? 'bg-gray-400': ''}`;
                                    return <button className= {classNameOfButton} key={page} id={String(page)} onClick={handleChangeButton}> {page} </button>
                                })}
                            </div>)
                            :
                            (<div>
                                {pageArray.map((page: number) => {
                                    const isAppear = page <= 2 || page >= totalPage - 1 || (page <= currentPage - 1 && page >= currentPage + 1);
                                    const classNameOfButton = `px-3 py-0.5 font-semibold rounded-md ${page === currentPage ? 'bg-gray-400': ''} ${isAppear ? '': 'hidden'}`;
                                    return (
                                        isAppear ? <button className= {classNameOfButton} key={page}> {page} </button>
                                            : ( (page === 3 || page === totalPage -2) ?<>.</> : <></>)
                                    )
                                })}
                            </div>)
                    }

                    <button onClick={handleNextButton}>
                        <svg height={20} width={20}>{IMAGES.icon.rightPaginationIcon}</svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Pagination