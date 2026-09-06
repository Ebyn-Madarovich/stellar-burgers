// #region Imports
import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { selectIsAuthChecked, selectUser } from '@slices';
import { useSelector } from '../../services/store';
// #endregion

// #region Types
type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};
// #endregion

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  // Проверка авторизации ещё идёт
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Страница для авторизованных, но пользователя нет
  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Страница для неавторизованных, но пользователь уже вошёл
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
