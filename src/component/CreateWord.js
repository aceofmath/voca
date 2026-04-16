import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateWord() {
    const [days, setDays] = useState([]);
    //const history = useHistory();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

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
                console.error("Supabase Insert Error:", error);
                alert("저장 중 오류가 발생했습니다.");
            } else {
                alert("생성이 완료 되었습니다");
                navigate(`/day/${dayRef.current.value}`);
            }
            setIsLoading(false);
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-sm border-0">
                    <div className="card-body p-4">
                        <h2 className="card-title text-center mb-4 fw-bold text-primary">단어 추가</h2>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">English</label>
                                <input className="form-control form-control-lg" type="text" placeholder="e.g. computer" ref={engRef} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-semibold text-secondary">Korean</label>
                                <input className="form-control form-control-lg" type="text" placeholder="예: 컴퓨터" ref={korRef} required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">Day Selection</label>
                                <select ref={dayRef} className="form-select form-select-lg">
                                    {days.map((day) => (
                                        <option key={day.id} value={day.day}>
                                            Day {day.day}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="btn btn-primary btn-lg w-100 shadow-sm fw-bold" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        저장 중...
                                    </>
                                ) : (
                                    "단어 저장하기"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
