
import React from "react";
import { cn } from "@/lib/utils";
const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  const stringValue = value.toFixed(2);
  const [intValue, floatValue] = stringValue.split(".");

  return <p className={cn("text-2xl", className)}>
    <div className="span text-xs align-super">$</div>
    {intValue}
    <div className="span text-xs align-super">.{floatValue}</div>
  </p>;
};

export default ProductPrice;
