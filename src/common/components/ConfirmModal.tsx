import React from "react";
import Button from "./Button";
import { ConfirmModalProps } from "../models/ConfirmModalProps";

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    className = "",
    children,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
                <h2 className="text-lg font-bold mb-4 text-primary-20">{title}</h2>
                <div className="mb-4">{children}</div>
                <div className="grid grid-cols-2 gap-2 mt-8">
                    <Button
                        text="Annulla"
                        className="bg-secondary-90 text-black px-4 py-2 rounded w-full"
                        action={onClose}
                    />
                    <Button
                        text="Conferma"
                        className="bg-primary-30 text-white px-4 py-2 rounded w-full"
                        action={onConfirm}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
