import dynamic from 'next/dynamic';

const PageLayout = dynamic(() => import('layouts/PageLayout'));

const ProfilePage  = ({ children }) => {

  return (
    <>
      <PageLayout>
        Fateen
      </PageLayout>
     
    </>
  );
};

export default ProfilePage;
