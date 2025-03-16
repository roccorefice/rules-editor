import { PropsWithChildren, useState } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { Context } from "./Context";
import Loader from "../components/Loader";

export const AppContext = ({ children }: PropsWithChildren) => {
    const [loading, setLoading] = useState(0);

    const changeLoading = (val: number) => {        
        setLoading((prev) => Math.max(0, prev + val));
    };

    const clearLoading = () => {
        setLoading(0);
    };

    return (
        <Context.Provider value={{ loading, changeLoading, clearLoading }}>
            {children}
            <Loader loading={loading} />
            <ToastContainer position="top-right" transition={Slide} autoClose={8000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
        </Context.Provider>
    );
};
