import { Product } from "@/lib/microcms";

export type VariantSize = "S" | "M" | "L";

/**
 * Resolves the authoritative price for a product + optional size variant.
 * Shared between the client (cart display) and the server (checkout session
 * creation) so both sides always agree on price without either one having
 * to trust a value sent over the network.
 */
export function getProductPrice(product: Product, variant?: VariantSize): number {
  if (variant === "S" && product.price_s) return product.price_s;
  if (variant === "M" && product.price_m) return product.price_m;
  if (variant === "L" && product.price_l) return product.price_l;
  return product.price || 0;
}

export function getProductImage(product: Product, variant?: VariantSize) {
  if (variant === "S" && product.image_s) return product.image_s;
  if (variant === "M" && product.image_m) return product.image_m;
  if (variant === "L" && product.image_l) return product.image_l;
  return product.image;
}
