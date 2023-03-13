declare class TextFrame {
    contents: string
}
declare class TextFrames {
    add(params: any): TextFrame
}
declare class Page {
    textFrames: TextFrames
    marginPreferences: any
}
declare class Pages {
    item(index: number): Page
}
declare class Document {
    pages: Pages
}
declare class Documents {
    add(params: any): Document
}
declare class Application {
    documents: Documents
}
declare var app: Application
