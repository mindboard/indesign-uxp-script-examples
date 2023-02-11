const style = {};

style.getDefaultParagraphStyle = (doc)=>{
    return doc.paragraphStyles[0];
};

style.psExists = (doc, name)=>{
    const ps = doc.paragraphStyles.item(name);
    var retVal = false;
    try {
        ps.name;
        retVal = true;
    }
    catch (err){}
    return retVal;
};

style.csExists = (doc, name)=>{
    const cs = doc.characterStyles.item(name);
    var retVal = false;
    try {
        cs.name;
        retVal = true;
    }
    catch (err){}
    return retVal;
}

style.getArialParagraphStyle = (doc, fontSize)=>{
    const name = `Arial${fontSize}`;

    if( style.psExists(doc, name) ){
        return doc.paragraphStyles.item(name);
    }
    else {
        const ps = doc.paragraphStyles.add({name: name});
        ps.appliedFont = 'Arial';
        ps.fontStyle = 'Regular';
        ps.pointSize = `${fontSize}`;

        return ps;
    }
};

style.getListItemParagraphStyle = (doc, basePs)=>{
    const name = `ListItem${basePs.name}`;

    if( style.psExists(doc, name) ){
        return doc.paragraphStyles.item(name);
    }
    else {
        const listItemPsParams = {
            name: name,
            basedOn: basePs,
            bulletsAlignment: StaticAlignmentOptions.LEFT_ALIGN, 
            bulletChar: {
                characterType: BulletCharacterType.UNICODE_ONLY,
                characterValue: 8226
            },
            bulletsAndNumberingListType: ListType.BULLET_LIST,
            leftIndent: '5mm',
            firstLineIndent: '-5mm'
        };
        return doc.paragraphStyles.add(listItemPsParams);
    }
};

style.getDefaultCharacterStyle = (doc)=>{
    return doc.characterStyles.item(0);
};

style.getBoldCharacterStyle = (doc)=>{
    const name = 'Bold';
    if( style.csExists(doc,name) ){
        return doc.characterStyles.item(name);
    }
    else {
        const boldCsParams = {
            name: name,
            fontStyle: 'Bold'
        };
        return doc.characterStyles.add(boldCsParams);
    }

    /*
    const cs = doc.characterStyles.itemByName(name);
    if( cs!=null ){
        return cs;
    }
    else {
        const boldCsParams = {
            name: name,
            fontStyle: 'Bold'
        };
        return doc.characterStyles.add(boldCsParams);
    }
    */
};

style.getItalicCharacterStyle = (doc)=>{
    const name = 'Italic';
    if( style.csExists(doc,name) ){
        return doc.characterStyles.item(name);
    }
    else {
        const italicCsParams = {
            name: name,
            fontStyle: 'Italic'
        };
        return doc.characterStyles.add(italicCsParams);
    }
};

export { style };
