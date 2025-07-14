import { useDraggable } from "@dnd-kit/core";
import type { FieldType } from "../types/field";

const fieldOptions: { type: FieldType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "phone", label: "Phone" },
  { type: "file", label: "File Upload" },
  { type: "address", label: "Address" },
];

const DraggableField = ({ type, label }: { type: FieldType; label: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${type}`,
    data: { type, label },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 border rounded cursor-move bg-white shadow"
      style={{ transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined }}
    >
      {label}
    </div>
  );
};

const FieldPalette = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Custom Fields</h2>
      <div className="flex flex-col gap-3">
        {fieldOptions.map((field) => (
          <DraggableField key={field.type} type={field.type} label={field.label} />
        ))}
      </div>
    </div>
  );
};

export default FieldPalette;
