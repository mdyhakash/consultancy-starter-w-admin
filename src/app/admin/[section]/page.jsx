import SingletonView from "@/views/admin/SingletonView";

export async function generateMetadata({ params }) {
  const { section } = await params;
  return {
    title: `${section} - Admin CMS`,
  };
}

export default async function SingletonDynamicPage({ params }) {
  const { section } = await params;
  return <SingletonView sectionKey={section} />;
}
