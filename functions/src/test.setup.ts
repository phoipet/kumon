export default () => {
  process.env = Object.assign(process.env, {
    FIREBASE_CONFIG: '{}',
    GCLOUD_PROJECT: 'test-project',
  });
};
