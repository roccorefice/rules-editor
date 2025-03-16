import { createContext, useState, PropsWithChildren } from "react";
import { RuleGroup } from "../models/RuleProps";

export interface RulesContextType {
  ruleGroups: RuleGroup[];
  setRuleGroups: (groups: RuleGroup[]) => void;
}

export const RulesContext = createContext<RulesContextType | undefined>(undefined);

export const RulesProvider = ({ children }: PropsWithChildren) => {
  const [ruleGroups, setRuleGroups] = useState<RuleGroup[]>([]);

  return (
    <RulesContext.Provider value={{ ruleGroups, setRuleGroups }}>
      {children}
    </RulesContext.Provider>
  );
};
