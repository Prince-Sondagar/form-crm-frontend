import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "../../components/sidebar";


const MainLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout;