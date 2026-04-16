import { Link } from "react-router-dom";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top border-bottom px-3 shadow-sm">
            <div className="container">
                <Link className="navbar-brand h1 mb-0" to="/">
                    영단어장
                </Link>
                <div className="d-flex">
                    <Link to="/create_word" className="btn btn-outline-primary me-2">
                        단어 추가
                    </Link>
                    <Link to="/create_day" className="btn btn-outline-secondary">
                        Day 추가
                    </Link>
                </div>
            </div>
        </nav>
    );
}
