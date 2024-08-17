import { validateDataSchema } from "./validateDataSchema.middleware copy";
import { validateDataSchemaByList } from "./validateDataSchemaByList.middleware";

const validationsMiddlewares = {
  validateDataSchema,
  validateDataSchemaByList
};

export default validationsMiddlewares;
