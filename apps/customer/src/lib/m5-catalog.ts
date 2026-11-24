import type { ProductId } from "./m5-models";

export type ProductDefinition = {
  id: ProductId;
  name: string;
  category: string;
  description: string;
  status: "internal_beta";
};

// Six internally testable product workflows; paid/public release is NOT enabled.
export const PRODUCTS: readonly ProductDefinition[] = [
  { id: "quote", name: "SolveOi Quote", category: "Sales", description: "Prepare and review quotations from customer requests.", status: "internal_beta" },
  { id: "extract", name: "SolveOi Extract", category: "Documents", description: "Structure approved information from business documents.", status: "internal_beta" },
  { id: "collect", name: "SolveOi Collect", category: "Finance", description: "Assist with invoice and payment follow-up workflows.", status: "internal_beta" },
  { id: "follow", name: "SolveOi Follow", category: "Sales", description: "Organize customer follow-ups and sales conversations.", status: "internal_beta" },
  { id: "respond", name: "SolveOi Respond", category: "Support", description: "Draft support answers for human review.", status: "internal_beta" },
  { id: "hr-desk", name: "SolveOi HR Desk", category: "People", description: "Assist growing teams with approved HR knowledge.", status: "internal_beta" },
];

export function isProductId(value: string): value is ProductId {
  return PRODUCTS.some(product => product.id === value);
}
