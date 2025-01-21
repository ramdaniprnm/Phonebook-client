import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons/faArrowDownAZ";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons/faArrowUpAZ";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash"

export const PhonebookHead = ({ setSearchQuery, setSort }) => {
    const [searchQuery, setSearchTerm] = useState(localStorage.getItem('searchQuery') || '');
    const [sortOrders, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
    const navigate = useNavigate();

    const navigateAddForm = (e) => {
        e.preventDefault();
        navigate('/add');
    }

    const handleBouncedQuery = useMemo(() =>
        debounce((keyword) => {
            setSearchQuery(keyword); // Use prop function
            localStorage.setItem('searchQuery', keyword);
        }, 200),
        [setSearchQuery]
    );

    const handleQueryPhonebook = (e) => {
        const value = e.target.value;
        setSearchTerm(value); // Update local state
        handleBouncedQuery(value); // Trigger debounced search
    };

    const handleSort = () => {
        const newSortOrder = sortOrders === 'asc' ? 'desc' : 'asc';
        setSort(newSortOrder);
        setSortOrder(newSortOrder);
        localStorage.setItem('sortOrder', newSortOrder);
    }

    return (
        <div className="nav">
            <button className="btn-sort" id="sortPhonebook" onClick={handleSort} >
                <FontAwesomeIcon icon={sortOrders === 'asc' ? faArrowUpAZ : faArrowDownAZ} />
            </button>
            <span className="search-btn">
                <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
                type="text"
                className="form-control"
                id="queryPhonebook"
                placeholder="Search"
                value={searchQuery}
                onChange={handleQueryPhonebook}
            />
            <button type="button" onClick={navigateAddForm} className="btn-add" id="addPhonebook">
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        </div >
    )
};

export default PhonebookHead;