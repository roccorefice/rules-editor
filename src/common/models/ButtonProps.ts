export interface ButtonProps {
  type?: "submit" | "button" | undefined;
  text: string;
  className?: string;
  action?: () => void | ((values: object) => void);
  disabled?: boolean;
  form?: string;
}
