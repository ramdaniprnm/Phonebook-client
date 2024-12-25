import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons/faArrowDownAZ";
import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons/faArrowUpAZ";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PhonebookItem() {
    const sortOrder = 'asc';
    return (
        <>
            <div>
                <h1>Phonebook</h1>
            </div>
            <div className="nav sticky-top"></div>
            <button type="button" className="btn-brown" id="sortPhonebook" onClick>
                <FontAwesomeIcon icon={sortOrder === 'asc' ? faArrowUpAZ : faArrowDownAZ} />
            </button>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <button type="button" className="btn-brown" id="searchPhonebook">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <div>
                <button type="button" onClick className="btn-brown" id="addPhonebook">
                    <FontAwesomeIcon icon={faUserPlus} />
                </button>
            </div>
        </>
    )
}