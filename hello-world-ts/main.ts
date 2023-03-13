/// <reference types="./ind.d.ts" />

const getFirstPage = (doc: Document): Page => {
    return doc.pages.item(0)
}

const createDocument = (params: any): Document =>{
    const pageWidth = params.pageWidth
    const pageHeight = params.pageHeight
    const margin = params.margin

    const docParams = {
        documentPreferences : {
            pageWidth   : `${pageWidth}mm`,
            pageHeight  : `${pageHeight}mm`,
            facingPages : false
        },
        cjkGridPreferences : {
            showAllLayoutGrids : false
        }
    }

    const doc = app.documents.add(docParams)
    const page = getFirstPage(doc)
    page.marginPreferences.properties = {
        top    : `${margin.top}mm`,
        left   : `${margin.left}mm`,
        bottom : `${margin.bottom}mm`,
        right  : `${margin.right}mm`
    }

    return doc
}

const createTextFrame = (page: Page, params: any): TextFrame =>{
    const textFrameParams = {
        geometricBounds: [
            `${params.top}mm`, // top
            `${params.left}mm`, // left
            `${params.bottom}mm`, // bottom
            `${params.right}mm` // right
        ]
    }

    return page.textFrames.add(textFrameParams)
}


// ----------------------
// main
// ----------------------

const params = {
    pageWidth: 50,
    pageHeight: 50,
    margin: {
        top: 5,
        left: 5,
        bottom: 5,
        right: 5
    }
}

const doc = createDocument(params)
const page = getFirstPage(doc)
const textFrame = createTextFrame(page, {
    top: 5,
    left: 5,
    bottom: 15,
    right: 40})

textFrame.contents = 'Hello, World!'
