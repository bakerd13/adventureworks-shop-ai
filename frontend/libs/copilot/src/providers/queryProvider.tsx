import { ReactNode } from 'react';
import { Platform } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const QueryProvider = ({queryClient, children} : {queryClient: QueryClient; children: ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {Platform.OS === 'web' &&  (/true/).test(process.env.EXPO_PUBLIC_DEBUG_REACT_QUERY ?? 'false') && <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />}
    </QueryClientProvider>
  );
};

export default QueryProvider;
