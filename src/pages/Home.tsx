// import { useContext } from "react";
// import { Context } from "../common/contexts/Context";
// import { useNavigate } from "react-router-dom";
import Button from "../common/components/Button";
import { Card } from "../common/components/Card";
import Title from "../common/components/Title";
import re_logo from "../assets/images/logo-rules-editor.png";

const HomePage = () => {
  // const { changeLoading, clearLoading } = useContext(Context);
  // const navigate = useNavigate();

  return (
    <div className="h-screen w-screen p-12">
      <div className="text-primary-20 flex justify-between items-center">
        <div>
          <Title className="mb-2">Rules Editor</Title>
          <Title className="mb-4" subTitle>Editor di Regole JSON per una gestione semplice e veloce</Title>
        </div>
        <img src={re_logo} className="h-12" />
      </div>

      <Card className="bg-neutral-100 h-fit w-full mt-8">
        <div className="text-primary-20 flex justify-between items-center">
          <div>
            Carica il file JSON e inizia a modificare le tue regole!
          </div>
          <Button text="Importa" className="bg-neutral-30 text-white px-4 py-2 rounded" />

        </div>
      </Card>
    </div>
  );
};

export default HomePage;
