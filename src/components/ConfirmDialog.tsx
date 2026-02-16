import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    onCancel: () => void; // Standardize with UsersPage
    onConfirm: () => void;
    title: string;
    message: string; // Match UsersPage naming
    confirmLabel?: string;
    loading?: boolean; // Match UsersPage naming
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onCancel,
    onConfirm,
    title,
    message,
    confirmLabel = 'Confirm',
    loading = false,
}) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    autoFocus
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
