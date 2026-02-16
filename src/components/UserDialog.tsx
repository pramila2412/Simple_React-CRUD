import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import DynamicForm from './DynamicForm';
import type { User } from '../types/user';
import { initialUser as defaultInitialUser } from '../config/userSchema';

interface UserDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (values: Omit<User, 'id'>) => void;
    currentUser?: User | null; // Match UsersPage naming
    isSubmitting?: boolean;
}

const UserDialog: React.FC<UserDialogProps> = ({
    open,
    onClose,
    onSubmit,
    currentUser,
    isSubmitting,
}) => {
    const isEdit = !!currentUser;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogContent>
                <DynamicForm
                    initialValues={currentUser || defaultInitialUser}
                    onSubmit={onSubmit}
                    onCancel={onClose}
                    submitLabel={isEdit ? 'Update' : 'Create'}
                    isSubmitting={isSubmitting}
                />
            </DialogContent>
        </Dialog>
    );
};

export default UserDialog;
