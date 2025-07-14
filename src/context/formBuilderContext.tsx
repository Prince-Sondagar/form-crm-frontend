import React, { createContext, useContext, useState } from "react";
import type { BaseField } from "../types/field";

interface FormBuilderContextType {
    formName: string;
    setFormName: (name: string) => void;
    fields: BaseField[];
    addField: (field: BaseField) => void;
    updateField: (id: string, updatedData: Partial<BaseField>) => void;
    deleteField: (id: string) => void;
    reorderFields: (fromIndex: number, toIndex: number) => void
    clearForm: () => void
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);



export const FormBuilderProvider = ({ children }: { children: React.ReactNode }) => {
    const [fields, setFields] = useState<BaseField[]>([]);
    const [formName, setFormName] = useState("");

    const addField = (field: BaseField) => {
        setFields((prev) => [...prev, field]);
    };

    const updateField = (id: string, updatedData: Partial<BaseField>) => {
        setFields((prev) =>
            prev.map((f) => (f.id === id ? { ...f, ...updatedData } : f))
        );
    };

    const deleteField = (id: string) => {
        setFields((prev) => prev.filter((f) => f.id !== id));
    };

    const reorderFields = (fromIndex: number, toIndex: number) => {
        setFields((prev) => {
            const updated = [...prev];
            const [movedItem] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, movedItem);
            return updated;
        });
    };

    const clearForm = () => {
        setFields([])
    }


    return (
        <FormBuilderContext.Provider
            value={{
                fields,
                addField,
                formName,
                setFormName,
                updateField,
                deleteField,
                reorderFields,
                clearForm
            }}
        >
            {children}
        </FormBuilderContext.Provider>
    )
}

export const useFormBuilder = () => {
    const context = useContext(FormBuilderContext);
    if (!context) {
        throw new Error("useFormBuilder must be used within FormBuilderProvider");
    }
    return context;
}