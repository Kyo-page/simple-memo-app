// オブジェクトの型Memoを定義
export interface Memo {
    id: number;
    text: string;
    timestamp: string;
}

// オブジェクトの型Replyを定義
export interface Reply extends Memo {
    // 返信先のメモのid
    parentId: number;
}
