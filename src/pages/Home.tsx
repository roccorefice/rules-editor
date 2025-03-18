import { useContext, useState } from "react";
import { Context } from "../common/contexts/Context";
import { useNavigate } from "react-router-dom";
import { Card } from "../common/components/Card";
import Title from "../common/components/Title";
import re_logo from "../assets/images/logo-rules-editor.png";
import { useRules } from "../common/hooks/useRules";
import { toast } from "react-toastify";
import Button from "../common/components/Button";
import ConfirmModal from "../common/components/ConfirmModal";
import { Rule, RuleGroupTable } from "../common/models/RuleProps";
import DataTable from "../common/components/DataTable";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const { ruleGroups, loadRules, resetRules } = useRules();
  const ctx = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColDef[] = [
    { field: "group_id", headerName: "ID Gruppo", width: 120 },
    { field: "group_name", headerName: "Nome Gruppo", flex: 1 },
    { field: "rules_count", headerName: "Numero di regole", width: 150 },
  ];

  const rowData: RuleGroupTable[] = ruleGroups.map((group) => ({
    group_id: group.group_id,
    group_name: group.name,
    rules_count: group.rules?.length ?? 0,
  }));


  const onRowClick = (event: RowClickedEvent) => {
    ctx.changeLoading(1);
    setTimeout(() => {
      if (!event.data) return;
      const group_id = event.data.group_id;
      const group_name = event.data.group_name;
      navigate(`/edit/${group_name}/${group_id}`);
      ctx.clearLoading();
    }, 1000);
  };

  const validateRulesJson = (json: JSON) => {
    if (!Array.isArray(json)) return false;

    return json.every((group) =>
      typeof group.group_id === "string" &&
      typeof group.name === "string" &&
      Array.isArray(group.rules) &&
      (group.operator === "AND" || group.operator === "OR") &&
      group.rules.every((rule: Rule) =>
        typeof rule.comparison_type === "string" &&
        typeof rule.comparison_operator === "string" &&
        ["str", "int", "bool", "list_str"].includes(rule.comparison_value_type) &&
        (typeof rule.value === "string" ||
          typeof rule.value === "number" ||
          typeof rule.value === "boolean" ||
          (Array.isArray(rule.value) && rule.value.every(v => typeof v === "string")))
      )
    );
  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    ctx.changeLoading(1);

    setTimeout(() => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);

          if (!validateRulesJson(json)) {
            toast.error("Il file JSON non è valido. Controlla la struttura dei dati.", {
              autoClose: 2000,
            });
            return;
          }

          loadRules(json);
          toast.success("Regole caricate con successo!", {
            className: "bg-success",
            autoClose: 2000,
          });
        } catch (error) {
          console.error(error);
          toast.error("Errore nel caricamento delle regole", {
            autoClose: 2000,
          });
        }
      };
      reader.readAsText(file);
      ctx.clearLoading();
    }, 200);
  };

  const downloadRulesJson = () => {
    ctx.changeLoading(1);

    setTimeout(() => {
      const jsonString = JSON.stringify(ruleGroups, null, 2); 
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "rules.json"; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      ctx.clearLoading();

    }, 1000);
  };

  return (
    ruleGroups && (
      <div className="h-screen w-screen p-12">
        <div className="flex justify-between items-center">
          <div>
            <Title className="mb-2">Rules Editor</Title>
            <Title className="mb-4" subTitle>Editor di Regole JSON per una gestione semplice e veloce</Title>
          </div>
          <img src={re_logo} className="h-12" />
        </div>

        <Card className="bg-neutral-100 h-fit w-full mt-8 !py-4">
          {ruleGroups.length == 0 ? (
            <div className="text-primary-20 flex justify-between items-center">
              <div>
                Carica il file JSON e inizia a modificare le tue regole
              </div>
              <div className="my-2">
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
                <div>
                  <Button text="Resetta regole" className="bg-neutral-90 border border-primary-20 text-primary-20 px-4 py-2 rounded" action={() => setIsModalOpen(true)} />
                  <Button text="Scarica JSON" className="bg-primary-20 text-white px-4 py-2 rounded ml-4" action={downloadRulesJson} />

                </div>
              </div>

              <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                  toast.warning("Regole resettate con successo!", {
                    autoClose: 2000,
                  })
                  ctx.changeLoading(1);
                  setTimeout(() => {
                    resetRules()
                    setIsModalOpen(false);
                    ctx.clearLoading();
                  }, 1000);

                }}
                title="Sei sicuro?"
              >
                <p className="text-primary-20">Questa azione non può essere annullata.</p>
              </ConfirmModal>
            </>
          )
          }
        </Card>

        {ruleGroups.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Card className="bg-neutral-100 h-fit w-full mt-8 !py-4">
              <DataTable<RuleGroupTable> columns={columns} data={rowData} onRowClick={onRowClick} />

            </Card>
          </motion.div>


        )}
      </div>
    )

  );
};

export default Home;
