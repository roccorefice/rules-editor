import { Field, FormikValues, useFormikContext } from "formik";
import { fieldOptions } from "../enums/enum";

interface FormikInputFieldProps {
    name: string;
    valueType: string;
    comparisonType?: string;
}

const FormikInputField: React.FC<FormikInputFieldProps> = ({ name, valueType, comparisonType }) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    if (valueType === "list_str" && comparisonType && fieldOptions[comparisonType]) {
        return (
            <div className="flex flex-col gap-2 rounded p-3 bg-neutral-100">
                {fieldOptions[comparisonType].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-primary-20">
                        <input
                            type="checkbox"
                            name={name}
                            value={option}
                            checked={Array.isArray(values[name]) && values[name].includes(option)}
                            onChange={(e) => {
                                const newValue = Array.isArray(values[name]) ? [...values[name]] : [];
                                if (e.target.checked) {
                                    newValue.push(option);
                                } else {
                                    const index = newValue.indexOf(option);
                                    if (index > -1) newValue.splice(index, 1);
                                }
                                setFieldValue(name, newValue);
                            }}
                            className="w-4 h-4 text-primary-20"
                        />
                        {option}
                    </label>
                ))}
            </div>
        );
    }

    if (valueType === "bool") {
        return (
            <Field as="select" name={name} className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 w-full">
                <option value="true">True</option>
                <option value="false">False</option>
            </Field>
        );
    }

    return (
        <Field
            type={valueType === "int" ? "number" : "text"}
            name={name}
            className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 w-full"
        />
    );
};

export default FormikInputField;
