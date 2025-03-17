// import { useParams } from "react-router-dom";
// import re_logo from "../assets/images/logo-rules-editor.png";
// import Title from "../common/components/Title";
// import { useRules } from "../common/hooks/useRules";
// import { useEffect, useState } from "react";
// import { Rule, RuleGroup } from "../common/models/RuleProps";
// import { Card } from "../common/components/Card";
// import DataTable from "../common/components/DataTable";
// import { ColDef, ICellRendererParams, RowClickedEvent } from "ag-grid-community";
// import Button from "../common/components/Button";
// import ConfirmModal from "../common/components/ConfirmModal";
// import { toast } from "react-toastify";
// import { forceTableReload } from "../common/utility";
// import RuleForm from "../common/components/RuleForm";
// import { motion } from "framer-motion";

// const EditRule = () => {

//     // const navigate = useNavigate();
//     const { group_id } = useParams();
//     const { getRuleGroupById, removeRuleFromGroup, updateRuleInGroup } = useRules();
//     const [group, setGroup] = useState<RuleGroup | null>(null);
//     const [selectedRuleIndex, setSelectedRuleIndex] = useState<number | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);
//     const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

//     useEffect(() => {
//         if (group_id) {
//             setGroup(getRuleGroupById(group_id) ?? null);
//         }
//     }, [group_id, getRuleGroupById, group]);

//     const onRowClick = (event: RowClickedEvent) => {
//         if (!event.data) return;
//         console.log(event.data);
//     };

//     const handleDeleteRule = () => {
//         if (!group || selectedRuleIndex === null) return;

//         removeRuleFromGroup(group.group_id, selectedRuleIndex);
//         forceTableReload();
//         setIsModalOpen(false);
//         toast.success("Regola eliminata con successo!", { autoClose: 3000 });
//     };

//     // const handleEditRule = (rule: Rule) => {
//     //     setSelectedRule(rule);
//     //     setIsEditPanelOpen(true);
//     // };

//     const handleEditRule = (rule: Rule) => {
//         setSelectedRule({ ...rule }); 
//         setIsEditPanelOpen(true); // Assicuriamoci che la card venga sempre aperta
//     };

//     const handleSaveRule = (updatedRule: Rule) => {
//         if (group && selectedRuleIndex !== null) {
//             updateRuleInGroup(group.group_id, selectedRuleIndex, updatedRule);
//             setSelectedRule(null);
//         }
//     };

//     const columns: ColDef<Rule>[] = [
//         { field: "comparison_type", headerName: "Tipo di Confronto", flex: 2 },
//         { field: "comparison_operator", headerName: "Operatore", flex: 1 },
//         { field: "comparison_value_type", headerName: "Tipo Valore", flex: 1 },
//         { field: "value", headerName: "Valore", flex: 2 },
//         {
//             headerName: "Azioni",
//             flex: 1,
//             cellRenderer: (params: ICellRendererParams) => (
//                 <div className="flex items-center justify-start pt-1">
//                     <Button
//                         text="Modifica"
//                         className="bg-primary-50 text-white px-2 py-0 rounded text-xs"
//                         action={() => handleEditRule(params.data)}
//                     />
//                     <Button
//                         text="Elimina"
//                         className="bg-error-50 text-white px-2 py-0 rounded text-xs ml-2"
//                         action={() => {
//                             setSelectedRuleIndex(params.node.rowIndex);
//                             setIsModalOpen(true);
//                         }}
//                     />
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="h-screen w-screen p-12">
//             <div className="flex justify-between items-center">
//                 <div>
//                     <Title className="mb-2">Rules Editor</Title>
//                     <Title className="mb-4" subTitle>Modifica il gruppo di regole</Title>
//                 </div>
//                 <img src={re_logo} className="h-12" />
//             </div>

//             {group ? (
//                 <>
//                     <Card className="bg-neutral-100 w-full mt-8 !py-4 flex flex-col h-fit">
//                         <div className="flex items-center justify-between mb-8">
//                             <h2 className="font-semibold text-primary-20">Regole del gruppo: {group.name}</h2>
//                             {group.rules && group.rules.length > 0 && (
//                                 <span className="text-secondary-30 text-sm">
//                                     Numero di regole: {group.rules.length}
//                                 </span>
//                             )}
//                         </div>

