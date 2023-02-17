import { ind } from "./lib/ind.js"
import { style } from "./lib/style.js"
import { story } from "./lib/story.js"
import { mymarkdown } from "./lib/mymarkdown.js"


const resolveHeadingParagraphStyle = (level, styleParams)=>{
    if(level==1){
        return styleParams.arialPs24;
    }
    else if(level==2){
        return styleParams.arialPs16;
    }
    else {
        return styleParams.arialPs16;
    }
};

const parseNode = (node, textFrame, styleParams)=> {
    if(node.type=='root'){
        _.each(node.children, (childNode)=> {
            parseNode(childNode, textFrame, styleParams);
        });
    }
    else if(node.type=='paragraph'){
        story.getInsertionPoint(textFrame).applyParagraphStyle(styleParams.arialPs13);

        _.each(node.children, (childNode)=> {
            parseNode(childNode, textFrame, styleParams);
        });

        story.addBr(textFrame);
    }
    else if(node.type=='heading'){
        const headingPs = resolveHeadingParagraphStyle(
            node.level, styleParams);

        story.getInsertionPoint(textFrame).applyParagraphStyle(headingPs);

        _.each(node.children, (childNode)=> {
            parseNode(childNode, textFrame, styleParams);
        });

        story.addBr(textFrame);
    }
    else if(node.type=='emphasis'){
        story.getInsertionPoint(textFrame).applyCharacterStyle(styleParams.italicCs);

        _.each(node.children, (childNode)=>{
            parseNode(childNode, textFrame, styleParams);
        });

        story.getInsertionPoint(textFrame).applyCharacterStyle(styleParams.defaultCs);
    }
    else if(node.type=='strong'){
        story.getInsertionPoint(textFrame).applyCharacterStyle(styleParams.boldCs);

        _.each(node.children, (childNode)=>{
            parseNode(childNode, textFrame, styleParams);
        });

        story.getInsertionPoint(textFrame).applyCharacterStyle(styleParams.defaultCs);
    }
    else if(node.type=='text'){
        story.getInsertionPoint(textFrame).contents = node.contents;
    }
    else if(node.type=='list'){
        _.each(node.children, (itemNode)=> {
            _.each(itemNode.children, (paragraphNode)=>{
                story.getInsertionPoint(textFrame).applyParagraphStyle(styleParams.listItemPs);

                _.each(paragraphNode.children, (childNode)=>{
                    parseNode(childNode, textFrame, styleParams);
                });

                story.addBr(textFrame);
            });
        });
    }
};



const fs = require("uxp").storage.localFileSystem;
const file = await fs.getFileForOpening({ types: ['md'] });
if( file!=null ){
    const markdownText = await file.read();

    const params = {
        pageWidth: 148,
        pageHeight: 210,
        margin: {
            top: 5,
            left: 5,
            bottom: 5,
            right: 5
        }
    };

    const docObject = ind.createDocObject(params);
    const doc       = docObject.doc;
    const textFrame = docObject.textFrame;

    const documentNode = mymarkdown.toDocumentNode(markdownText);
    
    const styleParams = {
        arialPs24 : style.getArialParagraphStyle(doc, 24),
        arialPs16 : style.getArialParagraphStyle(doc, 16),
        arialPs13 : style.getArialParagraphStyle(doc, 13),
        listItemPs: style.getListItemParagraphStyle(doc, style.getArialParagraphStyle(doc, 13)),
        defaultCs : style.getDefaultCharacterStyle(doc),
        boldCs    : style.getBoldCharacterStyle(doc),
        italicCs  : style.getItalicCharacterStyle(doc)
    };
    
    parseNode(documentNode, textFrame, styleParams);
}
