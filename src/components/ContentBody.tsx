import { Edit2, Trash2 } from "lucide-react";
import type { Memo, Reply } from "../types";
import { CardDescription, CardTitle } from "./ui/card";

// まずはデータの型を定義
type ContentBodyProps = {
    // Memo型のオブジェクトかReply型のオブジェクトのどちらかを受け取る
    content: Memo | Reply;
    // 編集先のメモの種類。メモかリプライか。
    type: "memo" | "reply";
    // メモを削除する関数
    // 引数をidとして受け取り、戻り値はなし
    onDelete: (id: number) => void;
    // メモの編集を開始する関数
    // 引数をcontentIdとtypeとして受け取り、戻り値はなし
    startEdit: (contentId: number, type: "memo" | "reply") => void;
};

export const ContentBody = (props: ContentBodyProps) => {
    return (
        <>
            <div className="flex justify-between items-center">
                {/* propsとして渡されてきた『content（中身）』というオブジェクトの中にある、『timestamp（日時情報）』を表示する */}
                {/* つまりmemo.timestamp */}
                <CardDescription>{props.content.timestamp}</CardDescription>

                <div className="flex space-x-2">
                    <button
                        // ボタンをクリックすると、startEdit関数を実行。引数にcontent.idとtypeを渡す
                        onClick={() => props.startEdit(props.content.id, props.type)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        // ボタンをクリックすると、onDelete関数を実行。引数にcontent.idを渡す
                        onClick={() => props.onDelete(props.content.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {/* つまりmemo.text */}
            <CardTitle className="pb-3">{props.content.text}</CardTitle>
        </>
    );
};
