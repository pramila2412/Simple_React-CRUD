import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0B3C5D', // Deep Blue
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#1CA7A6', // Teal
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#333333',
            secondary: '#666666',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            fontSize: '2.5rem',
            color: '#0B3C5D',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2rem',
            color: '#0B3C5D',
        },
        h5: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                },
                containedSecondary: {
                    backgroundColor: '#1CA7A6',
                    '&:hover': {
                        backgroundColor: '#158c8b',
                    },
                },
            },
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0B3C5D',
                    boxShadow: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    border: '1px solid #E0E0E0',
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 600,
                    color: '#333333',
                },
            },
        },
    },
});

export default theme;
