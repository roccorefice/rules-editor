export interface RuleGroup {
  group_id: string;
  name: string;
  rules?: Rule[];
  operator?: "AND" | "OR";
  rules_count?: string;
}
export interface RuleGroupTable {
  group_id: string;
  group_name: string;
  rules_count: number;
}
export interface Rule {
  comparison_type: string;
  comparison_operator: string;
  comparison_value_type: "str" | "int" | "bool" | "list_str";
  value: string | number | boolean | string[];
}

// export interface RuleTable {
//   group_id: string;
//   group_name: string;
//   rules_count: number;
// }
