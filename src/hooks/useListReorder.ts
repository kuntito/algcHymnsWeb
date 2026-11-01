import {
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

interface Options<T> {
    items: T[];
    getId: (item: T) => UniqueIdentifier;
    onMove: (fromIndex: number, toIndex: number) => void;
}

/**
 * this manages dragging items within a list.
 * 
 * the parent passes the function that moves the items.
 *
 * a drag only starts after the pointer moves 5px, so a plain click
 * on a drag handle doesn't count. 
 * 
 * keyboard users can pick up and
 * move an item with the arrow keys.
 *
 * when an item is dropped somewhere new, `onMove` gets the old and
 * new positions.
 * 
 * dropping outside the list or back in place does nothing.
 * 
 * the returned `sensors`, `itemIds` and `handleDragEnd` go on
 * dnd-kit's `DndContext` and `SortableContext` around the list.
 */
export const useListReorder = <T,>({
    items,
    getId,
    onMove,
}: Options<T>) => {
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 5 },
    });

    const keyboardSensor = useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    });

    const sensors = useSensors(pointerSensor, keyboardSensor);

    const itemIds = items.map(getId);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const isDroppedOutside = over === null;
        if (isDroppedOutside) return;

        const fromIndex = active.data.current?.sortable.index;
        const toIndex = over.data.current?.sortable.index;

        const hasIndexes = fromIndex !== undefined && toIndex !== undefined;
        if (!hasIndexes) return;

        const isSamePosition = fromIndex === toIndex;
        if (isSamePosition) return;

        onMove(fromIndex, toIndex);
    }

    return {
        sensors,
        itemIds,
        handleDragEnd,
    };
};