import { useEffect, useState, type FormEvent, } from "react";
import { useParams } from "react-router";
import type { Field, FormType } from "../types/field";

const PublicForm = () => {
    const { formId } = useParams<{ formId: string }>();
    const [form, setForm] = useState<FormType | null>(null);
    const [values, setValues] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/forms/${formId}`);
                const data = await res.json();

                const form = data?.form;
                setForm(form);
                const initialValues: Record<string, string> = {};
                form.fields.forEach((field: Field) => {
                    initialValues[field.id] = "";
                });
                setValues(initialValues);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
                setLoading(false);
            }
        };
        fetchForm();
    }, [formId]);

    const handleChange = (id: string, value: string) => {
        setValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/api/leads/${formId}/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) throw new Error("Submission failed");

            alert("Form submitted successfully!");
            setValues({});
        } catch (err) {
            alert("Something went wrong while submitting the form.");
        }
    };

    if (loading) return <div className="text-center mt-10 text-gray-600">Loading form...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
    if (!form) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{form.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {form.fields.map((field: Field) => (
                        <div key={field.id}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                            {renderInputField(field, values[field.id], handleChange)}
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};


const renderInputField = (
    field: { id: string; type: string; required: boolean },
    value: string,
    onChange: (id: string, value: string) => void
) => {
    switch (field.type) {
        case "text":
        case "email":
        case "phone":
            return (
                <input
                    type={field.type === "phone" ? "tel" : field.type}
                    value={value}
                    required={field.required}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            );
        case "file":
            return (
                <input
                    type="file"
                    required={field.required}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            );
        case "address":
            return (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input required={field.required} placeholder="Street" className="p-2 border rounded" />
                    <input required={field.required} placeholder="City" className="p-2 border rounded" />
                    <input required={field.required} placeholder="Postal Code" className="p-2 border rounded" />
                </div>
            );
        default:
            return <div className="text-red-500">Unsupported field type</div>;
    }
};



export default PublicForm;