export const GetTableData = (headers: any, data: any) => {
    const result: any[] = [];
    data.map((row: any) => {
        const resultRow: any [] = [];
        (headers.map((header: any) => {
            if (Object.prototype.hasOwnProperty.call(row, header.field)) {
                if (header.type == 'image') {
                    resultRow.push("image?" + row[header.field])
                }
                else resultRow.push(row[header.field])
            }
            else if (header.field !== '') resultRow.push('-')
        }))
        result.push(resultRow)
    })
    return result;
};