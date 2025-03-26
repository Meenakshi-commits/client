import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExampleComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/some-path');
  };

  return (
    <button onClick={handleNavigation} className="btn btn-primary">
      Go to Some Path
    </button>
  );
};

export default ExampleComponent;
