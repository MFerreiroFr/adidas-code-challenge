import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './state';
import TeamBuilder from './components/TeamBuilder';
import { GlobalStyle } from './styles/styledComponents/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
const App: React.FC = () => {
  return (
    <Provider store={setupStore()}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TeamBuilder />
      </ThemeProvider>
    </Provider>
  );
};
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
