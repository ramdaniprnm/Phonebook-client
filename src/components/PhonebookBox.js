import React, { useState, useEffect, useRef } from "react";
import PhonebookHead from "./PhonebookHead";
import { throttle } from "lodash";
import { request } from "../services/PhonebookApi";
import { PhonebookList } from "./PhonebookList";
import { PhonebookDelete } from "./PhonebookDelete";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export const PhonebookBox = () => {
    const [PhonebookItems, setPhonebookItems] = useState([]);
    const [deleteId, setToDeleteId] = useState(null);
    const [showingDeleteModal, setDeleteModalView] = useState(false);
    const [page, setPage] = useState(1);
    const [sortOrder, setSort] = useState(localStorage.getItem("sortOrder") || "asc");
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem("searchQuery") || "");
    const [isFetch, setIsFetch] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const lastPage = useRef();


    const fetchPhonebookItems = async (page, searchQuery, sortOrder) => {
        setIsFetch(true);
        try {
            const response = await request.get(`api/phonebook/?page=${page}&keyword=${searchQuery}&sort=${sortOrder}`);
            setPhonebookItems((prevItems) => {
                const newItems = response.data.phonebook.filter(
                    (newItem) => !prevItems.some((item) => item.id === newItem.id)
                );
                return [...prevItems, ...newItems];
            });
            setHasMore(response.data.phonebook.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsFetch(false);
        }
    };

    // const removeResend = async (_id) => {
    //     try {
    //         const data = await request.delete(`api/phonebook/${_id}`);
    //         setPhonebook()
    //     } catch (error) {
    //         console.error("Error Resend Remove data:", error);
    //     }
    // }

    // const resendClient = async () => {
    //     try {
    //         const data = await request.post('api/phonebook',);
    //     } catch (error) {
    //         console.error("Error Resend data:", error);
    //     };
    // }

    // const loadData = async () => {
    //     try {
    //         const data = await request.get(`api/phonebook?limit=10&id=${id}`);
    //         console.log('load data', data.data.phonebook);
    //     } catch (error) {
    //         console.error("Error loadData data:", error);
    //     };
    // }

    // // useEffect 1(loadData)
    // useEffect(() => {
    //     loadData();
    // }, []);

    // useEffect 2
    useEffect(() => {
        setPage(1);
        setPhonebookItems([]);
        if (!searchQuery && sortOrder === "asc") localStorage.clear();
    }, [searchQuery, sortOrder]);


    // useEffect 3
    useEffect(() => {
        Promise.resolve().then(() => fetchPhonebookItems(page, searchQuery, sortOrder));
    }, [page, searchQuery, sortOrder]);


    // useEffect 3
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
        setDeleteModalView(true);
    };

    const closeDeleteModal = () => {
        setToDeleteId(null);
        setDeleteModalView(false);
    };

    return (
        <>
            <PhonebookHead
                setSearchQuery={(keyword) => {
                    setSearchQuery(keyword);
                    setPage(1);
                }}
                setSort={(order) => {
                    setSort(order);
                    setPage(1);
                }}
                sortOrder={sortOrder}
            />
            <PhonebookList
                PhonebookItems={PhonebookItems}
                updatePhonebook={updatePhonebook}
                deletePhonebook={deletePhonebook}
                throwDeleteModal={throwDeleteModal}
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
