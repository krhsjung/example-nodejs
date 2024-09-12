export const OK = { code: 0, message: "OK" };

export const convertJoiToJson = (schema) => {
  const schemaDescription = schema.describe();
  const keys = schemaDescription.keys;

  const result = {};
  Object.keys(keys).forEach((key) => {
    result[key] = keys[key].type; // type을 추출하여 할당
  });
  return result;
}