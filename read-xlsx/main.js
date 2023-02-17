
import * as xlsx from 'https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs';
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js"
import { myxlsx } from "./lib/myxlsx.js"
import { mytable } from "./lib/mytable.js"

const toRowList = (worksheet)=> {
    const idValues = myxlsx.getColumnValues(xlsx, worksheet, 'id');
    const nameValues = myxlsx.getColumnValues(xlsx, worksheet, 'name');
    const typeValues = myxlsx.getColumnValues(xlsx, worksheet, 'type');
    return _.zip(idValues, nameValues, typeValues);
};


const storage = require("uxp").storage;
const fs = storage.localFileSystem;
const file = await fs.getFileForOpening({ types: ['xlsx'] });
if( file!=null ){
    const data = await file.read({format: storage.formats.binary});
    const readOptions = { type: 'array' };
    const workbook = xlsx.read(data, readOptions);
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetNames[0]];

    const rowList = toRowList(worksheet);

    if( rowList.length>1 ){
        const params = {};
        params.documentPreferences = {
            pageWidth   : "210mm",
            pageHeight  : "297mm",
            facingPages : false};
    
        const doc = app.documents.add(params);

        const page = doc.pages.item(0);
        page.marginPreferences.properties = {
            top    : "10mm",
            left   : "10mm",
            bottom : "10mm",
            right  : "10mm"};
        
        const textFrame = page.textFrames.add({
            geometricBounds : ["10mm","10mm","287mm","200mm"] // top,left,bottom,right
        });

        const headerRow   = _.head(rowList);
        const bodyRowList = _.tail(rowList);
        mytable.createTable(doc, textFrame, headerRow, bodyRowList);
    }
}
