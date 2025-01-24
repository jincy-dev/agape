"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div>
        {images.map((image, index) => (
          <div key={image} onClick={() => setCurrent(index)}>
            <Image src={image} alt="image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
