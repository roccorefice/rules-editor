export interface RuleCondition {
  comparison_type: string;
  comparison_operator: string;
  comparison_value_type: "str" | "int" | "bool" | "list_str";
  value: string | number | boolean | string[];
}

export interface RuleGroup {
  group_id: string;
  name: string;
  rules: RuleCondition[];
  operator: "AND" | "OR";
}
