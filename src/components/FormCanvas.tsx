import { useDroppable } from "@dnd-kit/core";
import { useFormBuilder } from "../context/formBuilderContext";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableField from "./SortableField";


const FormCanvas = () => {
    const { fields, formName, setFormName } = useFormBuilder();
    const { setNodeRef } = useDroppable({
        id: "form-canvas",
    });


    return (
        <div
            ref={setNodeRef}
            className="min-h-[300px] bg-white border-gray-400 rounded"
        >
            {fields.length === 0 ? (
                <div className="border border-dashed p-4 bg-white border-gray-400 rounded">
                    <h2 className="text-lg text-center font-semibold mb-2 pt-5">Start Creating!</h2>
                    <p className="text-gray-400 text-center">Drag Fields from the left panel and drop here to add in your form.</p>
                </div>
            ) : (
                <>
                    <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Add Form Name"
                        className="w-full p-2 border mb-4 border border-dashed"
                    />
                    <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((field) => (
                            <SortableField key={field.id} id={field.id} field={field} />
                        ))}
                    </SortableContext>
                </>
            )}
        </div>
    );
};

export default FormCanvas;
