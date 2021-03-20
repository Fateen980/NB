import React           from 'react';
import dynamic         from 'next/dynamic';
import { NextPage }    from 'next';
import { SEO }         from 'components/seo';
import { useRouter }   from 'next/router';
import { Modal }       from '@redq/reuse-modal';
import SettingsContent from 'features/user-profile/settings/settings';
import ProductSingleWrapper, {
       ProductSingleContainer,
} from 'assets/styles/product-single.style';


const PageLayout = dynamic(() => import('layouts/PageLayout'));

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  },
  params:any
};

const OrderPage: NextPage<Props> = ({ deviceType , params }) => {

  const { slug } = params


  return (
    <>
     <PageLayout>
      <SEO
        title="- Natural Beauty"
        description='Details'
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
              <SettingsContent deviceType={deviceType} slug={slug} />
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
      </PageLayout>
    </>
  );
};


export function getServerSideProps(context) {
  return {
    props: {params: context.params}
  };
}

export default OrderPage;
