const mongoAction = (slug: string) => {
  return {
    message: `Hello ${slug}!`,
    timestamp: new Date().toLocaleDateString(),
  };
};

export { mongoAction, mongoAction as default };
