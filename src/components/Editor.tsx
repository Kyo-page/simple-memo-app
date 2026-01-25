import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

type EditorProps = {
    // 入力欄の初期値。？をつけることで、あってもなくても良いという意味
    initialValue?: string;
    placeholder?: string;
    // 入力欄のスタイルを2種類用意
    type?: "border" | "shadow";
    // onSubmit : 送信時に実行してほしい「関数」を受け取るための名前。
    // (content: string) : 「送信されるテキスト（文字列）」を受け取ります。
    //void : 「受け取って処理するだけで、返事（戻り値）はいりません」という宣言。
    onSubmit: (content: string) => void;
};

// 入力欄のコンポーネント
export const Editor = (props: EditorProps) => {
    // propsの初期値をそれぞれ代入
    const { initialValue = "", placeholder = "", type = "border", onSubmit } = props;
    // 入力欄のテキストを管理するためのuseState
    // initialValueを初期値とする
    const [inputText, setInputText] = useState(initialValue);

    return (
        <div className="space-y-2">
            <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={placeholder}
                className={cn("bg-white", type === "border" ? "" : "shadow-lg border-none")}
                rows={type === "border" ? 3 : 4}
            />
            <Button
                onClick={() => {
                    // 入力欄のテキストを送信
                    onSubmit(inputText);
                    // 入力欄のテキストをクリア
                    setInputText("");
                }}
                className="w-20"
            >
                <Send className="w-4 h-4" />
            </Button>
        </div>
    );
};
