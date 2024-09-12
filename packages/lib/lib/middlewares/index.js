import { ResponseType } from "../responses/index.js";

export const checkValidation = (validator, key) => {
  return (req, res, next) => {
    const requestData = req[key];
    const validation = validator.validate(requestData);
    if (validation.error) {
      console.log(`validation error: ${validation.error}`);
      res.status(200).json({
        ...ResponseType.DATA_FORMAT_ERROR,
        message: validation.error
      });
      return;
    }

    req.requestData = validation.value;
    next();
  };
};

export const wrapAsyncController = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};