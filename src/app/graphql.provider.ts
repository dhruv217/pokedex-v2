import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { LocalStorageWrapper, persistCacheSync } from 'apollo3-cache-persist';

const uri = 'https://beta.pokeapi.co/graphql/v1beta'; // <-- add the URL of the GraphQL server here
export function apolloOptionsFactory(): ApolloClientOptions<any> {
  const cache = new InMemoryCache();

  persistCacheSync({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });
  const httpLink = inject(HttpLink);
  return {
    link: httpLink.create({ uri }),
    cache: cache,
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
