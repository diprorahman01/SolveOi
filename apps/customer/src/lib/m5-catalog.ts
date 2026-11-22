import type { ProductId } from "./m5-models";

export type ProductDefinition = {
  id: ProductId;
  name: string;
  category: string;
  description: string;
  status: "coming_soon";
};

// Deliberately do not mark the six unreleased products as available.
export const PRODUCTS: readonly ProductDefinition[] = [
  { id: "quote", name: "SolveOi Quote", category: "Sales", description: "Prepare and review quotations from customer requests.", status: "coming_soon" },
  { id: "extract", name: "SolveOi Extract", category: "Documents", description: "Structure approved information from business documents.", status: "coming_soon" },
  { id: "collect", name: "SolveOi Collect", category: "Finance", description: "Assist with invoice and payment follow-up workflows.", status: "coming_soon" },
  { id: "follow", name: "SolveOi Follow", category: "Sales", description: "Organize customer follow-ups and sales conversations.", status: "coming_soon" },
  { id: "respond", name: "SolveOi Respond", category: "Support", description: "Draft support answers for human review.", status: "coming_soon" },
  { id: "hr-desk", name: "SolveOi HR Desk", category: "People", description: "Assist growing teams with approved HR knowledge.", status: "coming_soon" },
];

export function isProductId(value: string): value is ProductId {
  return PRODUCTS.some(product => product.id === value);
}
