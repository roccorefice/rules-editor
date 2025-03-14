import { ThreeDots } from "react-loader-spinner";

const Loader = ({ loading }: { loading: number }) => {

    return (
        loading > 0 && (
            <div className="flex fixed top-0 left-0 right-0 bottom-0 justify-center items-center bg-black bg-opacity-50 z-50">
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#F7A800"
                    radius="9"
                    ariaLabel="three-dots-loading"
                />
            </div>
        )
    );
};

export default Loader;
