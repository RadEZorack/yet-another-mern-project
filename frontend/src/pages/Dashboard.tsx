import { useParams, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <div>
      <h1>Dashboard for User {id}</h1>
      <button onClick={goToProfile}>Go to Profile</button>
    </div>
  );
};

export default Dashboard;