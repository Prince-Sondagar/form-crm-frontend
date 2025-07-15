import type { BaseField } from "../types/field";



interface Props {
    field: BaseField;
}


const FieldRenderer = ({ field }: Props) => {


    return (
        <div className="flex flex-col gap-1">
            <div className="p-1 border-b-1 mb-2 border-gray-200">
                {/* <checkbox /> */}
                <p className="text-sm font-medium text-gray-500">Required Field</p>
            </div>
            {(() => {
                switch (field.type) {
                    case "text":
                    case "email":
                    case "phone":
                        return (
                            <input
                                type={field.type === "phone" ? "tel" : field.type}
                                className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter ${field.label}`}
                            />
                        );
                    case "file":
                        return <input type="file" className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />;
                    case "address":
                        return (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input placeholder="Street" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"  />
                                <input placeholder="City" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <input placeholder="Postal Code" className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        );
                    default:
                        return null;
                }
            })()}
        </div>
    );
}

export default FieldRenderer;