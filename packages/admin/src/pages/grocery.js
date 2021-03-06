import dynamic from 'next/dynamic';

import AddCustomer from 'components/customer/customer';

const PageLayout = dynamic(() => import('layouts/PageLayout'));

const Grocery = ({ children }) => {
  const item = { id: null };
  return (
    <>
      <PageLayout>
        <AddCustomer item={item} />
      </PageLayout>
    </>
  );
};

export default Grocery;
