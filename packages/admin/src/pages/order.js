import dynamic from 'next/dynamic';
import { ViewOrder } from 'components/order/ViewOrder';

const PageLayout = dynamic(() => import('layouts/PageLayout'));

const Order = () => {
  return (
    <>
      <PageLayout>
        <ViewOrder />
      </PageLayout>
    </>
  );
};

export default Order;
