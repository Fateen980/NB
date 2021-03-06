import dynamic from 'next/dynamic';
import { ViewCustomer } from 'components/customer/viewCustomers';

const PageLayout = dynamic(() => import('layouts/PageLayout'));

const Customer = () => {
  return (
    <>
      <PageLayout>
        <ViewCustomer />
      </PageLayout>
    </>
  );
};

export default Customer;
