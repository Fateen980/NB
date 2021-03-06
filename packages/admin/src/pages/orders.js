import dynamic from 'next/dynamic';
import AddOrder from 'components/order/order';

const PageLayout = dynamic(() => import('layouts/PageLayout'));

const Order = () => {
  const item = { id: null };

  return (
    <>
      <PageLayout>
        <AddOrder item={item} />
      </PageLayout>
    </>
  );
};

export default Order;
