import { useContext } from "react";
import { Context } from "../common/contexts/Context";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { changeLoading, clearLoading } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Home Page</h1>
      
      <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => changeLoading(1)}>
        Aggiungi Loader
      </button>

      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={clearLoading}>
        Reset Loader
      </button>

      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={() => navigate("/dashboard")}>
        Vai alla Dashboard
      </button>
    </div>
  );
};

export default HomePage;
