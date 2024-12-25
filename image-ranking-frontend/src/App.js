import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import ImageComparison from './components/ImageComparison';
import TopImages from './components/TopImages';

function App() {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Image Upload and Ranking System</h1>
        
        {/* Navigation Bar */}
        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#282c34',
          padding: '10px',
        }}>
          <Link to="/" style={{ color: '#61dafb', textDecoration: 'none', margin: '0 15px' }}>Upload Images</Link>
          <Link to="/compare" style={{ color: '#61dafb', textDecoration: 'none', margin: '0 15px' }}>Compare Images</Link>
          <Link to="/top" style={{ color: '#61dafb', textDecoration: 'none', margin: '0 15px' }}>Top Images</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<ImageUpload />} />
          <Route path="/compare" element={<ImageComparison />} />
          <Route path="/top" element={<TopImages />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
