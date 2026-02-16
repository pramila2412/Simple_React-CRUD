import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import UsersPage from './pages/UsersPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UsersPage />
    </ThemeProvider>
  );
}

export default App;
