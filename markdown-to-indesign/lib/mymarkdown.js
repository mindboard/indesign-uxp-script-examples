import {fromMarkdown} from 'https://esm.sh/mdast-util-from-markdown@1'
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js"

const mymarkdown = {}

const parseNode = (node, acc0)=>{
    if(node.type == 'text'){
        acc0.type = node.type;
        acc0.contents = node.value;
        return acc0;
    }
    else {
        const childNodes = node.children;
        const f = (acc1, childNode)=> acc1.concat(parseNode(childNode, {}));

        acc0.type = node.type;
        if(node.type=='heading'){
            acc0.level = node.depth;
        }
        acc0.children = _.reduce( childNodes, f, []);
        return acc0;
    }
};

mymarkdown.toDocumentNode = (markdownText)=> {
    const tree = fromMarkdown(markdownText);
    return parseNode(tree, {});
};

export { mymarkdown };
