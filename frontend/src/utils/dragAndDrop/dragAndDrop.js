import { useRef, useState } from "react";

export default function useDragAndDrop(initialSections) {
    const [sectionsOrder, setSectionsOrder] = useState(initialSections);
    const draggingIdRef = useRef(null);
    const [dragOverId, setDragOverId] = useState(null);

    const onDragStart = (e, sectionId) => {
        draggingIdRef.current = sectionId;
        e.dataTransfer.effectAllowed = "move";
        try {
            e.dataTransfer.setData("text/plain", sectionId);
        } catch {}
        e.currentTarget.style.opacity = "0.6";
    };

    const onDragEnd = (e) => {
        draggingIdRef.current = null;
        setDragOverId(null);
        e.currentTarget.style.opacity = "1";
    };

    const onDragOver = (e, sectionId) => {
        e.preventDefault();
        if (draggingIdRef.current && draggingIdRef.current !== sectionId) {
            setDragOverId(sectionId);
        }
    };

    const onDrop = (e, targetId) => {
        e.preventDefault();
        const sourceId =
            (e.dataTransfer?.getData("text/plain")) || draggingIdRef.current;

        if (!sourceId || sourceId === targetId) {
            setDragOverId(null);
            return;
        }

        setSectionsOrder((prev) => {
            const newOrder = [...prev];
            const srcIndex = newOrder.indexOf(sourceId);
            const tgtIndex = newOrder.indexOf(targetId);

            if (srcIndex === -1 || tgtIndex === -1) return prev;

            newOrder.splice(srcIndex, 1);
            newOrder.splice(tgtIndex, 0, sourceId);
            return newOrder;
        });

        draggingIdRef.current = null;
        setDragOverId(null);
    };

    const getSectionContainerStyle = (id) => ({
        border: dragOverId === id ? "2px dashed #9CA3AF" : "none",
        padding: "0px",
        marginBottom: "1px",
        borderRadius: "6px",
        backgroundColor: draggingIdRef.current === id ? "#fafafa" : "transparent",
        cursor: "grab",
    });

    return {
        sectionsOrder,
        onDragStart,
        onDragOver,
        onDrop,
        onDragEnd,
        getSectionContainerStyle,
    };
}