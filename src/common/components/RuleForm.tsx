import { Rule, RuleFormProps } from "../models/RuleProps";
import Button from "../components/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { comparisonOperators, comparisonTypes, comparisonValueTypes } from "../enums/enum";
import { motion } from "framer-motion";
import FormikInputField from "./FormikInputField";

const RuleForm: React.FC<RuleFormProps> = ({ rule, onSave, onCancel }) => {

    const initialValues: Rule = {
        comparison_type: rule?.comparison_type || "",
        comparison_operator: rule?.comparison_operator || "",
        comparison_value_type: (rule?.comparison_value_type || "str") as "str" | "int" | "bool" | "list_str",
        value: rule?.value || "",
    };
    const validationSchema = Yup.object({
        comparison_type: Yup.string().required("Campo obbligatorio"),
        comparison_operator: Yup.string().required("Campo obbligatorio"),
        comparison_value_type: Yup.string()
            .oneOf(comparisonValueTypes)
            .required("Campo obbligatorio"),
        value: Yup.mixed()
            .test(
                "is-valid-value",
                "Campo obbligatorio",
                function (value) {
                    const comparisonType = this.parent.comparison_value_type;
    
                    if (comparisonType === "list_str") {
                        return Array.isArray(value) && value.length > 0;
                    }
    
                    return value !== null && value !== undefined && value !== "";
                }
            ),
    });
    

    return (
        <motion.div>
            <h2 className="font-semibold text-primary-20">{rule ? "Modifica Regola" : "Aggiungi Nuova Regola"}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSave}
                enableReinitialize
                validateOnMount
            >
                {({ values, isValid }) => (
                    <Form className="flex flex-col gap-4 mt-4">
                        {/* Tipo di Confronto */}
                        <div>
                            <label className="text-primary-20 font-medium text-sm">Tipo di Confronto</label>
                            <Field as="select" name="comparison_type" className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 w-full">
                                <option value="">Seleziona...</option>
                                {comparisonTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Field>
                        </div>

                        {/* Operatore */}
                        <div>
                            <label className="text-primary-20 font-medium text-sm">Operatore</label>
                            <Field as="select" name="comparison_operator" className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 w-full">
                                <option value="">Seleziona...</option>
                                {comparisonOperators.map((op) => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </Field>
                        </div>

                        {/* Tipo Valore */}
                        <div>
                            <label className="text-primary-20 font-medium text-sm">Tipo di Valore</label>
                            <Field as="select" name="comparison_value_type" className="border border-primary-20 text-primary-20 bg-neutral-100 rounded px-3 py-2 w-full">
                                {comparisonValueTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Field>
                        </div>

                        {/* Valore - Gestione dinamica con FormikInputField */}
                        <div>
                            <label className="text-primary-20 font-medium text-sm">Valore</label>
                            <FormikInputField name="value" valueType={values.comparison_value_type} comparisonType={values.comparison_type} />
                        </div>

                        {/* Bottoni */}
                        <div className="flex justify-between items-center gap-x-4 mt-6">
                            <Button text="Annulla" className="bg-secondary-90 text-black px-4 py-2 rounded w-1/2" action={onCancel} />
                            <Button text="Salva" type="submit" className="bg-primary-30 text-white px-4 w-1/2 py-2 rounded" disabled={!isValid} />
                        </div>
                    </Form>
                )}
            </Formik>
        </motion.div>
    );
};

export default RuleForm;

