import PageHeader from "@/app/admin/_components/PageHeader";
import db from "@/db/db";
import EditProductForm from "../../_components/EditProductForm";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  return (
    <>
      <PageHeader> Edit Product</PageHeader>
      <EditProductForm product={product} />
    </>
  );
}
