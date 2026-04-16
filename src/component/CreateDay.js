import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateDay() {
    const [days, setDays] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDays = async () => {
            const { data, error } = await supabase.from("days").select("*");
            if (!error) {
                setDays(data);
            }
        };
        fetchDays();
    }, []);

    async function addDay() {
        const { error } = await supabase.from("days").insert([{ day: days.length + 1 }]);

        if (error) {
            alert("생성 중 오류가 발생했습니다.");
            console.error(error);
        } else {
            alert("생성이 완료 되었습니다");
            navigate("/");
        }
    }

    return (
        <div>
            <h3>현재 일수 : {days.length}일</h3>
            <button onClick={addDay}>Day 추가</button>
        </div>
    );
}
