import { useState } from "react";
import type { Memo } from "./types";
import { Layout } from "./components/Layout";
import { Editor } from "./components/Editor";

// 初期表示用のデータ（コンポーネントの外に置くことで再レンダリング時の再定義を防ぐ）
const initialMemo = {
    id: Date.now(),
    text: "思いついたことを、サッとメモ。\n作業に集中するための、シンプルなメモアプリです！",
    timestamp: new Date().toLocaleString("ja-JP"),
};

export function App() {
    // <Memo[]> の意味:「この memos という変数には、Memo の形をしたデータが入った配列しか入れませんよ！」 という宣言
    // memosの初期値を[initialMemo] : メモ1個が入ったリスト（要素が1つの配列）に設定
    // <Memo[]>でmemosには配列が入るように限定しているのでmemosの初期値も配列でなければならない
    const [memos, setMemos] = useState<Memo[]>([initialMemo]);

    // メモを追加する関数
    // 引数inputTextはstring型のメモの内容を受け取る
    const addMemo = (inputText: string) => {
        // 空白を削除してなお、空文字列でない場合のみ処理を行う
        if (inputText.trim()) {
            // 新しいメモをMemo型のオブジェクトとして定義
            const newMemo: Memo = {
                // 新しいメモのidを現在の時刻（ミリ秒）として設定
                id: Date.now(),
                // 新しいメモの内容をinputTextとして設定
                text: inputText,
                // 新しいメモの時刻を現在の時刻として設定
                timestamp: new Date().toLocaleString("ja-JP"),
            };
            // 新しいメモをmemosの先頭に追加
            setMemos([newMemo, ...memos]);
        }
    };

    return (
        <Layout>
            <Editor placeholder="新しいメモを入力..." type="shadow" onSubmit={addMemo} />
            {memos.map((memo) => (
                <p key={memo.id}>
                    {memo.text}
                    {memo.timestamp}
                </p>
            ))}
        </Layout>
    );
}

export default App;
