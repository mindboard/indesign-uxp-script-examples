import { ind } from "./lib/ind.js"

declare var require: any
declare var app: any

const ufs = require('uxp').storage.localFileSystem
const file = await ufs.getFileForOpening({ types: ['md'] })
if( file!=null ){
    const text = await file.read()

    const params = {
        pageWidth: 148,
        pageHeight: 210,
        margin: {
            top: 10,
            left: 10,
            bottom: 10,
            right: 10
        }
    }

    const docObject = ind.createDocObject(params)
    const textFrame = docObject.textFrame
    textFrame.contents = text
}
