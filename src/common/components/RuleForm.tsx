import { Rule } from "../models/RuleProps";
import Button from "../components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { comparisonOperators, comparisonTypes, comparisonValueTypes, fieldOptions } from "../enums/enum";
import { motion } from "framer-motion";

interface RuleFormProps {
    rule: Rule | null;
    onSave: (updatedRule: Rule) => void;
    onCancel: () => void;
}


const RuleForm: React.FC<RuleFormProps> = ({ rule, onSave, onCancel }) => {
    const formik = useFormik({
        initialValues: rule || {
            comparison_type: "",
            comparison_operator: "",
            comparison_value_type: "str",
            value: "",
        },
        validationSchema: Yup.object({
            comparison_type: Yup.string().required("Campo obbligatorio"),
            comparison_operator: Yup.string().required("Campo obbligatorio"),
            comparison_value_type: Yup.string().oneOf(comparisonValueTypes).required("Campo obbligatorio"),
            value: Yup.string().required("Campo obbligatorio"),
        }),
        onSubmit: onSave,
    });

    return (
        <motion.div>
            <h2 className="font-semibold text-primary-20">{rule ? "Modifica Regola" : "Aggiungi Nuova Regola"}</h2>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-4">
                {/* Tipo di Confronto */}
                <label className="text-primary-20 font-medium">Tipo di Confronto</label>
                <select
                    name="comparison_type"
                    value={formik.values.comparison_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 outline-none"
                >
                    <option value="">Seleziona...</option>
                    {comparisonTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                {formik.touched.comparison_type && formik.errors.comparison_type && (
                    <p className="text-error-50 text-sm">{formik.errors.comparison_type}</p>
                )}

                {/* Operatore */}
                <label className="text-primary-20 font-medium">Operatore</label>
                <select
                    name="comparison_operator"
                    value={formik.values.comparison_operator}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 outline-none"
                >
                    <option value="">Seleziona...</option>
                    {comparisonOperators.map((op) => (
                        <option key={op} value={op}>
                            {op}
                        </option>
                    ))}
                </select>
                {formik.touched.comparison_operator && formik.errors.comparison_operator && (
                    <p className="text-error-50 text-sm">{formik.errors.comparison_operator}</p>
                )}

                {/* Tipo Valore */}
                <label className="text-primary-20 font-medium">Tipo di Valore</label>
                <select
                    name="comparison_value_type"
                    value={formik.values.comparison_value_type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 outline-none"
                >
                    {comparisonValueTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>

                {/* Valore */}
                <select
                    name="value"
                    // value={Array.isArray(formik.values.value) ? formik.values.value : [formik.values.value]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    multiple={true} // Permette selezione multipla
                    className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 outline-none"
                >
                    {fieldOptions["search_status"].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="mt-auto flex justify-between">
                    <Button text="Annulla" className="bg-neutral-80 px-4 py-2 rounded" action={onCancel} />
                    <Button text="Salva" type="submit" className="bg-primary-50 px-4 py-2 rounded text-white" />
                </div>
            </form>
        </motion.div>
    );
};


export default RuleForm;
