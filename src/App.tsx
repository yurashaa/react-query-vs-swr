import React from 'react';
import styled from 'styled-components';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { ReactQuery } from './components/react-query/ReactQuery';
import { Swr } from './components/swr/Swr';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 50000
        }
    },
    queryCache: new QueryCache({
        onError: (error, query) => {
            console.error(`Cache: something went wrong.`, error);
        }
    })
})

const Wrapper = styled.div`
  display: flex;
`

const QueryBlock = styled.div`
  width: 50%;
`

function App() {
  return (
    <Wrapper>
      <QueryBlock>
          <QueryClientProvider client={queryClient}>
              <ReactQuery />
              <ReactQueryDevtools />
          </QueryClientProvider>
      </QueryBlock>
      <QueryBlock>
          <Swr />
      </QueryBlock>
    </Wrapper>
  );
}

export default App;
