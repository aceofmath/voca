import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Word from "./Word";

export default function Day() {
    const { day } = useParams();
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchWords = async () => {
            const { data, error } = await supabase.from("words").select("*").eq("day", day);

            if (!error) setWords(data);
        };
        fetchWords();
    }, [day]);

    return (
        <>
            <h2>Day {day}</h2>
            <table>
                <tbody>
                    {words.map((word) => (
                        <Word word={word} key={word.id} />
                    ))}
                </tbody>
            </table>
        </>
    );
}
