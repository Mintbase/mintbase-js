
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://interop-mainnet.hasura.app/v1/graphql',
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
        console.log('working?', str, `${replaced.charAt(0).toUpperCase()}${replaced.slice(1)}`);
        return `${replaced.charAt(0).toUpperCase()}${replaced.slice(1)}`;
      },
    },
  },
};

export default config;
