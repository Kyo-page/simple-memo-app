import type { Memo, Reply } from "../types";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { MessageCircle } from "lucide-react";
import { Editor } from "./Editor";
import { ContentBody } from "./ContentBody";
import { ReplyList } from "./ReplyList";

type MemoListProps = {
    // memos(メモのリスト)を表示するために、Memo型の配列を受け取る
    memos: Memo[];
    // これは決まっている書き方なので上記とセットで覚えておく
    setMemos: React.Dispatch<React.SetStateAction<Memo[]>>;
};

// メモのリストを表示するコンポーネント
export const MemoList = (props: MemoListProps) => {
    // 受け取ったmemosとsetMemosをpropsから展開
    const { memos, setMemos } = props;

    // 返信のリストを管理するためのuseState
    const [replies, setReplies] = useState<Reply[]>([]);
    // 返信先のメモのidを管理するためのuseState。何に対してのリプライか。
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    // 編集先のメモのidを管理するためのuseState。何を編集しているか。
    const [editingTo, setEditingTo] = useState<{
        // 編集先のメモのid
        id: number;
        // 編集先のメモの種類。メモかリプライか。
        type: "memo" | "reply";
    } | null>(null);

    // 編集モードで入力したテキストを確定する関数
    const updateMemo = (inputText: string) => {
        // 入力したテキストが空でなく、編集先が存在する場合のみ処理を行う
        if (inputText.trim() && editingTo) {
            // 編集先のメモを更新
            setMemos(
                // mapでmemosの配列を走査して、編集先のメモを更新
                memos.map((memo) =>
                    // 編集先のメモのidと一致する場合は、テキストを更新して返す
                    // 一致しない場合はそのまま返す
                    memo.id === editingTo.id ? { ...memo, text: inputText } : memo,
                ),
            );
            // 編集先をnullにして編集モードを終了
            setEditingTo(null);
        }
    };

    // メモを削除する関数
    const deleteMemo = (id: number) => {
        // filterでmemosの配列を走査して、編集先のメモを削除
        // 削除したいメモのidと一致しないメモのみを残して返す
        setMemos(memos.filter((memo) => memo.id !== id));
        // 削除したい返信のidと一致する返信のみを残して返す
        setReplies(replies.filter((reply) => reply.parentId !== id));
    };

    // 編集を開始する関数
    // 編集先のidと種類(メモかリプライか)を受け取る
    const startEdit = (id: number, type: "memo" | "reply") => {
        // 編集先のメモのidと種類をsetEditingToに設定
        setEditingTo({ id: id, type: type });
    };

    // メモに対する返信のリストを配列として取得する関数
    // 引数をmemoIdとして受け取る
    const getRepliesForMemo = (memoId: number) => {
        // filterでrepliesの配列を走査して、引数のmemoIdとparentIdが一致する返信のみを残して返す
        return replies.filter((reply) => reply.parentId === memoId);
    };

    // 返信を追加する関数
    // 返信先のメモのidとテキストを受け取る
    const addReply = (inputText: string) => {
        // 入力したテキストが空でなく、返信先が存在する場合のみ処理を行う
        if (inputText.trim() && replyingTo) {
            // 新しい返信をReply型のオブジェクトとして定義
            const newReply: Reply = {
                // 新しい返信のidを現在の時刻（ミリ秒）として設定
                id: Date.now(),
                // 新しい返信の内容をinputTextとして設定
                text: inputText,
                // 新しい返信の時刻を現在の時刻として設定
                timestamp: new Date().toLocaleString("ja-JP"),
                // 新しい返信の返信先のメモのidをreplyingToとして設定
                parentId: replyingTo,
            };
            // 新しい返信をrepliesの先頭に追加
            setReplies([newReply, ...replies]);
            // 返信先をnullにして返信モードを終了
            setReplyingTo(null);
        }
    };

    return (
        <>
            {/* メモのリストをmapで走査して、メモを表示 */}
            {/* メモのidとテキストと時刻を受け取る */}
            {memos.map((memo) => (
                // listにはkeyを渡す必要があるので、メモのidをkeyに渡す
                <Card key={memo.id}>
                    {/* 編集中のidとメモのidが一致し、編集中の種類がメモの場合は、カードの中身をEditorのみにする */}
                    {editingTo?.id === memo.id && editingTo?.type === "memo" ? (
                        // EditorのinitialValueにメモのテキストを渡し、updateMemoをonSubmitに渡す
                        <Editor initialValue={memo.text} onSubmit={updateMemo} />
                    ) : (
                        <>
                            <CardHeader>
                                {/* ContentBodyコンポーネントを表示。typeにメモの種類を渡し、contentにオブジェクト{memo}を渡し、onDeleteにメモを削除する関数を渡し、startEditにメモを編集する関数を渡す */}
                                <ContentBody type="memo" content={memo} onDelete={deleteMemo} startEdit={startEdit} />
                                <hr className="border-gray-300" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* ReplyListコンポーネントを表示。repliesにメモに対する返信のリストを渡し、
                                setRepliesに返信のリストを更新する関数を渡し、
                                startEditに編集を開始する関数を渡し、
                                editingToに編集先のidと種類を渡し、
                                setEditingToに編集先のidと種類を設定する関数を渡す。*/}
                                <ReplyList
                                    replies={getRepliesForMemo(memo.id)}
                                    setReplies={setReplies}
                                    startEdit={startEdit}
                                    editingTo={editingTo}
                                    setEditingTo={setEditingTo}
                                />

                                {/* 返信先のidとメモのidが一致する(返信モードがon)場合は、Editorを表示 */}
                                {replyingTo === memo.id && (
                                    <Editor onSubmit={addReply} placeholder="リプライを入力..." />
                                )}
                            </CardContent>

                            <CardFooter>
                                {/* 返信先のidとメモのidが一致しない(返信モードがoff)場合は、ボタンを表示 */}
                                {replyingTo !== memo.id && (
                                    <button
                                        // ボタンをクリックすると、返信先のidとメモのidを一致させる。つまり、返信モードをonにする。
                                        onClick={() => setReplyingTo(memo.id)}
                                        className="text-primary hover:text-primary/60"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                    </button>
                                )}
                            </CardFooter>
                        </>
                    )}
                </Card>
            ))}
        </>
    );
};
