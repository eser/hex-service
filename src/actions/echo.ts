const echoAction = (slug: string) => {
  return {
    message: `Hello ${slug}!`,
    timestamp: new Date().toLocaleDateString(),
  };
};

export { echoAction, echoAction as default };
