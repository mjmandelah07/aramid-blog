import { useLocation, Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../../authClient';

export default function RequireAuth() {
  const location = useLocation();
  const isAuth = isAuthenticated();
  console.log(isAuth);

  return isAuth === true ? (
    <Outlet /> // Render child routes using Outlet
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.any
};
