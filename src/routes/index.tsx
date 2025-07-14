
import { Routes, Route } from "react-router";
import FormBuilder from "../pages/FormBuilder";
import Leads from "../pages/leads";
import MainLayout from "../layout/main";

const RoutesComponent = () => {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<FormBuilder />} />
                <Route path="/leads" element={<Leads />} />
            </Route>
        </Routes>
    )
}

export default RoutesComponent;