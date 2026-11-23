import { Suspense } from "react";
import CollectionListView from "@/views/admin/CollectionListView";

export async function generateMetadata({ params }) {
  const { collection } = await params;
  return {
    title: `${collection} - Admin CMS`,
  };
}

export default async function CollectionDynamicListPage({ params }) {
  const { collection } = await params;
  return (
    <Suspense fallback={<div className="py-12 text-center text-sm text-muted-foreground">Loading collection...</div>}>
      <CollectionListView collectionKey={collection} />
    </Suspense>
  );
}
