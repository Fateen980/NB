import Head from 'next/head'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache , useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import { ThemeProvider }  from 'styled-components';
//import {Grid , Col , Row} from 'components/FlexBox/FlexBox'
import { defaultTheme }   from  'site-settings/site-theme/default';
import { GlobalStyle }    from  'assets/styles/global.style';
import  { ViewCustomer }  from 'components/customer/viewCustomers'
import  NavLink           from 'components/nav-link/nav-link'
import {Heading }         from 'components/customer/customer-style';




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
  onError: (e) => { console.log(e) },
});



export default function Customer() {

 
  const item = {id: null};

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <div >
      <Head>
        <title>Natural Beauty</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main >
      <Heading >
         <NavLink router="grocery" href="/grocery" label="Add New Customer" />
         <NavLink router="customer" href="/orders" label="add New Order" />
       </Heading>
        <h1 >
          View all customers
        </h1>


         <ViewCustomer />
        
      </main>

      <footer >
         
      </footer>
      </div>
      </ThemeProvider>
    </ApolloProvider>
  )
}
