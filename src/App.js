import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import Header from "./component/Header";
import Day from "./component/Day";
import DayList from "./component/DayList";
import EmptyPage from "./component/EmptyPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateWord from "./component/CreateWord";
import CreateDay from "./component/CreateDay";

function App() {
    useEffect(() => {
        const testConnection = async () => {
            const { data, error } = await supabase.from("days").select("*");
            if (error) console.error("연결 실패:", error.message);
            else console.log("Supabase 연결 성공! 데이터:", data);
        };

        testConnection();
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<DayList />} />
                    <Route path="/day/:day" element={<Day />} />
                    <Route path="/create_word" element={<CreateWord />} />
                    <Route path="/create_day" element={<CreateDay />} />
                    <Route path="/*" element={<EmptyPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
