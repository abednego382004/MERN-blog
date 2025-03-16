export const errorHandler = (statusCode, mes) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = mes;
  return error;
};
