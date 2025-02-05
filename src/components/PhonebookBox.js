import React, { useState, useEffect, useRef, useCallback } from "react";
import PhonebookHead from "./PhonebookHead";
import { request } from "../services/PhonebookApi";
import { PhonebookList } from "./PhonebookList";
import { PhonebookDelete } from "./PhonebookDelete";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { throttle } from "lodash";

export const PhonebookBox = () => {
    const [PhonebookItems, setPhonebookItems] = useState([]);
    const [deleteId, setToDeleteId] = useState(null);
    const [showingDeleteModal, setDeleteModalView] = useState({ isOpen: false, contactIdRemove: null });
    const [page, setPage] = useState(1);
    const [sortOrder, setSort] = useState(localStorage.getItem("sortOrder") || "asc");
    const [searchQuery, setSearchQuery] = useState(JSON.parse(sessionStorage.getItem("searchQuery")) || {
        limit: 10,
        keyword: "",
        sortOrder: "asc",
        order: "name",
    });
    const [isFetch, setIsFetch] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const lastPage = useRef();

   const fetchPhonebookItems = async (page, searchQuery, sortOrder) => {
        setIsFetch(true);
        try {
            // Correct API URL parameters to use searchQuery's properties
            const response = await request.get(
                `api/phonebook/?page=${page}&keyword=${searchQuery.keyword}&sort=${sortOrder}&limit=${searchQuery.limit}&order=${searchQuery.order}`
            );
            setPhonebookItems((prevItems) => {
                // Use response.data.phonebook instead of searchQuery.data.phonebook
                const newItems = response.data.phonebook.filter(
                    (newItem) => !prevItems.some((item) => item.id === newItem.id)
                );
                return [...prevItems, ...newItems];
            });
            // Update hasMore based on response
            setHasMore(response.data.phonebook.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsFetch(false);
        }
    };

    const loadSession = async () => {
        try {
            const { data } = await request.get('api/phonebook', { params: searchQuery });
            const offlineDatas = JSON.parse(sessionStorage.getItem('local_pending') || '[]');
            const pendingDatas = offlineDatas.filter((d => !d.status.sent));

            const takeData = [
                ...pendingDatas,
                ...data.phonebook.map(contact => ({
                    ...contact,
                    status: { sent: true }
                }))
            ];
            sessionPending(takeData);
        } catch (error) {
            console.error('Error loading session:', error);
            const offlineDatas = JSON.parse(sessionStorage.getItem('local_pending') || '[]');
            sessionPending(offlineDatas);
        }
    };

    const handleResendDelete = async (id, operation, contactData = null) => {
        try {
            await request.delete(`api/phonebook/${id}`);
            setPhonebookItems(prevItems => prevItems.filter(item => item.id !== id));
            sessionPending(PhonebookItems.map(item => item.id === id ? { ...item, ...contactData, status: { sent: false, operation: null } } : item));
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleResendUpdate = async (id, operation, contactData = null) => {
        try {
            await request.put(`api/phonebook/${id}`, contactData);
            setPhonebookItems(prevItems => prevItems.map(item => item.id === id ? { ...item, ...contactData } : item));
            sessionPending(PhonebookItems.map(item => item.id === id ? { ...item, ...contactData, status: { sent: false, operation: null } } : item));
        } catch (error) {
            console.log(error);
        }
    };

    const handleResendRetryAdd = async (id, operation, contactData = null) => {
        try {
            const { data } = await request.post('api/phonebook', contactData);
            loadSession(PhonebookItems.map(item => item.id !== id));
            sessionPending(PhonebookItems.map(item => item.id === data.id ? { ...item, id: data.id, status: { sent: true, operation: null } } : item));
        } catch (error) {
            console.log(error);
        }
    };


    const sessionPending = async (newContacts) => {
        sessionStorage.setItem('local_pending', JSON.stringify(newContacts));
        setPhonebookItems((newContacts))
    }

    // useEffect 1 ( session Data )
    useEffect(() => {
        sessionStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    }, [searchQuery]);

    // useEffect 2 ( Reset Data )
    useEffect(() => {
        setPage(1);
        setPhonebookItems([]);
        if (!searchQuery && sortOrder === "asc") localStorage.clear();
    }, [searchQuery, sortOrder]);


    // useEffect 3 ( Fetch Data )
    useEffect(() => {
        Promise.resolve().then(() => fetchPhonebookItems(page, searchQuery, sortOrder));
    }, [page, searchQuery, sortOrder]);


    // useEffect 4 ( Intersection Observer )
    useEffect(() => {
        if (isFetch) return;
        if (observer.current) observer.current.disconnect();

        const observerEvent = throttle((entries) => {
            if (entries[0].isIntersecting && hasMore && !isFetch) {
                setPage((prevPage) => prevPage + 1);
            }
        }, 500);

        observer.current = new IntersectionObserver(observerEvent, { threshold: 1, rootMargin: "0px 0px 100px 0px" });
        if (lastPage.current) {
            observer.current.observe(lastPage.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasMore, isFetch]);


    const updatePhonebook = async (id, updatedItem) => {
        setPhonebookItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? updatedItem : item))
        );
        setPage(1);
        setPhonebookItems([]);
        await fetchPhonebookItems(page, searchQuery, sortOrder);
    };


    const deletePhonebook = (id) => {
        setPhonebookItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const throwDeleteModal = (item) => {
        setToDeleteId(item);
        setDeleteModalView({isOpen : true, contactIdRemove: item.id});
    };

    const closeDeleteModal = () => {
        setToDeleteId(null);
        setDeleteModalView({isOpen : false, contactIdRemove: null});
    };

    return (
        <>
            <PhonebookHead
                setSearchQuery={(keyword) => {
                    setSearchQuery(prev => ({ ...prev, keyword }));
                    setPage(1);
                }}
                setSort={(order) => {
                    setSort(order);
                    setPage(1);
                }}
                sortOrder={sortOrder}
            />
            <PhonebookList
                PhonebookItems={[...PhonebookItems]}
                updatePhonebook={(id, name, phone ) => updatePhonebook(id, handleResendUpdate, { name, phone })}
                deletePhonebook={(id) => setDeleteModalView({ isOpen: true, contactIdRemove: id, handleResendDelete })}
                throwDeleteModal={(throwDeleteModal)}
                handleResendRetryAdd={(PhonebookItems) => handleResendRetryAdd(PhonebookItems.id, 'add', PhonebookItems)}

            />
            {
                isFetch && (
                    <div className="loading">
                        <FontAwesomeIcon icon={faSpinner} spin size="2x " />
                    </div>
                )
            }
            <div ref={lastPage}></div>
            {showingDeleteModal && deleteId && (
                <PhonebookDelete
                    id={deleteId.id}
                    name={deleteId.name}
                    deletePhonebook={deletePhonebook}
                    closeDeleteModal={closeDeleteModal}
                />
            )}
        </>
    );
};
