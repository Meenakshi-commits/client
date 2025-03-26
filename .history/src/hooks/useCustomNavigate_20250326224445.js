import { useNavigate } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();

  const goToDashboard = (role) => {
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else if (role === 'resident') {
      navigate('/resident/dashboard');
    } else {
      navigate('/');
    }
  };

  return { goToDashboard };
};

export default useCustomNavigate;
