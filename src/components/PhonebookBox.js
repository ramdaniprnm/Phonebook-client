import React, { useState, useEffect, useRef } from "react";
import PhonebookHead from "./PhonebookHead";
import { throttle } from "lodash";
import { request } from "../services/PhonebookApi";
import { PhonebookList } from "./PhonebookList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PhonebookDelete } from "./PhonebookDelete";

export const PhonebookBox = () => {
    const [PhonebookItems, setPhonebookItems] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [sortOrder, setSortOrder] = useState(localStorage.getItem("sortOrder") || "asc");
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
    const [page, setPage] = useState(1);
    const [isFetch, setIsFetch] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const observer = useRef();
    const lastPage = useRef();

    const fetchPhonebookItems = async () => {
        setIsFetch(true);
        try {
            const response = await request.get(`?page=${page}&keyword=${searchQuery}&sort=${sortOrder}`);
            setPhonebookItems((prevItems) => {
                const newItems = response.data.Phonebook.filter(
                    (newItem) => !prevItems.some((item) => item.id === newItem.id)
                );
                return [...prevItems, ...newItems];
            });
            setHasMore(response.data.Phonebook.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsFetch(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setPhonebookItems([]);
        if (!searchQuery && sortOrder === "asc") {
            localStorage.clear();
        } else {
            localStorage.setItem("searchQuery", searchQuery);
            localStorage.setItem("sortOrder", sortOrder);
        }
    }, [searchQuery, sortOrder]);

    useEffect(() => {
        fetchPhonebookItems();
    }, [page, searchQuery, sortOrder]);

    useEffect(() => {
        if (isFetch) return;
        if (observer.current) observer.current.disconnect();

        const observerEvent = throttle((entries) => {
            if (entries[0].isIntersecting && hasMore && !isFetch) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 500);

        observer.current = new IntersectionObserver(observerEvent);
        if (lastPage.current) {
            observer.current.observe(lastPage.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasMore, isFetch]);

    const deletePhonebookItem = (id) => {
        setPhonebookItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const showingDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <>
            <PhonebookHead
                searchQuery={(query) => {
                    setSearchQuery(query);
                    setPage(1);
                }}
                sortOrder={(order) => {
                    setSortOrder(order);
                    setPage(1);
                }}
            />
            <PhonebookList
                PhonebookItems={PhonebookItems}
                updatePhonebookItems={setPhonebookItems}
                deletePhonebookItem={deletePhonebookItem}
                showingDeleteModal={showingDeleteModal}
            />
            {isFetch && (
                <div className="loading">
                    <FontAwesomeIcon icon="spinner" spin size="3x" />
                </div>
            )}
            <div ref={lastPage}></div>
            {deleteModal && deleteId && (
                <PhonebookDelete
                    id={deleteId.id}
                    name={deleteId.name}
                    removePhonebook={deletePhonebookItem}
                    closeDeleteModal={closeDeleteModal}
                />
            )}
        </>
    );
};
