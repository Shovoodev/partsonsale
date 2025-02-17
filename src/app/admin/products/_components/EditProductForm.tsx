"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import React, { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { addProduct, updateProduct } from "../../_actions/Products";
import { Product } from "@prisma/client";
import Image from "next/image";

export interface FormError {
  name?: string;
  priceInCents?: string;
  description?: string;
  file?: string;
  image?: string;
}

const EditProductForm = ({ product }: { product?: Product | null }) => {
  const [error, action] = useActionState(
    product === null
      ? addProduct
      : updateProduct.bind(null, product?.id as string),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents
  );
  console.log(error);

  return (
    <form action={action} className="space-y-8 ml-9">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={product?.name || ""}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
      </div>

      <div className="space-y-2">
        {priceInCents !== undefined
          ? formatCurrency(priceInCents / 100)
          : "N/A"}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" />
      </div>
      {product != null && (
        <div className="text-muted-foreground">{product.filePath}</div>
      )}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" />
      </div>
      {product != null && (
        <Image
          src={"/product.jpeg"}
          height="400"
          width="400"
          alt="Product Image"
        />
      )}
      <SubmitButton />
    </form>
  );
};

export default EditProductForm;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
