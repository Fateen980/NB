import Head from 'next/head'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import dynamic from 'next/dynamic';
import { ThemeProvider }  from 'styled-components';
//import {Grid , Col , Row} from 'components/FlexBox/FlexBox'
import { defaultTheme }   from  'site-settings/site-theme/default';
import { GlobalStyle }    from  'assets/styles/global.style';
import  AddCustomer       from 'components/customer/customer'
import  ReactTable        from 'components/table/table'
import  NavLink           from 'components/nav-link/nav-link'
import {Heading }         from 'components/customer/customer-style';


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
  onError: (e) => { console.log(e) },
});



export default function Grocery() {

  const item = {id: null};

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <AppLayout>
  
        

       <AddCustomer  item={item}/>
       <Heading>
         <NavLink router="customer" href="/customer" label="View Customers" />
         <NavLink router="customer" href="/orders" label="add New Order" />
         <NavLink router="customer" href="/order" label="View Orders" />
       </Heading>
      </AppLayout>
      </ThemeProvider>
    </ApolloProvider>
  )
}
