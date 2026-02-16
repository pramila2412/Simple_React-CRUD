import React, { useState, useEffect, useMemo } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    InputBase,
    AppBar,
    Toolbar,
    Stack,
    Alert,
    Snackbar,
    alpha,
    styled,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import UsersTable from '../components/UsersTable';
import UserDialog from '../components/UserDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { getUsers, createUser, updateUser, deleteUser } from '../api/usersApi';
import type { User } from '../types/user';
import heroIllustration from '../assets/hero_illustration.png';

// --- Styled Components ---

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '40ch',
        },
    },
}));

// --- Main Page Component ---

const UsersPage: React.FC = () => {
    // State
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    // Data Fetching
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            // Fallback handled in API layer, just notify user
            showToast('Using local offline mode', 'info');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handlers
    const showToast = (message: string, severity: any = 'success') => {
        setToast({ open: true, message, severity });
    };

    const handleAddClick = () => {
        setCurrentUser(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (user: User) => {
        setCurrentUser(user);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setCurrentUser(user);
        setIsConfirmOpen(true);
    };

    const handleFormSubmit = async (values: Omit<User, 'id'>) => {
        setLoading(true);
        try {
            if (currentUser) {
                await updateUser(currentUser.id, values);
                showToast('Updated successfully');
            } else {
                await createUser(values as User);
                showToast('User created');
            }
            setIsFormOpen(false);
            fetchUsers();
        } catch (err) {
            showToast('Something went wrong', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!currentUser) return;
        setLoading(true);
        try {
            await deleteUser(currentUser.id);
            showToast('User deleted');
            setIsConfirmOpen(false);
            fetchUsers();
        } catch (err) {
            showToast('Could not delete user', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            Object.values(user).some(val =>
                String(val).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [users, searchQuery]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f1f5f9' }}>
            <AppBar position="sticky">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <MedicalInformationIcon sx={{ fontSize: 32, border: '2px solid white', borderRadius: 1, p: 0.2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                            MEDLINK
                        </Typography>
                    </Stack>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search directory..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Search>

                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={handleAddClick}
                        sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontWeight: 700 }}
                    >
                        Add User
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E2E8F0', py: { xs: 4, md: 8 }, mb: 4 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, color: '#0B3C5D', letterSpacing: -1.5 }}>
                                Admin <Box component="span" sx={{ color: '#1CA7A6' }}>Dashboard</Box>
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', mb: 4, maxWidth: 550 }}>
                                Manage registered hospitals, clinics, and staff users.
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={handleAddClick}
                                sx={{ px: 4, py: 1.5 }}
                            >
                                Create New Entry
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box
                                component="img"
                                src={heroIllustration}
                                sx={{ width: '100%', maxWidth: 400, float: 'right' }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ pb: 10 }}>
                <Paper sx={{ p: 0, overflow: 'hidden', borderRadius: 3, boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
                    <UsersTable
                        users={filteredUsers}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                </Paper>
            </Container>

            <Box component="footer" sx={{ py: 6, px: 2, mt: 'auto', bgcolor: '#0B3C5D', color: 'white' }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" sx={{ opacity: 0.6, textAlign: 'center' }}>
                        © 2026 MedLink India. All Rights Reserved. This platform only connects users.
                    </Typography>
                </Container>
            </Box>

            <UserDialog
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
                currentUser={currentUser}
                isSubmitting={loading}
            />

            <ConfirmDialog
                open={isConfirmOpen}
                title="Confirm Removal"
                message={`Are you sure you want to remove ${currentUser?.firstName}?`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsConfirmOpen(false)}
                loading={loading}
            />

            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={toast.severity as any} sx={{ width: '100%', borderRadius: 2 }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UsersPage;
