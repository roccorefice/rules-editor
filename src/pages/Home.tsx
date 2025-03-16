import { useContext, useState } from "react";
import { Context } from "../common/contexts/Context";
// import { useNavigate } from "react-router-dom";
import { Card } from "../common/components/Card";
import Title from "../common/components/Title";
import re_logo from "../assets/images/logo-rules-editor.png";
import { useRules } from "../common/hooks/useRules";
import { toast } from "react-toastify";
import Button from "../common/components/Button";
import ConfirmModal from "../common/components/ConfirmModal";

const HomePage = () => {
  // const { changeLoading, clearLoading } = useContext(Context);
  // const navigate = useNavigate();
  const { ruleGroups, loadRules, resetRules } = useRules();
  const ctx = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    ctx.changeLoading(1);

    setTimeout(() => {

      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          loadRules(json);
        } catch (error) {
          console.error(error);
          toast.error("Errore nel caricamento delle regole")
        }
      };
      reader.readAsText(file);

      ctx.clearLoading();
    }, 2000);
  };

  return (
    ruleGroups && (
      <div className="h-screen w-screen p-12">
        <div className="text-primary-20 flex justify-between items-center">
          <div>
            <Title className="mb-2">Rules Editor</Title>
            <Title className="mb-4" subTitle>Editor di Regole JSON per una gestione semplice e veloce</Title>
          </div>
          <img src={re_logo} className="h-12" />
        </div>

        <Card className="bg-neutral-100 h-fit w-full mt-8 !py-6">
          {ruleGroups.length == 0 ? (
            <div className="text-primary-20 flex justify-between items-center">
              <div>
                Carica il file JSON e inizia a modificare le tue regole
              </div>
              <div>
                <input type="file" accept="application/json" onChange={handleFileUpload} className="hidden" id="fileUpload" />
                <label htmlFor="fileUpload" className="bg-primary-20 text-white px-4 py-2 rounded cursor-pointer">
                  Importa Regole
                </label>
              </div>
            </div>

          ) : (
            <>
              <div className="text-primary-20 flex justify-between items-center">
                <div>
                  Regole caricate: {ruleGroups?.length}
                </div>
                <Button text="Resetta regole" className="bg-neutral-90 border border-primary-20 text-primary-20 px-4 py-2 rounded" action={() => setIsModalOpen(true)} />
              </div>
              <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                  toast.warning("Regole resettate con successo!")
                  resetRules()
                  setIsModalOpen(false);
                }}
                title="Sei sicuro?"
              >
                <p className="text-primary-20">Questa azione non può essere annullata.</p>
              </ConfirmModal>
            </>
          )
          }
        </Card>
      </div>
    )

  );
};

export default HomePage;
