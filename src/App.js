import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhonebookItem from './components/PhonebookItem';
import PhonebookAdd from './components/PhonebookAdd'; // Import the correct component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhonebookItem />} />
        <Route path="/add" element={<PhonebookAdd />} /> {/* Use the imported component */}
      </Routes>
    </Router>
  );
}

export default App;