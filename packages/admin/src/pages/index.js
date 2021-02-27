import Head from 'next/head'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from  'site-settings/site-theme/default';
import { GlobalStyle }  from  'assets/styles/global.style';
import  AddCustomer     from 'components/customer/customer'
import  ReactTable      from 'components/table/table'




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



export default function Home() {

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
        <h1 >
          Welcome to <a href="/">Natural Beauty!</a>
        </h1>

    
        <AddCustomer  item={item}/>

      </main>

      <footer >
          Natural Beauty
      </footer>
      </div>
      </ThemeProvider>
    </ApolloProvider>
  )
}
