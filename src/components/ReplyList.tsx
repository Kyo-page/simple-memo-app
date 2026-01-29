import type { Reply } from "../types";
import { ContentBody } from "./ContentBody";
import { Editor } from "./Editor";

type ReplyListProps = {
    // replies(返信のリスト)を表示するために、Reply型の配列を受け取る
    replies: Reply[];
    // これは決まっている書き方なので上記とセットで覚えておく
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
    // 編集を開始する関数
    // 引数をidとtypeとして受け取り、戻り値はなし
    startEdit: (id: number, type: "memo" | "reply") => void;
    // 編集先のidと種類(メモかリプライか)を管理するためのオブジェクト
    editingTo: { id: number; type: "memo" | "reply" } | null;
    // 編集先のidと種類(メモかリプライか)を管理するためのオブジェクトを設定する関数
    // 引数をオブジェクトとして受け取り、戻り値はなし
    setEditingTo: React.Dispatch<React.SetStateAction<{ id: number; type: "memo" | "reply" } | null>>;
};

export const ReplyList = (props: ReplyListProps) => {
    // 分割代入で記述を短縮
    const { replies, editingTo, setReplies, setEditingTo, startEdit } = props;

    // 編集モードで入力したテキストを確定する関数
    const updateReply = (inputText: string) => {
        // 入力したテキストが空でなく、編集先が存在する場合のみ処理を行う
        if (inputText.trim() && editingTo) {
            // 返信のリストを更新する
            setReplies(
                // mapでrepliesの配列を走査して、編集先の返信を更新
                replies.map((reply) =>
                    // 編集先の返信のidと一致する場合は、テキストを更新して返す
                    reply.id === editingTo.id ? { ...reply, text: inputText } : reply,
                ),
            );
            // 編集先をnullにして編集モードを終了
            setEditingTo(null);
        }
    };

    // 返信を削除する関数
    // 引数をidとして受け取る
    const deleteReply = (id: number) => {
        // filterでrepliesの配列を走査して、編集先の返信を削除
        // 削除したい返信のidと一致しない返信のみを残して返す
        setReplies(replies.filter((reply) => reply.id !== id));
    };

    return (
        <>
            {/* 返信のリストをmapで走査して、返信を表示 */}
            {replies.map((reply) => (
                // listにはkeyを渡す必要があるので、返信のidをkeyに渡す
                <div key={reply.id} className="p-6 bg-gray-100 rounded-lg space-y-2 mb-4">
                    {/* 編集中のidと返信のidが一致し、編集中の種類がreplyの場合は、カードの中身をEditorのみにする */}
                    {editingTo?.id === reply.id && editingTo?.type === "reply" ? (
                        // EditorのinitialValueにreplyのテキストを渡し、onSubmitにupdateReplyを渡す
                        <Editor initialValue={reply.text} onSubmit={updateReply} />
                    ) : (
                        // ContentBodyコンポーネントを表示。typeにreplyの種類を渡し、contentにオブジェクト{reply}を渡し、onDeleteに返信を削除する関数を渡し、startEditに返信を編集する関数を渡す
                        <ContentBody type="reply" content={reply} onDelete={deleteReply} startEdit={startEdit} />
                    )}
                </div>
            ))}
        </>
    );
};
