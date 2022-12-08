export const GetEnvVariables = () => {
    
  //import.meta.env;

  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  };
};
