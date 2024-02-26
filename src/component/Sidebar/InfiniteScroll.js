import React, { useEffect, useRef } from 'react';
import { PulseLoader } from "react-spinners";

const InfiniteScroll = ({ fetchData, loading, hasMore }) => {
    const containerRef = useRef(null);

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !loading && hasMore) {
                // Trigger fetch data when the container is intersecting with the viewport
                fetchData();
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '20px',
            threshold: 0.5,
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [fetchData, loading, hasMore]);

    return (
        <div className="flex w-full items-center justify-center h-[100px] text-xl text-gray-500" ref={containerRef}>
            {/* Render your content here */}
            {!hasMore && <p className="text-center">No More Data</p>}
            {loading && <PulseLoader color="#36d7b7" />}
        </div>
    );
};

export default InfiniteScroll;