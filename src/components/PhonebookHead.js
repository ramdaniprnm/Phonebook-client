import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons/faArrowDownAZ";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons/faArrowUpAZ";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PhonebookHead = () => {
    const [query, setSearchTerm] = useState('');
    const [sortOrders, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const navigate = useNavigate();
    const navigateAddForm = (e) => {
        e.preventDefault();
        navigate('/add');
    }

    const searchPhonebook = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleSort = () => {
        const newSortOrder = sortOrders === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder);
    }

    return (
        <div className="nav sticky-top">
            <button className="btn-sort" id="sortPhonebook" onClick={handleSort} >
                <FontAwesomeIcon icon={sortOrders === 'asc' ? faArrowUpAZ : faArrowDownAZ} />
            </button>
            <div className="search-bar">
                <span className="search-btn">
                    <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                    type="text"
                    className="form-control"
                    id="queryPhonebook"
                    placeholder="Search"
                    value={query}
                    onChange={searchPhonebook}
                />
                <div>
                    <button type="button" onClick={navigateAddForm} className="btn-brown" id="addPhonebook">
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PhonebookHead;