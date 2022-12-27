import Header from "../Header";
import Sidebar from "../Sidebar/Sidebar";

function DefaultLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <Header />
                <div>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;