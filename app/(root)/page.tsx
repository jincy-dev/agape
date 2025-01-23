import React from "react";
import ProductList from "@/components/ui/shared/poduct/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <div>
      <ProductList
        data={latestProducts}
        title="Newest Arrival"
        limit={4}
      />
    </div>
  );
};

export default HomePage;
