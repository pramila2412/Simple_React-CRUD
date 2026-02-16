import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { userFields } from '../config/userSchema';
import type { User } from '../types/user';

interface DynamicFormProps {
    initialValues: Partial<User>;
    onSubmit: (values: Omit<User, 'id'>) => void;
    onCancel: () => void;
    submitLabel?: string;
    isSubmitting?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
    submitLabel = 'Save',
    isSubmitting = false,
}) => {
    const [values, setValues] = useState<Partial<User>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    const validateField = (key: string, value: any): string => {
        const field = userFields.find((f) => f.key === key);
        if (!field || !field.validation) return '';

        const { validation } = field;

        if (validation.required && (!value || String(value).trim() === '')) {
            return `${field.label} is required`;
        }

        if (validation.minLength && String(value).length < validation.minLength.value) {
            return validation.minLength.message;
        }

        if (validation.pattern && !validation.pattern.value.test(String(value))) {
            return validation.pattern.message;
        }

        return '';
    };

    const handleChange = (key: string, value: any) => {
        setValues((prev) => ({ ...prev, [key]: value }));
        if (touched[key]) {
            setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
        }
    };

    const handleBlur = (key: string) => {
        setTouched((prev) => ({ ...prev, [key]: true }));
        setErrors((prev) => ({ ...prev, [key]: validateField(key, values[key]) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};
        let isValid = true;

        userFields.forEach((field) => {
            const error = validateField(field.key as string, values[field.key]);
            if (error) {
                newErrors[field.key as string] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        setTouched(userFields.reduce((acc, field) => ({ ...acc, [field.key]: true }), {}));

        if (isValid) {
            onSubmit(values as Omit<User, 'id'>);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2.5}>
                {userFields.map((field) => (
                    <Grid size={field.gridSize || 12} key={field.key}>
                        <TextField
                            id={field.key as string}
                            name={field.key as string}
                            label={field.label}
                            value={values[field.key] || ''}
                            onChange={(e) => handleChange(field.key as string, e.target.value)}
                            onBlur={() => handleBlur(field.key as string)}
                            error={!!errors[field.key]}
                            helperText={errors[field.key]}
                            type={field.type}
                            required={field.validation?.required}
                            placeholder={field.placeholder}
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4, mb: 1 }}>
                <Button
                    onClick={onCancel}
                    disabled={isSubmitting}
                    variant="text"
                    color="inherit"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={isSubmitting}
                    sx={{ px: 4 }}
                >
                    {isSubmitting ? 'Processing...' : submitLabel}
                </Button>
            </Stack>
        </Box>
    );
};

export default DynamicForm;
