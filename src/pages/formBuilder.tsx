import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import FieldPalette from "../components/FieldPalette";
import FormCanvas from "../components/FormCanvas";
import { useFormBuilder } from "../context/formBuilderContext";
import { v4 as uuidv4 } from 'uuid';


const FormBuilder = () => {
    const { addField, fields, reorderFields, clearForm } = useFormBuilder();

    const handleDrop = (event: DragEndEvent) => {
        const { over, active } = event;
        const type = active?.data?.current?.type;

        if (!over) return;

        // Drag from palette
        if (type) {
            addField({
                id: uuidv4(),
                type,
                label: type.charAt(0).toUpperCase() + type.slice(1),
                required: false,
            });
        }


        // Reordering logic
        if (!type && active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                reorderFields(oldIndex, newIndex);
            }
        }
    };

    return (
        <DndContext onDragEnd={handleDrop}>
            <div className="flex gap-4">
                <div className="w-1/4">
                    <FieldPalette />
                </div>
                <div className="flex-1 mt-10">
                    <div className=" bg-white shadow rounded">
                        <FormCanvas />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            disabled={!fields.length}
                            className="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg cursor-pointer"
                        >
                            Create Form
                        </button>
                        <button
                            disabled={!fields.length}
                            onClick={() => clearForm()}
                            className="border border-blue-500 disabled:border-blue-300 text-blue-600 disabled:text-blue-300 hover:bg-blue-50 font-medium px-4 py-2 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </DndContext>
    )
}

export default FormBuilder;