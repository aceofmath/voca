import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Word({ word: w }) {
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    function toggleShow() {
        setIsShow(!isShow);
    }

    async function toggleDone() {
        const { error } = await supabase.from("words").update({ isDone: !isDone }).eq("id", word.id);

        if (!error) {
            setIsDone(!isDone);
        } else {
            alert("상태 변경 중 오류가 발생했습니다: " + error.message);
        }
    }

    async function del() {
        if (window.confirm("삭제 하시겠습니까?")) {
            const { error } = await supabase.from("words").delete().eq("id", word.id);

            if (!error) {
                setWord({ id: 0 });
            } else {
                alert("삭제 중 오류가 발생했습니다: " + error.message);
            }
        }
    }

    if (word.id === 0) {
        return null;
    }

    return (
        <tr className={isDone ? "off" : ""}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone} />
            </td>
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
                <button onClick={del} className="btn_del">
                    삭제
                </button>
            </td>
        </tr>
    );
}

// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE
