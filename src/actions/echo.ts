const echoAction = (slug: string): string => {
  return `Hello ${slug}!`;
};

export { echoAction, echoAction as default };
