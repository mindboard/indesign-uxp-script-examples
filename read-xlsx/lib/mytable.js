import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js"

const mytable = {};

mytable.createTable = (doc, textFrame, headerRow, bodyRowList)=>{
    const tableColumnCount  = headerRow.length;
    const tableBodyRowCount = bodyRowList.length;

    const table = textFrame.tables.add({
        headerRowCount : 1,
        bodyRowCount   : tableBodyRowCount,
        columnCount    : tableColumnCount,
        width          : "80mm",
        height         : "120mm"});

    const tableHeaderRow = table.rows.item(0);
    tableHeaderRow.fillColor = doc.colors.item("Black");
    tableHeaderRow.fillTint = 30;
    
    _.each(headerRow, (headerCellValue, index)=> {
        tableHeaderRow.cells.item(index).contents = headerCellValue;
    });

    _.each(bodyRowList, (bodyRow, rowIndex)=> {
        _.each(bodyRow, (bodyCellValue, columnIndex)=> {
            const tableBodyRow = table.rows.item(rowIndex+1);
            tableBodyRow.cells.item(columnIndex).contents = bodyCellValue;
        });
    });
}

export { mytable };
