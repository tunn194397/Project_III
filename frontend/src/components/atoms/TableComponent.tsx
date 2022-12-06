import {FC} from "react";

interface Props {
    headers: any;
    datas: any;
}

const TableComponent: FC<Props> = ({ headers, datas}) => {
    return (
        <div className = ' flex items-center w-full bg-white rounded-md mt-7 px-2 py-2'>
            <table className='w-full m-2 rounded-md '>
                <thead className='uppercase bg-blue-400 '>
                    <tr>
                        {
                            headers.map((header: any, index: number) => {
                                return (<th scope="col" className="py-2 px-2 border" key={'header -' + index} style={{width: `${header.width}%`}}>
                                    {header.title}
                                </th>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        datas.map((data: any, index: number) => {
                            return (
                                <tr key={index} className='bg-white hover:bg-gray-100'>
                                    {data.map((e: any, indexOfData: number) => {
                                        return (<td scope="col" className="py-2 px-2 border" key={index + '-' + indexOfData}>
                                            {e}
                                        </td>)
                                    })}
                                    <td  scope="col" className="py-3 px-6 border">
                                        <button className='bg-blue-500 px-2 py-1 rounded font-semibold text-white  hover:bg-blue-600'> Detail </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent