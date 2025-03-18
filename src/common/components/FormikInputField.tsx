import { Field, FormikValues, useFormikContext } from "formik";
import { fieldOptions } from "../enums/enum";
import { FormikInputFieldProps } from "../models/FormikInputFieldProps";

const FormikInputField: React.FC<FormikInputFieldProps> = ({ name, valueType, comparisonType }) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    if (valueType === "list_str" && comparisonType && fieldOptions[comparisonType]) {
        return (
            <div className="flex flex-col gap-2 rounded p-3 bg-neutral-100">
                {fieldOptions[comparisonType].map((option) => (
                    <label key={option} className="flex items-center gap-2 text-primary-20 cursor-pointer">
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
                            className="w-5 h-5 appearance-none border-2 border-secondary-20 rounded-sm checked:bg-secondary-20 checked:border-secondary-20 checked:text-white checked:after:content-['✔'] checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-white checked:after:text-xs transition-all duration-200"
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
