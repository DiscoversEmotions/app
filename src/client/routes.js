const routes = {
  '/messages': {
    title: `Message`
  },
  '/messages/:user': {
    title: `Message History`
  },
  // You can also define nested route objects!
  // Just make sure each route key starts with a slash.
  '/': {
    title: `Home`,
    '/bio': {
      title: `Biographies`,
      '/:name': {
        title: `Biography for:`
      }
    }
  }
};

export default routes;
