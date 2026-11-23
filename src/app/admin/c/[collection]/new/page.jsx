import CollectionEditView from "@/views/admin/CollectionEditView";

export async function generateMetadata({ params }) {
  const { collection } = await params;
  return {
    title: `New ${collection} Item - Admin CMS`,
  };
}

export default async function CollectionNewItemPage({ params }) {
  const { collection } = await params;
  return <CollectionEditView collectionKey={collection} id="new" />;
}
