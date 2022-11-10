import { ListTitle } from '../../styles/styledComponents/ListTitle';

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ isLoading, children }) => {
  return <>{isLoading ? <ListTitle>Loading...</ListTitle> : children}</>;
};

export default Loading;
