import CollectionEditView from "@/views/admin/CollectionEditView";

export async function generateMetadata({ params }) {
  const { collection, id } = await params;
  return {
    title: `Edit ${collection} #${id} - Admin CMS`,
  };
}

export default async function CollectionEditItemPage({ params }) {
  const { collection, id } = await params;
  return <CollectionEditView collectionKey={collection} id={id} />;
}
