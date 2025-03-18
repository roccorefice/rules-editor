import { useNavigate, useParams } from "react-router-dom";
import re_logo from "../assets/images/logo-rules-editor.png";
import Title from "../common/components/Title";
import { useRules } from "../common/hooks/useRules";
import { useContext, useEffect, useState } from "react";
import { Rule, RuleGroup } from "../common/models/RuleProps";
import { Card } from "../common/components/Card";
import DataTable from "../common/components/DataTable";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import Button from "../common/components/Button";
import ConfirmModal from "../common/components/ConfirmModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import RuleForm from "../common/components/RuleForm";
import { forceTableReload } from "../common/utility";
import { Context } from "../common/contexts/Context";

const EditRule = () => {
    const { group_id, group_name } = useParams();
    const { getRuleGroupById, removeRuleFromGroup, updateRuleInGroup, addRuleToGroup } = useRules();
    const [group, setGroup] = useState<RuleGroup | null>(null);
    const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
    const [selectedRuleIndex, setSelectedRuleIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const ctx = useContext(Context);

    useEffect(() => {
        if (group_id && group_name) {
            setGroup(getRuleGroupById(group_id, group_name) ?? null);
        }
    }, [group_id, group_name, getRuleGroupById]);

    const handleEditRule = (rule: Rule, index: number | null) => {
        setTimeout(() => {
            setSelectedRuleIndex(index);
            setSelectedRule({ ...rule });
        }, 25);
    };

    const handleSaveRule = (updatedRule: Rule) => {
        ctx.changeLoading(1);

        setTimeout(() => {
            if (!group) return;

            if (selectedRuleIndex !== null) {
                updateRuleInGroup(group.group_id, selectedRuleIndex, updatedRule);
                toast.success("Regola modificata con successo!", { autoClose: 3000 });
            } else {
                addRuleToGroup(group.group_id, updatedRule);
                toast.success("Regola aggiunta con successo!", { autoClose: 3000 });
            }
            ctx.clearLoading();
            setSelectedRule(null);
            setSelectedRuleIndex(null);
            forceTableReload();
        }, 1000);
    };

    const handleAddRule = () => {
        setSelectedRule({ comparison_type: "", comparison_operator: "", comparison_value_type: "str", value: "" });
        setSelectedRuleIndex(null);
    };

    const handleDeleteRule = () => {
        ctx.changeLoading(1);
        setTimeout(() => {
            if (!group || selectedRuleIndex === null) return;

            removeRuleFromGroup(group.group_id, selectedRuleIndex);
            setIsModalOpen(false);
            forceTableReload();
            toast.success("Regola eliminata con successo!", { autoClose: 3000 });
            ctx.clearLoading();
        }, 500);
    };

    const columns: ColDef<Rule>[] = [
        { field: "comparison_type", headerName: "Tipo di Confronto", flex: 2 },
        { field: "comparison_operator", headerName: "Operatore", flex: 1 },
        { field: "comparison_value_type", headerName: "Tipo Valore", flex: 1 },
        {
            field: "value",
            headerName: "Valore",
            flex: 2,
            cellRenderer: (params: { value: string[] | string | boolean | number }) => {
                if (Array.isArray(params.value)) {
                    return params.value.join(", ");
                }
                if (typeof params.value === "boolean") {
                    return params.value ? "True" : "False";
                }
                return params.value;
            },
        },
        {
            headerName: "Azioni",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center space-x-2 pt-1">
                    <Button text="Modifica" className="bg-accent-50 text-white px-2 py-0 rounded text-xs" action={() => handleEditRule(params.data, params.node.rowIndex)} />
                    {!selectedRule && (
                        <Button text="Elimina" className="bg-error-50 text-white px-2 py-0 rounded text-xs" action={() => {
                            setSelectedRuleIndex(params.node.rowIndex);
                            setIsModalOpen(true);
                        }} />
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="h-screen w-screen p-12 grid gap-4 transition-all">

            <div className={`flex-grow transition-all ${selectedRule ? "w-[65%]" : "w-full"}`}>
                <div className="flex justify-between items-center">
                    <div>
                        <Title className="mb-2">Rules Editor</Title>
                        <Title className="mb-4" subTitle>Modifica il gruppo di regole</Title>
                        <Button text="<<< Vai indietro" className="text-sm text-primary-20 font-semibold" action={() => { navigate("/home") }} />
                    </div>
                    <img src={re_logo} className="h-12 cursor-pointer" onClick={() => navigate("/home")} />
                </div>

                {group ? (
                    <>
                        <Card className="bg-neutral-100 w-full mt-8 !py-4 flex flex-col h-fit">
                            <div className="flex justify-between items-center mb-8">

                                <div className="flex-col items-center justify-between ">
                                    <h2 className="font-semibold text-primary-20">Regole del gruppo: {group.name}</h2>
                                    {group.rules && group.rules.length > 0 && (
                                        <span className="text-secondary-30 text-sm">Numero di regole: {group.rules.length}</span>
                                    )}
                                </div>
                                <div>
                                    <Button text="Aggiungi regola" className="bg-primary-20 borde text-white px-4 py-2 rounded" action={handleAddRule} />
                                </div>
                            </div>
                            <DataTable<Rule> columns={columns} data={group?.rules ?? []} className="max-h-[220px]" />
                        </Card>

                        <ConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteRule} title="Conferma eliminazione">
                            <p className="text-primary-20">Sei sicuro di voler eliminare questa regola?</p>
                        </ConfirmModal>
                    </>
                ) : (
                    <h2 className="text-error-50">Regola non trovata</h2>
                )}
            </div>

            {selectedRule && (
                <motion.div
                    key={selectedRule?.comparison_type}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-1/3 flex flex-col bg-white p-8 pt-12 shadow-lg border-l border-gray-300 min-w-[280px] absolute top-0 bottom-0 right-0"
                >
                    <RuleForm rule={selectedRule} onSave={handleSaveRule} onCancel={() => setSelectedRule(null)} />
                </motion.div>
            )}
        </div>
    );
};

export default EditRule;


