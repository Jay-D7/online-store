import './App.css';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { SearchProvider } from './contexts/SearchContext';

export const App = () => (
  <SearchProvider>
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainContent />
    </div>
  </SearchProvider>
);
