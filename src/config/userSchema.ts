import type { FieldSchema } from '../types/user';

export const userFields: FieldSchema[] = [
    {
        key: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'John',
        validation: {
            required: true,
            minLength: {
                value: 2,
                message: 'First name must be at least 2 characters',
            },
        },
        gridSize: 6,
    },
    {
        key: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Doe',
        validation: {
            required: true,
            minLength: {
                value: 2,
                message: 'Last name must be at least 2 characters',
            },
        },
        gridSize: 6,
    },
    {
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'john.doe@example.com',
        validation: {
            required: true,
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
            },
        },
        gridSize: 12,
    },
    {
        key: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: '123-456-7890',
        validation: {
            required: true,
            pattern: {
                value: /^\+?[0-9\s-]{10,}$/,
                message: 'Invalid phone number (10+ digits)',
            },
        },
        gridSize: 6,
    },
    {
        key: 'address',
        label: 'Address',
        type: 'text',
        required: false,
        placeholder: '123 Main St, Anytown',
        validation: {
            required: false,
        },
        gridSize: 12,
    },
];

export const initialUser = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
};
