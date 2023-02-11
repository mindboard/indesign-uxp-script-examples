const ind = {};

ind.createDocObject = (params)=>{
    const pageWidth = params.pageWidth;
    const pageHeight = params.pageHeight;
    const margin = params.margin;

    const docParams = {
        documentPreferences : {
            pageWidth   : `${pageWidth}mm`,
            pageHeight  : `${pageHeight}mm`,
            facingPages : false
        },
        cjkGridPreferences : {
            showAllLayoutGrids : false
        }
    };
    const doc = app.documents.add(docParams);

    const page = doc.pages.item(0);
    page.marginPreferences.properties = {
        top    : `${margin.top}mm`,
        left   : `${margin.left}mm`,
        bottom : `${margin.bottom}mm`,
        right  : `${margin.right}mm`
    };

    const textFrameParams = {
        geometricBounds: [
            `${margin.top}mm`, // top
            `${margin.left}mm`, // left
            `${pageHeight - margin.bottom}mm`, // bottom
            `${pageWidth - margin.right}mm` // right
        ]
    };
    const textFrame = page.textFrames.add(textFrameParams);

    return {
        doc: doc,
        page: page,
        textFrame: textFrame
    };
};

export { ind };
