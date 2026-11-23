import * as yup from "yup";

/**
 * Dynamically builds a Yup validation schema from admin field definitions.
 * Recursively supports groups, repeaters, and tabbed fields.
 */
export function buildYupSchema(fields = []) {
  const shape = {};

  const processField = (field) => {
    if (!field || !field.name) return;

    let validator;

    switch (field.type) {
      case "text":
      case "textarea":
        validator = yup.string();
        if (field.maxLength) {
          validator = validator.max(
            field.maxLength,
            `Must be at most ${field.maxLength} characters`
          );
        }
        if (field.required) {
          validator = validator.required(`${field.label || field.name} is required`);
        } else {
          validator = validator.nullable().optional();
        }
        break;

      case "email":
        validator = yup.string();
        if (field.required) {
          validator = validator
            .required(`${field.label || field.name} is required`)
            .email("Must be a valid email address");
        } else {
          validator = validator
            .email("Must be a valid email address")
            .nullable()
            .optional()
            .transform((curr, orig) => (orig === "" ? null : curr));
        }
        break;

      case "url":
        validator = yup.string();
        if (field.required) {
          validator = validator
            .required(`${field.label || field.name} is required`)
            .url("Must be a valid URL starting with http:// or https://");
        } else {
          validator = validator
            .url("Must be a valid URL")
            .nullable()
            .optional()
            .transform((curr, orig) => (orig === "" ? null : curr));
        }
        break;

      case "number":
        validator = yup
          .number()
          .transform((value, originalValue) =>
            originalValue === "" || originalValue === null || originalValue === undefined
              ? null
              : Number(originalValue)
          )
          .typeError(`${field.label || field.name} must be a valid number`);

        if (field.required) {
          validator = validator.required(`${field.label || field.name} is required`);
        } else {
          validator = validator.nullable().optional();
        }
        break;

      case "toggle":
        validator = yup.boolean().default(Boolean(field.default));
        break;

      case "date":
        // FieldDatePicker stores a "yyyy-MM-dd" string. Validate as string.
        validator = yup.string();
        if (field.required) {
          validator = validator.required(`${field.label || field.name} is required`);
        } else {
          validator = validator.nullable().optional();
        }
        break;

      case "select":
        validator = yup.mixed();
        if (field.required) {
          validator = validator.required(`${field.label || field.name} is required`);
        } else {
          validator = validator.nullable().optional();
        }
        break;

      case "richtext":
        validator = yup.string();
        if (field.required) {
          validator = validator.required(`${field.label || field.name} is required`);
        } else {
          validator = validator.nullable().optional();
        }
        break;

      case "image":
      case "video":
      case "file":
        validator = yup.mixed().nullable();
        if (field.required) {
          validator = validator.test(
            "media-required",
            `${field.label || field.name} is required`,
            (value) => {
              if (Array.isArray(value)) return value.length > 0;
              return value !== null && value !== undefined && value !== "";
            }
          );
        } else {
          validator = validator.optional();
        }
        break;

      case "group":
        if (Array.isArray(field.fields)) {
          validator = buildYupSchema(field.fields);
        } else {
          validator = yup.object().optional();
        }
        break;

      case "repeater":
        if (Array.isArray(field.fields)) {
          const itemSchema = buildYupSchema(field.fields);
          validator = yup.array().of(itemSchema);
          if (field.required) {
            validator = validator.min(1, `At least one item is required in ${field.label || field.name}`);
          } else {
            validator = validator.optional();
          }
        } else {
          validator = yup.array().optional();
        }
        break;

      case "tabs":
        if (Array.isArray(field.tabs)) {
          // Flatten tab fields into the parent shape
          field.tabs.forEach((tab) => {
            if (Array.isArray(tab.fields)) {
              tab.fields.forEach(processField);
            }
          });
          return;
        }
        break;

      default:
        validator = yup.mixed().optional();
    }

    if (validator) {
      shape[field.name] = validator;
    }
  };

  fields.forEach(processField);

  return yup.object().shape(shape);
}

export default buildYupSchema;
