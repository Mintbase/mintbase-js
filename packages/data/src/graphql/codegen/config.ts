
import type { CodegenConfig } from '@graphql-codegen/cli';
import {RPC_ENDPOINTS} from '@mintbase-js/sdk';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://graph.mintbase.xyz': {
        headers: {
          'mb-api-key' : 'anon'
        }
      },
    }
  ],
  // documents: 'src/**/*.tsx',
  generates: {
    'src/graphql/codegen/': {
      preset: 'client',
      plugins: [],
    },
    // './graphql.schema.json': {
    //   // plugins: ['introspection'],
    // },
  },
  config: {
    namingConvention: {
      transformUnderscore: true,
      typeNames: (str: string): string => {
        const replaced = str.replace(/([-_][a-z])/g, group =>
          group
            .toUpperCase()
            .replace('-', '')
            .replace('_', ''),
        );
        return `${replaced.charAt(0).toUpperCase()}${replaced.slice(1)}`;
      },
    },
  },
};

export default config;
