import SingletonView from "@/views/admin/SingletonView";

export const metadata = {
  title: "Site Settings - Admin CMS",
};

export default function AdminSettingsPage() {
  return <SingletonView sectionKey="settings" />;
}
