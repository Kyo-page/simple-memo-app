export interface Memo {
    id: number;
    text: string;
    timestamp: string;
}

export interface Reply extends Memo {
    // 返信先のメモのid
    parentId: number;
}
