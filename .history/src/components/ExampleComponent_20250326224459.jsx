import React from 'react';
import useCustomNavigate from '../hooks/useCustomNavigate';

const ExampleComponent = () => {
  const { goToDashboard } = useCustomNavigate();

  const handleNavigation = () => {
    const role = localStorage.getItem('role');
    goToDashboard(role);
  };

  return (
    <button onClick={handleNavigation} className="btn btn-primary">
      Go to Dashboard
    </button>
  );
};

export default ExampleComponent;
