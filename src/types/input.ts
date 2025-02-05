import React from 'react';

export interface BaseInputProps {
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    isEditable?: boolean;
}

export interface LabelInputProps extends BaseInputProps {
    label: string;
}
