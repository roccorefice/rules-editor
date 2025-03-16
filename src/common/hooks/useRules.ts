import { useState } from "react";
import { RuleCondition, RuleGroup } from "../models/RuleProps";
import { toast } from "react-toastify";

export const useRules = () => {
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([]);

  /** ✅ Carica i gruppi di regole da un file JSON */
  const loadRules = (json: RuleGroup[]) => {
    if (!Array.isArray(json)) {
      console.error("Errore: Il file JSON non è un array di regole.", json);
      toast.error("Errore nel caricamento del file JSON");
      return;
    }
    setRuleGroups(json);
    console.log("Regole caricate:", json);
    toast.success("Regole aggiunte con successo!", { className: "bg-success" });
  };

  /** ✅ Aggiunge un nuovo gruppo di regole */
  const addRuleGroup = (group: RuleGroup) => {
    setRuleGroups((prevGroups) => [...prevGroups, group]);
  };

  /** ✅ Rimuove un gruppo di regole in base all'ID */
  const removeRuleGroup = (group_id: string) => {
    setRuleGroups((prevGroups) =>
      prevGroups.filter((group) => group.group_id !== group_id)
    );
  };

  /** ✅ Modifica un gruppo di regole */
  const updateRuleGroup = (
    group_id: string,
    updatedGroup: Partial<RuleGroup>
  ) => {
    setRuleGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.group_id === group_id ? { ...group, ...updatedGroup } : group
      )
    );
  };

  /** ✅ Aggiunge una nuova regola a un gruppo specifico */
  const addRuleToGroup = (group_id: string, newRule: RuleCondition) => {
    setRuleGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.group_id === group_id
          ? { ...group, rules: [...group.rules, newRule] }
          : group
      )
    );
  };

  /** ✅ Rimuove una regola da un gruppo specifico */
  const removeRuleFromGroup = (group_id: string, ruleIndex: number) => {
    setRuleGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.group_id === group_id
          ? {
              ...group,
              rules: group.rules.filter((_, index) => index !== ruleIndex),
            }
          : group
      )
    );
  };

  /** ✅ Modifica una singola regola all'interno di un gruppo */
  const updateRuleInGroup = (
    group_id: string,
    ruleIndex: number,
    updatedRule: Partial<RuleCondition>
  ) => {
    setRuleGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.group_id === group_id
          ? {
              ...group,
              rules: group.rules.map((rule, index) =>
                index === ruleIndex ? { ...rule, ...updatedRule } : rule
              ),
            }
          : group
      )
    );
  };

  /** ✅ Resetta tutte le regole */
  const resetRules = () => {
    setRuleGroups([]);
  };

  return {
    ruleGroups,
    loadRules,
    addRuleGroup,
    removeRuleGroup,
    updateRuleGroup,
    addRuleToGroup,
    removeRuleFromGroup,
    updateRuleInGroup,
    resetRules,
  };
};
