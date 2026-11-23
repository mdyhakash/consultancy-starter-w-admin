import FieldInput from "@/components/common/Formik/FieldInput";
import FieldSelect from "@/components/common/Formik/FieldSelect";
import FieldSwitch from "@/components/common/Formik/FieldSwitch";
import FieldDatePicker from "@/components/common/Formik/FieldDatePicker";
import Editor from "@/components/common/editor/Editor";
import FileUploaderInGallery from "@/components/common/FileUploaderInGallery";
import GroupField from "./GroupField";
import RepeaterField from "./RepeaterField";
import TabsField from "./TabsField";

/**
 * Extensible registry mapping schema field types directly to common starter components.
 * No duplicate compact wrappers needed - reuses common components directly.
 */
export const fieldRegistry = {
  text: FieldInput,
  textarea: (props) => <FieldInput {...props} multiline={true} rows={3} />,
  number: (props) => <FieldInput {...props} type="number" />,
  url: (props) => <FieldInput {...props} type="url" />,
  email: (props) => <FieldInput {...props} type="email" />,
  select: FieldSelect,
  toggle: FieldSwitch,
  date: FieldDatePicker,
  richtext: Editor,
  image: FileUploaderInGallery,
  video: FileUploaderInGallery,
  file: FileUploaderInGallery,
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
