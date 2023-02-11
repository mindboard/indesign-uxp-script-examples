const story = {};

story.getInsertionPoint = (textFrame)=>{
    const s = textFrame.parentStory;
    return s.insertionPoints.item(s.insertionPoints.length-1);
};

story.addBr = (textFrame)=>{
    const ip = story.getInsertionPoint(textFrame);
    ip.contents = '\r';
};

export { story };
