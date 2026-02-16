import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Typography,
    Box,
    Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User } from '../types/user';
import { userFields } from '../config/userSchema';

interface UsersTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
    return (
        <TableContainer component={Box}>
            <Table sx={{ minWidth: 650 }} aria-label="users table">
                <TableHead sx={{ bgcolor: '#F1F5F9' }}>
                    <TableRow>
                        {userFields.map((field) => (
                            <TableCell key={field.key as string}>
                                {field.label}
                            </TableCell>
                        ))}
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={userFields.length + 1} align="center" sx={{ py: 8 }}>
                                <Typography color="text.secondary">
                                    No users found matching your criteria.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { bgcolor: '#F8FAFC' },
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                {userFields.map((field) => (
                                    <TableCell key={field.key as string}>
                                        {field.key === 'email' ? (
                                            <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                                                {user[field.key]}
                                            </Typography>
                                        ) : (
                                            user[field.key] || '-'
                                        )}
                                    </TableCell>
                                ))}
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Tooltip title="Edit Profile">
                                            <IconButton onClick={() => onEdit(user)} color="primary" size="small">
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Account">
                                            <IconButton onClick={() => onDelete(user)} color="error" size="small">
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
