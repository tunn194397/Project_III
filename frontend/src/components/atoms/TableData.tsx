import {FC} from "react";
import Pagination from "./Pagination";
import {IMAGES} from "../../utils/images/images";
import {useNavigate} from "react-router-dom";
import {GetTableData} from "../../utils/functions/getTableData";
interface Props {
    headers: any;
    data: any;
    pagination: any;
    setSearchQuery: any
}

const TableData: FC<Props> = ({ headers, data, pagination, setSearchQuery }) =>  {
    const navigate = useNavigate()
    const goToDetail = (id: number) => {
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = (window.location.href).substring(length || 22)
        navigate(`/${path}/${id}`)
    }
    const handleDownButton = (event: any) => {
        const field = event.currentTarget.id;
        setSearchQuery((prevState: any) => ({
            ... prevState,
            orderField: field,
            orderBy: 'DESC'
        }))
    }
    const handleUpButton = (event: any) => {
        const field = event.currentTarget.id;
        setSearchQuery((prevState: any) => ({
            ... prevState,
            orderField: field,
            orderBy: 'ASC'
        }))
    }

    return (
        <div className='flex flex-col mx-2 border-[1px] border-gray-200'>
            <table className='w-full rounded-md'>
                <thead className='capitalize bg-blue-300 '>
                    <tr>
                        {
                            headers.map((header: any, index: number) => {
                                return (
                                    <th className="py-2 px-4 border-y border-gray-300 text-black" key={'header-'+ index} style={{width: `${header.width}%`}}>
                                        <div className='flex flex-row space-x-1.5 items-center'>
                                            {( header.title !== 'action' && header.type !== 'image') ?
                                                <div className="flex flex-col space-y-0 ">
                                                    <button onClick={handleUpButton} id={header.field}>
                                                        <svg height={8} width={8}>{IMAGES.icon.tableUpSortItem}</svg>
                                                    </button>
                                                    <button onClick={handleDownButton} id={header.field}>
                                                        <svg height={8} width={8}>{IMAGES.icon.tableDownSortItem}</svg>
                                                    </button>
                                                </div>
                                                : <></>
                                            }
                                            <div>{header.title}</div>
                                        </div>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    (GetTableData(headers, data)).map((row: any, index: number) => {
                        return (
                            <tr key={index} className='bg-white hover:bg-blue-50' onClick={()=> goToDetail(row[0])}>
                                {row.map((e: any, indexOfData: number) => {
                                    return (
                                        (String(e).substring(0,6) !=='image?')
                                            ?
                                                <td scope="col" className={`py-2 pl-6 border-y border-gray-300 text-start`} key={index + '-' + indexOfData}>
                                                    {e}
                                                </td>
                                            :
                                                <td scope="col" className={`py-2 pl-6 border-y border-gray-300 text-start`} key={index + '-' + indexOfData}>
                                                    <img src={(String(e)).substring(6)} className='h-[80px]'></img>
                                                </td>
                                    )
                                })}
                                {/*<td  scope="col" className="py-2 border-y">*/}
                                {/*    <button*/}
                                {/*        className='bg-blue-600 px-3 py-1 rounded font-semibold text-white hover:ring-4 hover:ring-blue-300'*/}
                                {/*        onClick={()=> goToDetail(row[0])}*/}
                                {/*    >*/}
                                {/*        Detail*/}
                                {/*    </button>*/}
                                {/*</td>*/}
                            </tr>
                        )
                    })
                }
                </tbody >
            </table>
            {!data.length ?
                <div className='flex flex-row items-center justify-center w-full font-semibold text-lg py-20'>
                    <div>No data.</div>
                </div>
                : <></>
            }
            <Pagination pagination={pagination} setSearchQuery={setSearchQuery}></Pagination>
        </div>
    );
}

export default TableData