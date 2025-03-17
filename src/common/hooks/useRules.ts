import { Rule, RuleGroup } from "../models/RuleProps";
import { toast } from "react-toastify";
import { useRulesContext } from "./useRulesContext";
import { useEffect } from "react";

export const useRules = () => {
  const { ruleGroups, setRuleGroups } = useRulesContext();

  /** Carica i gruppi di regole da un file JSON */
  const loadRules = (json: RuleGroup[]) => {
    if (!Array.isArray(json)) {
      toast.error("Errore nel caricamento del file JSON");
      return;
    }
    setRuleGroups(json);
    toast.success("Regole caricate con successo!", {
      className: "bg-success",
      autoClose: 2000,
    });
    console.log(ruleGroups);
  };

  /** 🔥 DA ELIMINARE */
  useEffect(() => {
    console.log("Regole caricate:", ruleGroups);
  }, [ruleGroups]);

  /** Restituisce un gruppo di regole per ID */
  const getRuleGroupById = (group_id: string): RuleGroup | undefined => {
    return ruleGroups.find((group) => group.group_id === group_id);
  };

  /** Aggiunge un nuovo gruppo di regole */
  const addRuleGroup = (group: RuleGroup) => {
    setRuleGroups([...ruleGroups, group]);
  };

  /** Rimuove un gruppo di regole */
  const removeRuleGroup = (group_id: string) => {
    setRuleGroups(ruleGroups.filter((group) => group.group_id !== group_id));
  };

  /** Modifica un gruppo di regole */
  const updateRuleGroup = (
    group_id: string,
    updatedGroup: Partial<RuleGroup>
  ) => {
    setRuleGroups(
      ruleGroups.map((group) =>
        group.group_id === group_id ? { ...group, ...updatedGroup } : group
      )
    );
  };

  /** Aggiunge una regola a un gruppo */
  const addRuleToGroup = (group_id: string, newRule: Rule) => {
    setRuleGroups(
      ruleGroups.map((group) =>
        group.group_id === group_id
          ? { ...group, rules: [...(group.rules ? group.rules : []), newRule] }
          : group
      )
    );
  };

  /** Rimuove una regola da un gruppo */
  const removeRuleFromGroup = (group_id: string, ruleIndex: number) => {
    setRuleGroups((prevGroups: RuleGroup[]) => {
      return prevGroups.map((group) => {
        if (group.group_id === group_id) {
          return {
            ...group,
            rules: group.rules
              ? group.rules.filter((_, index) => index !== ruleIndex)
              : [],
          };
        }
        return group;
      });
    });
  };

  /** Resetta tutte le regole */
  const resetRules = () => {
    setRuleGroups([]);
  };

    /** ✅ Modifica una regola specifica in un gruppo */
    const updateRuleInGroup = (
      group_id: string,
      ruleIndex: number,
      updatedRule: Rule
    ) => {
      setRuleGroups((prevGroups: RuleGroup[]) =>
        prevGroups.map((group) =>
          group.group_id === group_id
            ? {
                ...group,
                rules: group.rules
                  ? group.rules.map((rule, index) =>
                      index === ruleIndex ? updatedRule : rule
                    )
                  : [],
              }
            : group
        )
      );
  
      toast.success("Regola aggiornata con successo!", {
        className: "bg-success",
        autoClose: 2000,
      });
    };

  return {
    ruleGroups,
    loadRules,
    getRuleGroupById,
    addRuleGroup,
    removeRuleGroup,
    updateRuleGroup,
    addRuleToGroup,
    resetRules,
    removeRuleFromGroup,
    updateRuleInGroup
  };
};
