import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js"

const myxlsx = {};

const lastRowIndex = (xlsx, worksheet, rowIndex, columnIndex)=>{
    const cellAddress = xlsx.utils.encode_cell( {c:columnIndex, r:rowIndex} );
    const cell = worksheet[cellAddress];
    if( cell==null ){
        return (rowIndex-1);
    } else {
        return lastRowIndex(xlsx, worksheet, (rowIndex+1), columnIndex);
    }
};

const findLastRowIndex = (xlsx, worksheet, columnIndex)=> {
    return lastRowIndex(xlsx, worksheet, 0, columnIndex);
};


const lastColumnIndex = (xlsx, worksheet, rowIndex, columnIndex)=>{
    const cellAddress = xlsx.utils.encode_cell( {c:columnIndex, r:rowIndex} );
    const cell = worksheet[cellAddress];
    if( cell==null ){
        return (columnIndex-1);
    } else {
        return lastColumnIndex(xlsx, worksheet, rowIndex, (columnIndex+1));
    }
};

const findLastColumnIndex = (xlsx, worksheet, rowIndex)=> {
    return lastColumnIndex(xlsx, worksheet, rowIndex, 0);
};

const findTargetColumnIndex = (xlsx, worksheet, columnName)=>{
    let retVal = null;

    const lastIndex = findLastColumnIndex(xlsx, worksheet, 0);

    _.each(_.range(lastIndex+1), (columnIndex)=> {
        const cellAddress = xlsx.utils.encode_cell( {c:columnIndex, r:0} );
        const cell = worksheet[cellAddress];
        if( cell!=undefined && cell.w==columnName ){
            retVal = columnIndex;
        }
    });

    return retVal;
};


myxlsx.getColumnValues = (xlsx, worksheet, columnName)=> {
    const retVal = [];
    const theColumnIndex = findTargetColumnIndex(xlsx, worksheet, columnName);

    // calculate how many rows using **the A column**.
    const lastRowIndex = findLastRowIndex(xlsx, worksheet, 0);

    // or calculate how many rows using **the current target column**.
    //const lastRowIndex = findLastRowIndex(xlsx, worksheet, theColumnIndex);

    _.each(_.range(lastRowIndex+1), (rowIndex)=>{
        const cellAddress = xlsx.utils.encode_cell( {c:theColumnIndex, r:rowIndex} );
        const cell = worksheet[cellAddress];

        if( cell && cell.w ){
            retVal.push(cell.w);
        }
        else {
            retVal.push('');
        }
    });
    return retVal;
};

export { myxlsx };
