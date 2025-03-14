import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Login</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate("/dashboard")} // Simuliamo il login
      >
        Accedi
      </button>
    </div>
  );
};

export default LoginPage;
