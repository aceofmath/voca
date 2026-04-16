import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function DayList() {
    const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchDays = async () => {
            const { data, error } = await supabase.from("days").select("*").order("day", { ascending: true });

            if (error) {
                console.error("데이터를 불러오는 중 에러 발생:", error.message);
            } else {
                setDays(data || []);
            }
        };
        fetchDays();
    }, []);

    if (days.length === 0) {
        return <span>Loading...</span>;
    }

    return (
        <div className="d-flex flex-wrap gap-2 justify-content-center">
            {days.map((day) => (
                <Link key={day.id} to={`/day/${day.day}`} className="btn btn-primary btn-lg py-3 px-4 shadow-sm">
                    Day {day.day}
                </Link>
            ))}
        </div>
    );
}
