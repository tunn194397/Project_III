import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {GetTableData} from "../../utils/functions/getTableData";
interface Props {
    headers: any;
    data: any;
}

const TableDataWithNoSearchQuery: FC<Props> = ({ headers, data }) =>  {
    const navigate = useNavigate()
    const goToDetail = (id: number) => {
        const length = (process.env.REACT_APP_MANAGER_ROOT_URL)?.length;
        const path = (window.location.href).substring(length || 22)
        navigate(`/${path}/${id}`)
    }

    return (
        <div className='flex flex-col'>
            <table className='w-full rounded-md '>
                <thead className='capitalize bg-gray-100 '>
                <tr>
                    {
                        headers.map((header: any, index: number) => {
                            return (
                                <th className="py-2 px-4 border-y border-gray-300 text-black" key={'header-'+ index} style={{width: `${header.width}%`}}>
                                    <div className='flex flex-row space-x-1.5 items-center'>
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
                            <tr key={index} className='bg-white'>
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
                                <td  scope="col" className="py-2 border-y">
                                    <button
                                        className='bg-blue-600 px-3 py-1 rounded font-semibold text-white hover:ring-4 hover:ring-blue-300'
                                        onClick={()=> goToDetail(row[0])}
                                    >
                                        Detail
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody >
            </table>
        </div>
    );
}

export default TableDataWithNoSearchQuery