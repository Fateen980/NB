import   { NextPage }   from 'next';
import   { Modal }    from "@redq/reuse-modal"
import   { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import dynamic from 'next/dynamic';
import   { ThemeProvider }  from 'styled-components';
import   { GlobalStyle }    from  'assets/styles/global.style';
import   {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'features/user-profile/user-profile.style';

import { defaultTheme }    from  'site-settings/site-theme/default';
import { SEO }             from 'components/seo';
import  { ViewCustomer }   from 'components/customer/viewCustomers'



import Sidebar from 'features/user-profile/sidebar/sidebar';
const AppLayout = dynamic(() => import('layouts/app-layout'));


function createIsomorphLink() {
    return new HttpLink({
      uri: 'http://localhost:4000/admin/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    });
  }


const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: createIsomorphLink(),
  cache: new InMemoryCache(),
});



const PageLayout  = ({ children }) => {

  return (
    <>
      <SEO title="Profile - Sit & Choose" description="Profile Details" />
      <Modal>
      <ApolloProvider client={client}>
      <ThemeProvider  theme={defaultTheme}>
      <GlobalStyle />

      <AppLayout>
       
          <PageWrapper>
            <SidebarSection>
            <Sidebar />
            </SidebarSection>
            <ContentBox>
              { children }
            </ContentBox>

           
          </PageWrapper>
          
          </AppLayout>
       </ThemeProvider>
    </ApolloProvider>
    </Modal>
    </>
  );
};

export default PageLayout;
