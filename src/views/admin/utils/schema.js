import * as yup from "yup";
import buildYupSchema from "@/components/admin/buildYupSchema";
import { extractDefaultValues } from "./data";

/**
 * Builds validation schema for a singleton section
 */
export function getSingletonSchema(fields = []) {
  return buildYupSchema(fields);
}

/**
 * Computes default values for a singleton section
 */
export function getSingletonDefaults(fields = [], remoteData = {}) {
  const baseDefaults = extractDefaultValues(fields);
  return {
    ...baseDefaults,
    ...(remoteData || {}),
  };
}

/**
 * Builds validation schema for a collection item
 */
export function getCollectionSchema(fields = []) {
  return buildYupSchema(fields);
}

/**
 * Computes default values for a collection item
 */
export function getCollectionDefaults(fields = [], remoteData = null, isNew = false) {
  const baseDefaults = extractDefaultValues(fields);
  if (isNew) {
    return baseDefaults;
  }
  if (!remoteData) {
    return null;
  }
  return {
    ...baseDefaults,
    ...remoteData,
  };
}

/**
 * Login validation schema and initial values
 */
export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const loginDefaults = {
  email: "admin@example.com",
  password: "password",
};

export { buildYupSchema };
