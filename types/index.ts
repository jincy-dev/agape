import { insertProductSchema insertCartSchema, cartItemSchema} from "@/lib/validators";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating:number;
  createdAt:Date;
};

export type CartItem=z.infer<typeof insertCartSchema>;
export type Cart=z.infer<typeof cartItemSchema>;