// #region Imports
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getFeed, selectFeedLoading, selectFeedOrders } from '@slices';
import { useDispatch, useSelector } from '../../services/store';
// #endregion

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
