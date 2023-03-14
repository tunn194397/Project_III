import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {GetTableData} from "../../utils/functions/getTableData";
interface Props {
    headers: any;
    data: any;
    goToDetail: any
}

const TableDataWithNoSearchQuery: FC<Props> = ({ headers, data, goToDetail }) =>  {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col'>
            <table className='w-full rounded-md '>
                <thead className='capitalize bg-blue-200 '>
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
                            <tr key={index} className='bg-white hover:bg-blue-50' onClick={()=> goToDetail(data[index].id)}>
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