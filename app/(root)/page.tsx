import React from "react";
import ProductList from "@/components/shared/poduct/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Product } from "@/types";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <div>
      <ProductList
        data={latestProducts as unknown  as Product[]}
        title="Newest Arrival"
        limit={4}
      />
    </div>

  );
};

export default HomePage;
