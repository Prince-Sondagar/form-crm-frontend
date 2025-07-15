
import { Routes, Route } from "react-router";
import Leads from "../pages/leads";
import MainLayout from "../layout/main";
import FormBuilder from "../pages/formBuilder";
import PublicForm from "../pages/publicForm";

const RoutesComponent = () => {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<FormBuilder />} />
                <Route path="/leads" element={<Leads />} />
            </Route>
            <Route path="/forms/:formId" element={<PublicForm />} />
        </Routes>
    )
}

export default RoutesComponent;