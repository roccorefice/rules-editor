import { useContext } from "react";
import { RulesContext, RulesContextType } from "../contexts/RulesContext";

export const useRulesContext = (): RulesContextType => {
  const context = useContext(RulesContext);
  if (!context) {
    throw new Error("useRulesContext deve essere usato dentro RulesProvider");
  }
  return context;
};
