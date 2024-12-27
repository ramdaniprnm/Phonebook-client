import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons/faArrowDownAZ";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons/faArrowUpAZ";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function PhonebookItem() {
    const [sortOrders, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const navigate = useNavigate();

    const navigateAddForm = (e) => {
        e.preventDefault();
        navigate('/add');
    }

    const handleSort = () => {
        const newSortOrder = sortOrders === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder);
    }

    return (
        <>
            <div>
            </div>
            <div className="nav sticky-top"></div>
            <button type="button" className="btn-brown" id="sortPhonebook" onClick={handleSort}>
                <FontAwesomeIcon icon={sortOrders === 'asc' ? faArrowUpAZ : faArrowDownAZ} />
            </button>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button type="button" className="btn-brown" id="searchPhonebook">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div>
                <button type="button" onClick={navigateAddForm} className="btn-brown" id="addPhonebook">
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </div>
        </>
    )
}