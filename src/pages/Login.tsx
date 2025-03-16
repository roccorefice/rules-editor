import { Formik, Form, Field, ErrorMessage, FormikValues } from "formik";
import * as Yup from "yup";
import Button from "../common/components/Button";
import { Card } from "../common/components/Card";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../common/contexts/Context";
import re_logo from "../assets/images/logo-rules-editor.png";

const LoginPage = () => {
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();
    const ctx = useContext(Context);

    const validationSchema = Yup.object({
        username: Yup.string().required("Campo obbligatorio"),
        password: Yup.string().required("Campo obbligatorio")
    });
    const initialValues: { username: string; password: string } = {
        username: "",
        password: ""
    };

    const handleSubmit = (values: FormikValues) => {
        ctx.changeLoading(1);

        setTimeout(() => {
            if (values.username === "admin" && values.password === "Password01") {
                setLoginError(null);
                navigate("/home");
            } else {
                setLoginError("Credenziali non valide. Riprova.");
            }
            ctx.clearLoading();
        }, 2000);
    };


    return (
        <div className="login-form">
            <Card className="w-fit m-auto">
                <div className="p-6 flex flex-col items-center">
                    <img src={re_logo} className="h-16 mb-4" />
                    <h1 className="text-2xl font-bold text-primary-0 mb-4">Accedi</h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        validateOnChange
                        enableReinitialize
                    >
                        {({ isValid }) => (
                            <Form className="w-80 flex flex-col">
                                <label htmlFor="username" className="text-sm font-medium text-primary-0 text-left mt-4">Username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    className="border border-primary-20 bg-neutral-100 rounded px-3 py-2 w-full mt-1 outline-none text-primary-20"
                                />
                                <ErrorMessage name="username" component="div" className="text-error-50 text-left text-sm mt-1" />

                                <label htmlFor="password" className="text-sm font-medium text-primary-0 text-left mt-4">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="border border-primary-20 bg-neutral-100 rounded px-3 py-2 w-full mt-1 outline-none text-primary-20"
                                />
                                <ErrorMessage name="password" component="div" className="text-error-50 text-left text-sm mt-1" />

                                {loginError && <div className="text-error-50 text-sm mt-3">{loginError}</div>}

                                <Button
                                    text="Accedi"
                                    type="submit"
                                    className="bg-neutral-30 text-white px-4 py-2 rounded mt-8"
                                    disabled={!isValid}
                                />
                            </Form>
                        )}
                    </Formik>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
