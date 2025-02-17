import { Button } from "@/components/ui/button";
import PageHeader from "../_components/PageHeader";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/db/db";
import { CheckCircle, MoreVertical, XCircle } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ActiveDropDownTroggleMenu,
  DeleteDropdownItem,
} from "./_components/ProductAction";

export default function AdminProductPage() {
  return (
    <>
      <div className=" flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new"> Add Product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
}

async function ProductTable() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      filePath: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });
  if (products.length === 0) return <p> no Products found</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className=" sr-only"> available for purchase</span>
          </TableHead>
          <TableHead>name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>orders</TableHead>
          <TableHead className=" w-0">
            <span className=" sr-only"> Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <CheckCircle />
              ) : (
                <XCircle className=" stroke-orange-900" />
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents)}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-slate-400 p-2 rounded-md text-black">
                  <DropdownMenuItem asChild>
                    <a download href={`/admin/products/${product.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <ActiveDropDownTroggleMenu
                    id={product.id}
                    isAvailableForPurchase={product.isAvailableForPurchase}
                  />
                  <DropdownMenuSeparator />
                  <DeleteDropdownItem
                    id={product.id}
                    disabled={product._count.orders > 0}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
