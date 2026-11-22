
export type ProductCategory =
  | "Operations"
  | "Finance"
  | "Sales"
  | "Support"
  | "People";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  accent: string;
  summary: string;
  headline: string;
  description: string;
  audience: string;
  features: string[];
  steps: string[];
  supported: string[];
  limitations: string[];
  later: string[];
  example: {
    input: string;
    review: string;
    output: string;
  };
};

export const products: Product[] = [
  {
    slug: "quote",
    name: "SolveOi Quote",
    category: "Operations",
    accent: "#A78BFA",
    summary: "Turn customer requests into reviewed, branded quotations.",
    headline: "Professional quotations, without the repeated work.",
    description:
      "Prepare accurate quotations from customer requirements using your approved product catalog, verified calculations, an editable draft and branded PDF output.",
    audience: "Suppliers, agencies, contractors and B2B service firms",
    features: [
      "Company branding and quotation settings",
      "CSV/XLSX product catalog import",
      "AI-assisted requirement extraction",
      "Approved catalog product matching",
      "Code-verified prices, taxes and totals",
      "Editable quotation with revision history",
      "Branded PDF export and quotation archive",
    ],
    steps: [
      "Configure the company profile and product catalog",
      "Paste a customer's requirements",
      "Review extracted products and quantities",
      "Verify prices and edit the quotation",
      "Approve and download the branded PDF",
    ],
    supported: [
      "Text-based customer requests",
      "CSV/XLSX price catalogs",
      "Branded PDF quotations",
    ],
    limitations: [
      "Unknown prices must be reviewed",
      "AI suggestions are not authoritative calculations",
      "A human approves the final quotation",
    ],
    later: [
      "CRM integrations",
      "Multicurrency pricing",
      "Customer acceptance links",
      "Contract generation",
    ],
    example: {
      input: "Customer requests 6 office chairs and 2 desks",
      review: "Match items and check prices",
      output: "Reviewed quotation PDF",
    },
  },
  {
    slug: "extract",
    name: "SolveOi Extract",
    category: "Operations",
    accent: "#56D8E8",
    summary: "Convert business documents into data you can verify.",
    headline: "From documents to structured business records.",
    description:
      "Extract fields from invoices, receipts and supported documents. Review uncertain information before downloading a structured spreadsheet.",
    audience: "Accountants, importers, operations and administration teams",
    features: [
      "Secure PDF and image uploads",
      "Invoice and receipt templates",
      "Asynchronous document processing",
      "Structured field extraction",
      "Missing-value and uncertainty indicators",
      "Side-by-side review and correction",
      "CSV/XLSX export and document history",
    ],
    steps: [
      "Upload a supported document",
      "Select an extraction template",
      "Process the document",
      "Review and correct extracted fields",
      "Export verified spreadsheet data",
    ],
    supported: ["PDF files", "Document images", "CSV/XLSX exports"],
    limitations: [
      "Scanned or blurry documents may need corrections",
      "Missing values are flagged rather than invented",
      "Exports require verified data",
    ],
    later: [
      "Purchase orders",
      "Handwritten forms",
      "Bulk pipelines",
      "ERP integrations",
    ],
    example: {
      input: "Invoice PDF with supplier and amount",
      review: "Check extracted invoice fields",
      output: "Verified Excel or CSV record",
    },
  },
  {
    slug: "collect",
    name: "SolveOi Collect",
    category: "Finance",
    accent: "#F8BD75",
    summary: "Organize overdue invoices and payment reminders.",
    headline: "Stay on top of invoice follow-ups.",
    description:
      "Track outstanding invoices and prepare courteous payment reminder drafts using verified payment information and human approval.",
    audience: "Agencies, wholesalers, contractors and finance teams",
    features: [
      "Customer and invoice records",
      "CSV/XLSX invoice register import",
      "Overdue and partial-payment tracking",
      "Reminder schedules and quiet hours",
      "AI-assisted reminder drafting",
      "Approval before external sending",
      "Delivery history and collection overview",
    ],
    steps: [
      "Import the invoice register",
      "Verify payment and dispute status",
      "Configure reminder rules",
      "Review and approve reminder drafts",
      "Track delivery and updated status",
    ],
    supported: ["Invoice spreadsheets", "Business email reminders"],
    limitations: [
      "Paid and disputed invoices must not receive reminders",
      "Payment status needs a reliable source",
      "Reminders do not guarantee payment collection",
    ],
    later: [
      "Accounting integrations",
      "Payment reconciliation",
      "Multilingual reminders",
    ],
    example: {
      input: "List of unpaid customer invoices",
      review: "Confirm eligible reminders",
      output: "Approved professional email draft",
    },
  },
  {
    slug: "follow",
    name: "SolveOi Follow",
    category: "Sales",
    accent: "#78ADFF",
    summary: "Never lose track of the next sales follow-up.",
    headline: "Keep promising sales conversations moving.",
    description:
      "Organize leads, schedule next actions and generate contextual follow-up drafts while maintaining human control over outreach.",
    audience: "Sales teams, consultants, property and service agencies",
    features: [
      "Lead creation and spreadsheet import",
      "Duplicate lead detection",
      "Sales pipeline and lead assignment",
      "Conversation notes and activity timeline",
      "Upcoming and overdue task reminders",
      "AI-assisted follow-up message drafts",
      "Approval, consent and opt-out controls",
    ],
    steps: [
      "Import or create sales leads",
      "Assign a lead and pipeline stage",
      "Set the next follow-up task",
      "Prepare and review a message",
      "Record the outcome and next action",
    ],
    supported: ["Lead spreadsheets", "Sales notes", "Approved email drafts"],
    limitations: [
      "Automated unsolicited outreach is restricted",
      "Contact consent and opt-outs must be respected",
      "AI drafts require fact checking",
    ],
    later: ["CRM integrations", "Approved WhatsApp APIs", "SMS", "Forecasting"],
    example: {
      input: "A prospect requested a proposal last week",
      review: "Check contact notes and consent",
      output: "Contextual follow-up draft",
    },
  },
  {
    slug: "respond",
    name: "SolveOi Respond",
    category: "Support",
    accent: "#70E4BF",
    summary: "Help website visitors using approved business information.",
    headline: "Helpful customer answers, grounded in your business.",
    description:
      "Configure an embeddable AI assistant using approved FAQs, policies and descriptions, with human handoff for questions it cannot answer.",
    audience: "Online stores, course providers and service businesses",
    features: [
      "Business FAQ and knowledge uploads",
      "Knowledge indexing and source tracking",
      "Chatbot identity and tone settings",
      "Website-embeddable support widget",
      "Source-grounded customer answers",
      "Human handoff and support inbox",
      "Conversation history and usage reporting",
    ],
    steps: [
      "Upload approved business information",
      "Configure chatbot settings",
      "Install the authorized website widget",
      "Answer questions using available knowledge",
      "Escalate unsupported questions to staff",
    ],
    supported: ["FAQs", "Policy documents", "Business descriptions", "Website widget"],
    limitations: [
      "Unknown prices or policies must not be invented",
      "The chatbot only uses authorized information",
      "Human support is needed for some questions",
    ],
    later: ["Shopify integration", "WooCommerce integration", "Official Meta channels"],
    example: {
      input: "Customer asks about the return policy",
      review: "Find the approved policy passage",
      output: "Grounded answer or human handoff",
    },
  },
  {
    slug: "hr-desk",
    name: "SolveOi HR Desk",
    category: "People",
    accent: "#D0A5FF",
    summary: "Make approved HR policies easier for employees to find.",
    headline: "Clearer company-policy answers for your team.",
    description:
      "Help employees find relevant answers in approved HR policies, with cited sources, access restrictions and escalation to HR when necessary.",
    audience: "Startups, SMEs and growing HR departments",
    features: [
      "HR administration and employee invitations",
      "Approved policy document management",
      "Document version and effective-date controls",
      "Role-based policy visibility",
      "Employee policy question interface",
      "Cited answers with policy references",
      "HR escalation and appropriate usage trends",
    ],
    steps: [
      "Upload and approve company policies",
      "Set employee access permissions",
      "Invite employees into the workspace",
      "Answer questions with policy references",
      "Escalate uncertain cases to HR",
    ],
    supported: ["Approved company policy documents", "Employee policy questions"],
    limitations: [
      "Not a replacement for HR judgment",
      "Confidential documents must remain restricted",
      "Sensitive employment decisions require human review",
    ],
    later: [
      "Onboarding checklists",
      "Leave-management integrations",
      "Employee self-service",
      "Enterprise SSO",
    ],
    example: {
      input: "Employee asks about annual leave",
      review: "Retrieve the approved leave policy",
      output: "Answer with a policy citation",
    },
  },
];

export const productCategories = [
  "All",
  "Operations",
  "Finance",
  "Sales",
  "Support",
  "People",
] as const;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
