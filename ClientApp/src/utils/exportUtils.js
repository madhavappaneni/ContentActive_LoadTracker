import saveAs from 'file-saver';

export const saveFile = (workbook) => {
    workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
    });
};
