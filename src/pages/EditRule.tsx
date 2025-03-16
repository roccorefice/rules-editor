import { useParams } from "react-router-dom";
import re_logo from "../assets/images/logo-rules-editor.png";
import Title from "../common/components/Title";
import { useRules } from "../common/hooks/useRules";
import { useEffect, useState } from "react";
import { Rule, RuleGroup } from "../common/models/RuleProps";
import { Card } from "../common/components/Card";
import DataTable from "../common/components/DataTable";
import { ColDef } from "ag-grid-community";

const EditRule = () => {
    const { group_id } = useParams();
    const { getRuleGroupById } = useRules();
    const [group, setGroup] = useState<RuleGroup | null>(null);

    useEffect(() => {
        if (group_id) {
            setGroup(getRuleGroupById(group_id) ?? null);
        }
    }, [group_id, getRuleGroupById, group]);


    const columns: ColDef<Rule>[] = [
        { field: "comparison_type", headerName: "Tipo di Confronto", flex: 2 },
        { field: "comparison_operator", headerName: "Operatore", flex: 1 },
        { field: "comparison_value_type", headerName: "Tipo Valore", flex: 1 },
        { field: "value", headerName: "Valore", flex: 2 },
    ];

    return (
        <div className="h-screen w-screen p-12">
            <div className="flex justify-between items-center">
                <div>
                    <Title className="mb-2">Rules Editor</Title>
                    <Title className="mb-4" subTitle>Modifica il gruppo di regole</Title>
                </div>
                <img src={re_logo} className="h-12" />
            </div>

            {group ? (
                <Card className="bg-neutral-100 h-fit w-full mt-8 !py-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-semibold text-primary-20">Regole del gruppo: {group.name}</h2>
                        {group.rules && group.rules.length > 0 && (
                            <span className="text-secondary-30 text-sm">
                                Numero di regole: {group.rules.length}
                            </span>
                        )}
                    </div>

                    <DataTable<Rule> columns={columns} data={group.rules ?? []} />

                </Card>
            ) : (
                <h2 className="text-error-50">Regola non trovata</h2>
            )}
        </div>
    );
};

export default EditRule;
