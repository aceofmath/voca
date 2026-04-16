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
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4 text-center">
                        <h2 className="card-title mb-4 fw-bold text-primary">Day 추가</h2>
                        <h4 className="mb-4 text-secondary">
                            현재 등록된 일수 : <span className="text-dark">{days.length}일</span>
                        </h4>
                        <button className="btn btn-primary btn-lg w-100 shadow-sm fw-bold" onClick={addDay}>
                            새로운 Day 추가하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