//                         <DataTable<Rule>
//                             columns={columns}
//                             data={group?.rules ?? []}
//                             onRowClick={onRowClick}
//                             className="max-h-[220px]"
//                         />
//                     </Card>
//                     <ConfirmModal
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         onConfirm={handleDeleteRule}
//                         title="Conferma eliminazione"
//                     >
//                         <p className="text-primary-20">Sei sicuro di voler eliminare questa regola?</p>
//                     </ConfirmModal>
//                     {isEditPanelOpen && selectedRule && (
//                         <motion.div
//                         initial={{ x: "100%" }}
//                         animate={{ x: 0 }}
//                         exit={{ x: "100%" }}
//                         transition={{ duration: 0.3, ease: "easeOut" }}
//                         className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl p-6 z-50 flex flex-col"
//                         >
//                             <RuleForm
//                                 rule={selectedRule}
//                                 onSave={handleSaveRule}
//                                 onCancel={() => setIsEditPanelOpen(false)}
//                             />
//                         </motion.div>
//                     )}
//                 </>
//             ) : (
//                 <h2 className="text-error-50">Regola non trovata</h2>
//             )}
//         </div>
//     );
// };

// export default EditRule;


import { useNavigate, useParams } from "react-router-dom";
import re_logo from "../assets/images/logo-rules-editor.png";
import Title from "../common/components/Title";
import { useRules } from "../common/hooks/useRules";
import { useEffect, useState } from "react";
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

const EditRule = () => {
    const { group_id } = useParams();
    const { getRuleGroupById, removeRuleFromGroup, updateRuleInGroup } = useRules();
    const [group, setGroup] = useState<RuleGroup | null>(null);
    const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
    const [selectedRuleIndex, setSelectedRuleIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (group_id) {
            setGroup(getRuleGroupById(group_id) ?? null);
        }
    }, [group_id, getRuleGroupById]);

    const handleEditRule = (rule: Rule, index: number | null) => {
        setTimeout(() => {
            setSelectedRuleIndex(index);
            setSelectedRule({ ...rule });
        }, 25);
    };

    const handleSaveRule = (updatedRule: Rule) => {
        if (!group || selectedRuleIndex === null) return;

        updateRuleInGroup(group.group_id, selectedRuleIndex, updatedRule);
        setSelectedRule(null);
        setSelectedRuleIndex(null);
        toast.success("Regola modificata con successo!", { autoClose: 3000 });
    };

    const handleDeleteRule = () => {
        if (!group || selectedRuleIndex === null) return;

        removeRuleFromGroup(group.group_id, selectedRuleIndex);
        setIsModalOpen(false);
        forceTableReload();
        toast.success("Regola eliminata con successo!", { autoClose: 3000 });
    };

    const columns: ColDef<Rule>[] = [
        { field: "comparison_type", headerName: "Tipo di Confronto", flex: 2 },
        { field: "comparison_operator", headerName: "Operatore", flex: 1 },
        { field: "comparison_value_type", headerName: "Tipo Valore", flex: 1 },
        { field: "value", headerName: "Valore", flex: 2 },
        {
            headerName: "Azioni",
            flex: 1,
            cellRenderer: (params: ICellRendererParams) => (
                <div className="flex items-center space-x-2 pt-1">
                    <Button text="Modifica" className="bg-primary-50 text-white px-2 py-0 rounded text-xs" action={() => handleEditRule(params.data, params.node.rowIndex)} />
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
                    </div>
                    <img src={re_logo} className="h-12 cursor-pointer" onClick={() => navigate("/home")} />
                </div>

                {group ? (
                    <>
                        <Card className="bg-neutral-100 w-full mt-8 !py-4 flex flex-col h-fit">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="font-semibold text-primary-20">Regole del gruppo: {group.name}</h2>
                                {group.rules && group.rules.length > 0 && (
                                    <span className="text-secondary-30 text-sm">Numero di regole: {group.rules.length}</span>
                                )}
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


