import CompactFieldInput from "./fields/CompactFieldInput";
import CompactFieldSelect from "./fields/CompactFieldSelect";
import CompactFieldSwitch from "./fields/CompactFieldSwitch";
import CompactFieldDatePicker from "./fields/CompactFieldDatePicker";
import CompactEditor from "./fields/CompactEditor";
import CompactGalleryUploader from "./fields/CompactGalleryUploader";
import GroupField from "./fields/GroupField";
import RepeaterField from "./fields/RepeaterField";
import TabsField from "./fields/TabsField";

/**
 * Extensible registry mapping schema field types to UI components.
 * Adding a new field type across the entire CMS only requires adding one entry here.
 */
export const fieldRegistry = {
  text: CompactFieldInput,
  textarea: (props) => <CompactFieldInput {...props} multiline={true} />,
  number: (props) => <CompactFieldInput {...props} type="number" />,
  url: (props) => <CompactFieldInput {...props} type="url" />,
  email: (props) => <CompactFieldInput {...props} type="email" />,
  select: CompactFieldSelect,
  toggle: CompactFieldSwitch,
  date: CompactFieldDatePicker,
  richtext: CompactEditor,
  image: CompactGalleryUploader,
  video: CompactGalleryUploader,
  file: CompactGalleryUploader,
  group: GroupField,
  repeater: RepeaterField,
  tabs: TabsField,
};

export const getFieldComponent = (type) => {
  return fieldRegistry[type] || fieldRegistry.text;
};

export const registerFieldType = (type, component) => {
  fieldRegistry[type] = component;
};

export default fieldRegistry;
