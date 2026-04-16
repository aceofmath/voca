import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateWord() {
    const [days, setDays] = useState([]);
    //const history = useHistory();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDays = async () => {
            const { data, error } = await supabase.from("days").select("*").order("day", { ascending: true });
            if (!error) setDays(data);
        };
        fetchDays();
    }, []);

    async function onSubmit(e) {
        e.preventDefault();
        if (!isLoading) {
            setIsLoading(true);

            const { error } = await supabase.from("words").insert([
                {
                    day: dayRef.current.value,
                    eng: engRef.current.value,
                    kor: korRef.current.value,
                    isDone: false,
                },
            ]);

            if (error) {
                alert("저장 중 오류가 발생했습니다.");
            } else {
                alert("생성이 완료 되었습니다");
                navigate(`/day/${dayRef.current.value}`);
            }
            setIsLoading(false);
        }
    }

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef} />
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef} />
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map((day) => (
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button
                style={{
                    opacity: isLoading ? 0.3 : 1,
                }}
            >
                {isLoading ? "Saving..." : "저장"}
            </button>
        </form>
    );
}
