import { useSortable } from "@dnd-kit/sortable";
import type { BaseField } from "../types/field";
import FieldRenderer from "./FieldRenderer";
import { CSS } from "@dnd-kit/utilities";
import { useFormBuilder } from "../context/formBuilderContext";


const SortableField = ({ id, field }: { id: string; field: BaseField }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const { updateField, deleteField } = useFormBuilder();

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            className="p-3 mb-3 bg-white shadow rounded flex justify-between items-start relative"
        >
            <div className="flex-1">
                <FieldRenderer field={field} />
            </div>

            <div className="flex flex-col gap-1 items-center ml-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab text-gray-400 hover:text-gray-600"
                    title="Drag to reorder"
                >
                    ☰
                </div>
                <button
                    onClick={() =>
                        updateField(field.id, {
                            label: prompt("Edit label", field.label) || field.label,
                        })
                    }
                    className="text-blue-500 text-sm hover:underline"
                    title="Edit"
                >
                    ✏️
                </button>
                <button
                    onClick={() => deleteField(field.id)}
                    className="text-red-500 text-sm hover:underline"
                    title="Delete"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

export default SortableField;