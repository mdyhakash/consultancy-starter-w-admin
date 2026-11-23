/**
 * Helper utilities and data constants for Admin views
 */

/**
 * Extracts default values from a list of field definitions
 *
 * @param {Array} fields - Field definitions array
 * @returns {Object} Key-value map of default values
 */
export function extractDefaultValues(fields = []) {
  const defaults = {};

  (fields || []).forEach((field) => {
    if (field.default !== undefined) {
      defaults[field.name] = field.default;
    } else if (field.type === "repeater") {
      defaults[field.name] = [];
    } else if (field.type === "toggle") {
      defaults[field.name] = false;
    } else if (field.type === "group") {
      defaults[field.name] = {};
    }
  });

  return defaults;
}

/**
 * Derives a singular label from a plural string
 *
 * @param {string} label - Plural label (e.g. "Countries")
 * @param {string} fallback - Fallback if label is missing
 * @returns {string} Singular label (e.g. "Country")
 */
export function getSingularLabel(label, fallback = "") {
  if (!label) return fallback;
  if (label.endsWith("ies")) {
    return `${label.slice(0, -3)}y`;
  }
  return label.replace(/s$/, "");
}

export const PAGINATION_LIMITS = [10, 20, 50];
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
