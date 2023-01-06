jest.mock('graphql-request');

jest.mock('@mintbase-js/sdk', () => ({
  mbjs: {
    keys: {
      isSet: true,
    },
  },
}));
