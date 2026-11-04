export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prompt: string;
  expectedOutput: string;
  tags: string[];
  isFree?: boolean;
}

export type PromptCategory =
  | 'bank-reconciliation'
  | 'chart-of-accounts'
  | 'client-onboarding'
  | 'month-end-close'
  | 'payroll'
  | 'sales-tax'
  | 'reporting'
  | 'accounts-receivable'
  | 'accounts-payable'
  | 'journal-entries'
  | 'automation'
  | 'client-communication';

export const CATEGORIES: { value: PromptCategory; label: string; icon: string; count: number }[] = [
  { value: 'bank-reconciliation', label: 'Bank Reconciliation', icon: '🏦', count: 5 },
  { value: 'chart-of-accounts', label: 'Chart of Accounts', icon: '📊', count: 4 },
  { value: 'client-onboarding', label: 'Client Onboarding', icon: '🤝', count: 4 },
  { value: 'month-end-close', label: 'Month-End Close', icon: '📅', count: 5 },
  { value: 'payroll', label: 'Payroll', icon: '💰', count: 4 },
  { value: 'sales-tax', label: 'Sales Tax', icon: '🧾', count: 4 },
  { value: 'reporting', label: 'Reporting & Analysis', icon: '📈', count: 5 },
  { value: 'accounts-receivable', label: 'Accounts Receivable', icon: '💵', count: 4 },
  { value: 'accounts-payable', label: 'Accounts Payable', icon: '📋', count: 4 },
  { value: 'journal-entries', label: 'Journal Entries', icon: '📝', count: 4 },
  { value: 'automation', label: 'QBO Automation', icon: '⚡', count: 4 },
  { value: 'client-communication', label: 'Client Communication', icon: '💬', count: 5 },
];

export const PROMPTS: Prompt[] = [
  // === BANK RECONCILIATION (5) ===
  {
    id: 'br-1',
    title: 'Unmatched Transaction Investigator',
    description: 'Identify and categorize unmatched bank transactions that need manual review.',
    category: 'bank-reconciliation',
    difficulty: 'beginner',
    prompt: `I'm reconciling [CLIENT NAME]'s bank account in QuickBooks Online for [MONTH/YEAR]. Here are the unmatched transactions from the bank feed:\n\n[PASTE UNMATCHED TRANSACTIONS]\n\nFor each transaction, please:\n1. Suggest the most likely QBO category based on the vendor/description\n2. Flag any that look like potential duplicates\n3. Identify any that might need to be split across multiple categories\n4. Note any that seem unusual and should be verified with the client\n\nFormat your response as a table with columns: Date | Description | Amount | Suggested Category | Action Needed | Notes`,
    expectedOutput: 'A categorized table of all unmatched transactions with suggested actions and categories.',
    tags: ['reconciliation', 'bank feed', 'categorization'],
    isFree: true,
  },
  {
    id: 'br-2',
    title: 'Reconciliation Discrepancy Finder',
    description: 'Analyze bank statement vs QBO balance differences and suggest fixes.',
    category: 'bank-reconciliation',
    difficulty: 'intermediate',
    prompt: `My client's QBO bank balance shows $[QBO BALANCE] but the bank statement ending balance is $[BANK BALANCE] for [MONTH/YEAR]. The difference is $[DIFFERENCE].\n\nHere are the outstanding items I've found so far:\n[LIST OUTSTANDING CHECKS/DEPOSITS]\n\nThe remaining unreconciled difference is $[REMAINING DIFFERENCE].\n\nPlease help me:\n1. Verify my outstanding items math\n2. Suggest common causes for the remaining difference (deposits in transit, bank fees, interest, etc.)\n3. Create a step-by-step investigation checklist to find the discrepancy\n4. Draft a client email asking about any missing information`,
    expectedOutput: 'Math verification, common causes checklist, investigation steps, and draft client email.',
    tags: ['reconciliation', 'discrepancy', 'troubleshooting'],
  },
  {
    id: 'br-3',
    title: 'Bank Rule Builder',
    description: 'Generate optimal QBO bank rules from transaction history patterns.',
    category: 'bank-reconciliation',
    difficulty: 'intermediate',
    prompt: `Here are the last 3 months of categorized transactions for [CLIENT NAME]'s checking account:\n\n[PASTE TRANSACTION LIST WITH CATEGORIES]\n\nPlease analyze these transactions and:\n1. Identify recurring vendors/descriptions that appear 3+ times\n2. For each, suggest a QBO bank rule with: Rule name, conditions (contains/exact match), category assignment, and whether to auto-add or review first\n3. Estimate how many hours per month these rules would save\n4. Flag any transactions that are categorized inconsistently across months\n\nPrioritize rules that would have the highest time savings.`,
    expectedOutput: 'List of recommended bank rules with conditions, categories, and estimated time savings.',
    tags: ['bank rules', 'automation', 'efficiency'],
  },
  {
    id: 'br-4',
    title: 'Multi-Account Reconciliation Tracker',
    description: 'Track reconciliation status across all accounts for a client.',
    category: 'bank-reconciliation',
    difficulty: 'beginner',
    prompt: `I need to track the reconciliation status for [CLIENT NAME] across all their accounts for [MONTH/YEAR]. Here are their accounts:\n\n[LIST ACCOUNTS: e.g., Checking - Chase, Savings - Chase, Credit Card - Amex, Credit Card - Capital One, PayPal]\n\nFor each account, I have these reconciliation details:\n[PASTE DETAILS: last reconciled date, current QBO balance, statement balance if available]\n\nPlease create:\n1. A status dashboard showing which accounts are reconciled, in progress, or not started\n2. A priority order for completing reconciliations (based on transaction volume and risk)\n3. A timeline estimate for completing all reconciliations\n4. Reminder notes for any accounts that are more than 1 month behind`,
    expectedOutput: 'Reconciliation status dashboard with priorities and timeline.',
    tags: ['tracking', 'multi-account', 'organization'],
  },
  {
    id: 'br-5',
    title: 'Credit Card Statement Matcher',
    description: 'Match credit card charges with receipts and proper expense categories.',
    category: 'bank-reconciliation',
    difficulty: 'advanced',
    prompt: `I'm reconciling [CLIENT NAME]'s [CREDIT CARD NAME] for [MONTH/YEAR]. Here's the credit card statement:\n\n[PASTE STATEMENT TRANSACTIONS]\n\nAnd here are the receipts/invoices the client provided:\n[LIST RECEIPTS WITH AMOUNTS AND VENDORS]\n\nPlease:\n1. Match each statement transaction to a receipt (flag unmatched on both sides)\n2. Suggest the proper QBO expense category for each matched transaction\n3. Identify any personal charges that need to be coded to Owner's Draw\n4. Calculate the total business vs personal split\n5. Draft a message to the client listing missing receipts they need to provide`,
    expectedOutput: 'Matched transaction table, category assignments, personal/business split, and client message.',
    tags: ['credit card', 'receipt matching', 'expense categorization'],
  },

  // === CHART OF ACCOUNTS (4) ===
  {
    id: 'coa-1',
    title: 'Industry-Specific COA Generator',
    description: 'Build a complete QBO chart of accounts tailored to any industry.',
    category: 'chart-of-accounts',
    difficulty: 'intermediate',
    prompt: `I'm setting up QuickBooks Online for a new client in the [INDUSTRY] industry. Their business details:\n- Entity type: [LLC/S-Corp/C-Corp/Sole Prop]\n- Annual revenue: approximately $[REVENUE]\n- Number of employees: [NUMBER]\n- Key revenue streams: [LIST]\n- Major expense categories: [LIST]\n\nPlease create a complete QBO Chart of Accounts with:\n1. All standard accounts needed (Assets, Liabilities, Equity, Revenue, COGS, Expenses)\n2. Industry-specific sub-accounts\n3. Account numbers using standard numbering (1000s for Assets, 2000s for Liabilities, etc.)\n4. Account type and detail type for each (matching QBO's dropdown options)\n5. Brief description of when to use each account\n\nFormat as a table ready to import into QBO.`,
    expectedOutput: 'Complete COA table with account numbers, types, detail types, and usage descriptions.',
    tags: ['setup', 'chart of accounts', 'industry-specific'],
    isFree: true,
  },
  {
    id: 'coa-2',
    title: 'COA Cleanup Analyzer',
    description: 'Audit an existing chart of accounts and recommend consolidations.',
    category: 'chart-of-accounts',
    difficulty: 'advanced',
    prompt: `Here is my client's current QuickBooks Online Chart of Accounts:\n\n[PASTE FULL COA LIST]\n\nPlease analyze this COA and:\n1. Identify duplicate or redundant accounts that should be merged\n2. Flag accounts with no activity in the last 12 months that could be inactivated\n3. Suggest missing accounts that this type of business typically needs\n4. Recommend a cleaner naming convention\n5. Identify any accounts that are using the wrong account type or detail type\n6. Provide step-by-step instructions for merging/cleaning in QBO (including what to do with existing transactions)`,
    expectedOutput: 'Audit report with specific merge recommendations, missing accounts, and cleanup steps.',
    tags: ['cleanup', 'audit', 'optimization'],
  },
  {
    id: 'coa-3',
    title: 'Sub-Account Structure Builder',
    description: 'Design hierarchical sub-account structures for complex businesses.',
    category: 'chart-of-accounts',
    difficulty: 'intermediate',
    prompt: `My client needs a detailed sub-account structure for their [EXPENSE/REVENUE] tracking. Their situation:\n\n- Business type: [TYPE]\n- They need to track [WHAT THEY WANT TO TRACK: e.g., expenses by department, revenue by service line, COGS by product]\n- Current pain point: [WHAT'S NOT WORKING]\n- They have [NUMBER] departments/locations/service lines\n\nPlease design:\n1. A parent/sub-account hierarchy (max 3 levels deep for QBO)\n2. A numbering system that leaves room for future growth\n3. Guidance on when to use sub-accounts vs. classes vs. locations in QBO\n4. A comparison showing the pros/cons of each tracking method for their use case`,
    expectedOutput: 'Hierarchical account structure with numbering, plus classes vs sub-accounts comparison.',
    tags: ['sub-accounts', 'tracking', 'structure'],
  },
  {
    id: 'coa-4',
    title: 'Tax-Ready COA Mapper',
    description: 'Map chart of accounts to tax form lines for easier filing.',
    category: 'chart-of-accounts',
    difficulty: 'advanced',
    prompt: `My client is a [ENTITY TYPE] in the [INDUSTRY] industry. Here's their current Chart of Accounts:\n\n[PASTE COA]\n\nPlease map each account to the appropriate line on their tax return:\n- For Schedule C (sole prop): Map to specific Schedule C lines\n- For 1120S (S-Corp): Map to Form 1120S lines\n- For 1065 (Partnership): Map to Form 1065 lines\n\nAlso:\n1. Identify any accounts that need to be split for tax purposes\n2. Flag accounts that might trigger IRS scrutiny if too high\n3. Suggest any additional accounts needed specifically for tax compliance\n4. Note any M-1/M-2 adjustments that will likely be needed`,
    expectedOutput: 'Complete COA-to-tax-form mapping table with compliance notes.',
    tags: ['tax', 'compliance', 'mapping'],
  },

  // === CLIENT ONBOARDING (4) ===
  {
    id: 'co-1',
    title: 'New Client Discovery Questionnaire',
    description: 'Generate a comprehensive onboarding questionnaire for new bookkeeping clients.',
    category: 'client-onboarding',
    difficulty: 'beginner',
    prompt: `I'm onboarding a new bookkeeping client. Their basic info:\n- Business name: [NAME]\n- Industry: [INDUSTRY]\n- Entity type: [TYPE]\n- How long in business: [YEARS]\n- Current bookkeeping software: [SOFTWARE or NONE]\n\nPlease create a comprehensive onboarding questionnaire that covers:\n1. Business structure and ownership details\n2. Banking and financial accounts (all accounts to connect)\n3. Revenue streams and billing methods\n4. Expense categories and vendor relationships\n5. Payroll details (if applicable)\n6. Sales tax obligations\n7. Previous bookkeeper/CPA information\n8. Pain points and what they want from their bookkeeper\n9. Communication preferences\n10. Access credentials needed (QBO, bank, etc.)\n\nFormat as a professional questionnaire I can send to the client.`,
    expectedOutput: 'Professional onboarding questionnaire ready to send to the client.',
    tags: ['onboarding', 'questionnaire', 'new client'],
    isFree: true,
  },
  {
    id: 'co-2',
    title: 'QBO Cleanup Scope Builder',
    description: 'Assess a messy QBO file and build a cleanup project scope.',
    category: 'client-onboarding',
    difficulty: 'advanced',
    prompt: `I just got access to a new client's QuickBooks Online. Here's what I see:\n\n- Last reconciled date: [DATE]\n- Months behind: [NUMBER]\n- Number of uncategorized transactions: [NUMBER]\n- Known issues: [LIST: e.g., personal/business mixed, wrong entity type, no sales tax tracking]\n- Their P&L shows: [KEY NUMBERS]\n- Their Balance Sheet shows: [KEY NUMBERS]\n\nPlease help me:\n1. Create a prioritized cleanup checklist (what to fix first vs. last)\n2. Estimate hours for each cleanup task\n3. Calculate a fair fixed-price quote for the cleanup (at $[HOURLY RATE]/hr)\n4. Draft a scope of work document I can send to the client\n5. Identify any red flags that might indicate fraud or tax issues\n6. Create a timeline for completing the cleanup`,
    expectedOutput: 'Prioritized cleanup checklist, hour estimates, pricing, and scope of work document.',
    tags: ['cleanup', 'scope', 'pricing'],
  },
  {
    id: 'co-3',
    title: 'Client Welcome Email Sequence',
    description: 'Draft a 5-email welcome sequence for new bookkeeping clients.',
    category: 'client-onboarding',
    difficulty: 'beginner',
    prompt: `I just signed a new bookkeeping client: [CLIENT NAME], [INDUSTRY] business. My firm name is [YOUR FIRM NAME].\n\nPlease write a 5-email welcome sequence:\n\nEmail 1 (Day 0 - Welcome): Welcome them, set expectations, outline next steps\nEmail 2 (Day 1 - Access): Request all account access, logins, and documents needed\nEmail 3 (Day 3 - Setup Complete): Confirm setup, explain what you found, outline the plan\nEmail 4 (Day 7 - First Week Check-in): Share first week progress, ask for any missing items\nEmail 5 (Day 14 - Process Established): Explain the ongoing monthly process, reporting schedule, and how to communicate with you\n\nTone: Professional but warm. These are small business owners who are probably overwhelmed.`,
    expectedOutput: 'Five complete email drafts ready to use in your onboarding sequence.',
    tags: ['email', 'welcome', 'automation'],
  },
  {
    id: 'co-4',
    title: 'QBO Setup Checklist Generator',
    description: 'Create a step-by-step QBO setup checklist for a new client.',
    category: 'client-onboarding',
    difficulty: 'intermediate',
    prompt: `I need to set up QuickBooks Online from scratch for a new client:\n\n- Business: [NAME], [INDUSTRY]\n- Entity: [TYPE]\n- State(s): [STATES]\n- Revenue type: [PRODUCT/SERVICE/BOTH]\n- Employees: [YES/NO, NUMBER]\n- Sales tax: [YES/NO]\n- Inventory: [YES/NO]\n- Multi-currency: [YES/NO]\n\nCreate a detailed QBO setup checklist with:\n1. Company settings to configure (with recommended values)\n2. Chart of accounts to create\n3. Products/services to set up\n4. Sales tax settings\n5. Bank/credit card connections\n6. Recurring transactions to create\n7. Users/permissions to set up\n8. Apps/integrations to connect\n9. Custom fields to create\n10. Opening balances to enter\n\nInclude the specific QBO navigation path for each step (e.g., Gear icon > Account and Settings > Sales).`,
    expectedOutput: 'Complete QBO setup checklist with navigation paths and recommended settings.',
    tags: ['setup', 'checklist', 'QBO configuration'],
  },

  // === MONTH-END CLOSE (5) ===
  {
    id: 'mec-1',
    title: 'Month-End Close Checklist',
    description: 'Generate a comprehensive month-end close procedure for any client.',
    category: 'month-end-close',
    difficulty: 'intermediate',
    prompt: `Create a month-end close checklist for [CLIENT NAME], a [INDUSTRY] business for [MONTH/YEAR].\n\nBusiness details:\n- Entity type: [TYPE]\n- Has payroll: [YES/NO]\n- Has inventory: [YES/NO]\n- Has sales tax: [YES/NO]\n- Number of bank/CC accounts: [NUMBER]\n- Accrual or cash basis: [BASIS]\n\nCreate a detailed checklist organized by:\n1. Pre-close tasks (bank reconciliations, categorization)\n2. Adjusting entries (accruals, prepaid amortization, depreciation)\n3. Revenue recognition review\n4. Expense review and cutoff\n5. Balance sheet review (each account)\n6. P&L review and variance analysis\n7. Sales tax filing preparation\n8. Payroll reconciliation\n9. Final review and sign-off\n10. Client deliverables (reports to send)\n\nInclude estimated time for each task and who is responsible.`,
    expectedOutput: 'Detailed month-end close checklist with times and responsibilities.',
    tags: ['month-end', 'close', 'checklist'],
  },
  {
    id: 'mec-2',
    title: 'Accrual Entry Generator',
    description: 'Calculate and draft accrual adjusting entries for month-end.',
    category: 'month-end-close',
    difficulty: 'advanced',
    prompt: `I need to prepare accrual adjusting entries for [CLIENT NAME] for [MONTH/YEAR]. Here's the information:\n\nPrepaid expenses:\n[LIST: e.g., Insurance $12,000/year paid Jan 1, Software $600/year paid Mar 1]\n\nAccrued expenses:\n[LIST: e.g., Rent due on 1st but paid on 5th, Contractor invoices received but not yet entered]\n\nDeferred revenue:\n[LIST: e.g., Retainer received $5,000 for 3 months of service]\n\nAccrued revenue:\n[LIST: e.g., Work completed but not yet invoiced]\n\nPlease create:\n1. All necessary journal entries with debits and credits\n2. Supporting calculations for each entry\n3. A schedule tracking each prepaid/accrual balance going forward\n4. Memo/description for each entry (for the QBO journal entry)\n5. Reversal entries needed for the following month`,
    expectedOutput: 'Complete journal entries with calculations and forward-tracking schedules.',
    tags: ['accruals', 'adjusting entries', 'journal entries'],
  },
  {
    id: 'mec-3',
    title: 'P&L Variance Analyzer',
    description: 'Analyze month-over-month and budget-to-actual P&L variances.',
    category: 'month-end-close',
    difficulty: 'intermediate',
    prompt: `Here is my client's Profit & Loss for [MONTH/YEAR] compared to [PRIOR MONTH or BUDGET]:\n\n[PASTE P&L COMPARISON DATA]\n\nPlease analyze:\n1. Every line item with a variance greater than 10% or $[THRESHOLD]\n2. For each significant variance, suggest the most likely cause\n3. Identify any trends over the last 3-6 months (if data provided)\n4. Flag any expenses that seem unusually high or low for this industry\n5. Calculate key ratios: Gross margin %, Net margin %, Operating expense ratio\n6. Draft a 1-paragraph executive summary for the client\n7. List 3-5 questions to ask the client about the variances`,
    expectedOutput: 'Variance analysis table, financial ratios, executive summary, and client questions.',
    tags: ['variance analysis', 'P&L', 'financial review'],
  },
  {
    id: 'mec-4',
    title: 'Balance Sheet Review Checklist',
    description: 'Walk through every balance sheet account to verify accuracy.',
    category: 'month-end-close',
    difficulty: 'advanced',
    prompt: `Here is my client's Balance Sheet as of [DATE]:\n\n[PASTE BALANCE SHEET]\n\nPlease review each account and for each one:\n1. Verify if the balance seems reasonable for a [INDUSTRY] business with $[REVENUE] in annual revenue\n2. List what supporting documentation should exist for this balance\n3. Identify any accounts with balances that seem wrong (negative asset, etc.)\n4. Flag any account that might indicate a classification error\n5. Check that A/R and A/P aging matches the balance sheet\n6. Verify equity accounts are correct for the entity type\n7. Create a reconciliation checklist for each balance sheet account\n\nAlso note any items that could be a tax issue if not corrected.`,
    expectedOutput: 'Account-by-account review with reasonableness checks and reconciliation needs.',
    tags: ['balance sheet', 'review', 'reconciliation'],
  },
  {
    id: 'mec-5',
    title: 'Depreciation Schedule Calculator',
    description: 'Build and update fixed asset depreciation schedules.',
    category: 'month-end-close',
    difficulty: 'advanced',
    prompt: `My client has the following fixed assets:\n\n[LIST ASSETS: Description, Date Placed in Service, Cost, Salvage Value, Useful Life, Method (Straight-line/MACRS)]\n\nPlease:\n1. Calculate the monthly depreciation amount for each asset\n2. Create a depreciation schedule through the end of each asset's useful life\n3. Generate this month's depreciation journal entry for QBO\n4. Show the current Net Book Value of each asset\n5. Flag any fully depreciated assets that should be reviewed\n6. Note the Section 179 or bonus depreciation options if applicable\n7. Create a fixed asset register summary I can give to the client's CPA at tax time`,
    expectedOutput: 'Depreciation schedules, journal entries, and tax-ready fixed asset register.',
    tags: ['depreciation', 'fixed assets', 'journal entries'],
  },

  // === PAYROLL (4) ===
  {
    id: 'pr-1',
    title: 'Payroll Journal Entry Builder',
    description: 'Create accurate payroll journal entries from pay stub data.',
    category: 'payroll',
    difficulty: 'intermediate',
    prompt: `Here is the payroll summary for [CLIENT NAME] for [PAY PERIOD]:\n\n[PASTE PAYROLL DATA: Gross wages, Federal tax withheld, State tax withheld, Social Security, Medicare, 401k, Health insurance, Net pay, Employer SS match, Employer Medicare match, FUTA, SUTA]\n\nPlease create:\n1. The complete payroll journal entry with all debits and credits\n2. Separate the employee portion vs employer portion clearly\n3. Show liability accounts for each withholding\n4. Include the employer payroll tax expense entry\n5. Show the bank entry for net payroll\n6. Reconcile: Total debits should equal total credits\n7. Include memo lines for each entry suitable for QBO`,
    expectedOutput: 'Complete payroll journal entries with employee/employer splits and reconciliation.',
    tags: ['payroll', 'journal entries', 'withholding'],
  },
  {
    id: 'pr-2',
    title: 'Payroll Reconciliation Helper',
    description: 'Reconcile QBO payroll liabilities with actual tax deposits.',
    category: 'payroll',
    difficulty: 'advanced',
    prompt: `I need to reconcile payroll tax liabilities for [CLIENT NAME] for [QUARTER/YEAR].\n\nQBO Payroll Liability Balances:\n[PASTE: Federal Tax Payable, State Tax Payable, SS Payable, Medicare Payable, FUTA, SUTA balances]\n\nActual Tax Deposits Made:\n[PASTE: Dates and amounts of EFTPS payments, state tax payments]\n\nPayroll Reports:\n[PASTE: 941 quarterly totals, state quarterly totals]\n\nPlease:\n1. Reconcile each payroll liability account (QBO balance vs deposits vs 941)\n2. Identify any discrepancies\n3. Create adjusting entries for any differences\n4. Verify the 941 quarterly totals match QBO\n5. Check for any late deposit penalties that might apply\n6. Create a reconciliation worksheet I can save as documentation`,
    expectedOutput: 'Payroll liability reconciliation with adjusting entries and documentation.',
    tags: ['payroll', 'reconciliation', 'tax deposits', '941'],
  },
  {
    id: 'pr-3',
    title: 'Contractor vs Employee Classifier',
    description: 'Analyze worker relationships for proper W-2 vs 1099 classification.',
    category: 'payroll',
    difficulty: 'intermediate',
    prompt: `My client wants to classify a worker as an independent contractor. Here are the details of the working relationship:\n\n- Worker role: [DESCRIPTION]\n- How they are paid: [HOURLY/PROJECT/SALARY]\n- Who sets the schedule: [CLIENT/WORKER]\n- Who provides tools/equipment: [CLIENT/WORKER]\n- Can the worker work for others: [YES/NO]\n- Is the work ongoing or project-based: [ONGOING/PROJECT]\n- Is there a written contract: [YES/NO]\n- Does the worker have their own business entity: [YES/NO]\n- Does the worker invoice for their services: [YES/NO]\n\nPlease analyze this using:\n1. The IRS 20-factor test (key factors)\n2. The ABC test (used in many states)\n3. Economic reality test\n4. Provide a risk assessment (Low/Medium/High) for 1099 classification\n5. Recommend the proper classification with explanation\n6. If they should be W-2, estimate the additional cost to the employer`,
    expectedOutput: 'Classification analysis with risk assessment and cost comparison.',
    tags: ['1099', 'W-2', 'classification', 'compliance'],
  },
  {
    id: 'pr-4',
    title: 'Year-End Payroll Checklist',
    description: 'Complete year-end payroll tasks including W-2 and 1099 prep.',
    category: 'payroll',
    difficulty: 'intermediate',
    prompt: `It's year-end for [CLIENT NAME] ([YEAR]). They have [NUMBER] employees and [NUMBER] 1099 contractors.\n\nPlease create a comprehensive year-end payroll checklist:\n1. Final payroll processing tasks and deadlines\n2. W-2 preparation and verification steps\n3. 1099-NEC preparation (who needs one, thresholds)\n4. 941 annual reconciliation to W-3\n5. State unemployment reconciliation\n6. Benefits reconciliation (401k, health insurance)\n7. Verify all tax deposits were made on time\n8. Update employee records for new year\n9. New year setup tasks (new tax rates, limits)\n10. Filing deadlines for all forms with penalties for late filing\n\nInclude specific due dates and links to forms where possible.`,
    expectedOutput: 'Complete year-end payroll checklist with deadlines and form references.',
    tags: ['year-end', 'W-2', '1099', 'compliance'],
  },

  // === SALES TAX (4) ===
  {
    id: 'st-1',
    title: 'Sales Tax Nexus Analyzer',
    description: 'Determine where your client has sales tax obligations.',
    category: 'sales-tax',
    difficulty: 'advanced',
    prompt: `My client sells [PRODUCTS/SERVICES] and has the following presence:\n\n- Physical locations: [STATES]\n- Employees in: [STATES]\n- Inventory stored in: [STATES]\n- Sales by state (last 12 months): [LIST STATE AND AMOUNT]\n- Uses marketplace facilitators (Amazon, Etsy, etc.): [YES/NO, WHICH]\n\nPlease analyze:\n1. Physical nexus obligations by state\n2. Economic nexus thresholds by state (transaction count and dollar amount)\n3. Which states they currently have nexus in based on the data\n4. Which states they're approaching nexus thresholds\n5. Whether their product/service is taxable in each nexus state\n6. Registration requirements and deadlines for each state\n7. Filing frequency recommendations\n8. Marketplace facilitator exemptions that apply`,
    expectedOutput: 'State-by-state nexus analysis with thresholds, obligations, and registration steps.',
    tags: ['nexus', 'sales tax', 'multi-state', 'compliance'],
  },
  {
    id: 'st-2',
    title: 'Sales Tax Return Preparer',
    description: 'Prepare sales tax return data from QBO reports.',
    category: 'sales-tax',
    difficulty: 'intermediate',
    prompt: `I need to prepare the [STATE] sales tax return for [CLIENT NAME] for [PERIOD].\n\nHere's the QBO Sales Tax Liability Report:\n[PASTE REPORT DATA]\n\nAnd here's the Sales by Product/Service report:\n[PASTE REPORT DATA]\n\nPlease:\n1. Calculate total taxable sales by tax rate\n2. Calculate total exempt sales and the exemption reason\n3. Calculate total tax collected\n4. Identify any discrepancies between tax collected and tax owed\n5. Note any credits from prior periods\n6. Calculate the final amount due (or refund)\n7. If there's a discount for early filing, calculate the savings\n8. Flag any transactions that might be miscategorized (taxable marked exempt or vice versa)`,
    expectedOutput: 'Sales tax return worksheet with calculations and discrepancy flags.',
    tags: ['sales tax return', 'filing', 'calculation'],
  },
  {
    id: 'st-3',
    title: 'QBO Sales Tax Setup Guide',
    description: 'Configure QBO Automated Sales Tax correctly for a client.',
    category: 'sales-tax',
    difficulty: 'beginner',
    prompt: `I need to set up sales tax in QuickBooks Online for [CLIENT NAME].\n\nBusiness details:\n- State(s) registered: [STATES]\n- Products/services sold: [LIST]\n- Tax-exempt items: [LIST]\n- Tax-exempt customers: [LIST, IF ANY]\n- Filing frequency: [MONTHLY/QUARTERLY/ANNUALLY] by state\n\nPlease provide step-by-step instructions for:\n1. Enabling Automated Sales Tax in QBO\n2. Configuring each state's tax agency\n3. Setting up tax categories for each product/service\n4. Marking tax-exempt customers\n5. Setting up tax-exempt products\n6. Configuring filing reminders\n7. Common QBO sales tax mistakes to avoid\n8. How to handle sales tax on refunds and credits\n\nInclude the exact QBO navigation path for each step.`,
    expectedOutput: 'Step-by-step QBO sales tax setup guide with navigation paths.',
    tags: ['sales tax', 'QBO setup', 'configuration'],
  },
  {
    id: 'st-4',
    title: 'Use Tax Identifier',
    description: 'Find purchases where use tax should have been accrued.',
    category: 'sales-tax',
    difficulty: 'advanced',
    prompt: `My client is in [STATE] and I need to check if they owe use tax on any purchases. Here are their expenses for [PERIOD]:\n\n[PASTE EXPENSE LIST OR VENDOR LIST]\n\nPlease:\n1. Identify purchases likely made from out-of-state vendors (online purchases, etc.)\n2. Determine which of these would be subject to use tax in [STATE]\n3. Calculate the estimated use tax owed\n4. Create the journal entry to accrue use tax\n5. Explain which QBO accounts to use\n6. Provide a process for the client to flag these going forward\n7. Note the penalty risks for not paying use tax`,
    expectedOutput: 'Use tax analysis with calculations, journal entries, and process recommendations.',
    tags: ['use tax', 'compliance', 'out-of-state'],
  },

  // === REPORTING & ANALYSIS (5) ===
  {
    id: 'ra-1',
    title: 'Monthly Financial Package Builder',
    description: 'Create a complete monthly financial report package for clients.',
    category: 'reporting',
    difficulty: 'intermediate',
    prompt: `Create a monthly financial reporting package for [CLIENT NAME] for [MONTH/YEAR].\n\nHere's the data:\n- P&L current month: [PASTE]\n- P&L prior month: [PASTE]\n- P&L same month last year: [PASTE]\n- Balance Sheet: [PASTE]\n- A/R Aging: [PASTE]\n- A/P Aging: [PASTE]\n\nPlease create:\n1. Executive Summary (3-5 key takeaways)\n2. P&L Analysis with MoM and YoY comparisons\n3. Key Financial Ratios (gross margin, net margin, current ratio, quick ratio)\n4. Cash Position Summary\n5. A/R Health (days outstanding, top overdue clients)\n6. A/P Status (upcoming payments, cash needs)\n7. 3 actionable recommendations based on the numbers\n8. Visual-friendly format suitable for a non-accountant business owner`,
    expectedOutput: 'Complete monthly financial package with analysis and recommendations.',
    tags: ['reporting', 'financial package', 'analysis'],
    isFree: true,
  },
  {
    id: 'ra-2',
    title: 'KPI Dashboard Data Generator',
    description: 'Calculate key performance indicators from QBO data.',
    category: 'reporting',
    difficulty: 'intermediate',
    prompt: `Calculate the following KPIs for [CLIENT NAME], a [INDUSTRY] business, for [PERIOD]:\n\nData provided:\n- P&L: [PASTE]\n- Balance Sheet: [PASTE]\n- A/R Aging: [PASTE]\n- A/P Aging: [PASTE]\n- Prior period comparisons: [PASTE IF AVAILABLE]\n\nPlease calculate:\n1. Revenue Growth Rate (MoM and YoY)\n2. Gross Profit Margin %\n3. Net Profit Margin %\n4. Operating Expense Ratio\n5. Current Ratio\n6. Quick Ratio\n7. Days Sales Outstanding (DSO)\n8. Days Payable Outstanding (DPO)\n9. Cash Conversion Cycle\n10. Revenue per Employee (if headcount provided)\n11. Customer Acquisition Cost (if marketing spend provided)\n12. Break-even Revenue\n\nFor each KPI, show: The number, the trend (up/down/flat), and the industry benchmark if known. Flag any KPI that's outside healthy range.`,
    expectedOutput: 'KPI dashboard with calculations, trends, and industry benchmarks.',
    tags: ['KPIs', 'dashboard', 'benchmarks'],
  },
  {
    id: 'ra-3',
    title: 'Cash Flow Forecast Builder',
    description: 'Build a 13-week cash flow forecast from QBO data.',
    category: 'reporting',
    difficulty: 'advanced',
    prompt: `Build a 13-week cash flow forecast for [CLIENT NAME].\n\nCurrent data:\n- Current bank balance: $[AMOUNT]\n- Outstanding A/R (with expected collection dates): [PASTE AGING]\n- Outstanding A/P (with due dates): [PASTE AGING]\n- Recurring weekly/monthly expenses: [LIST]\n- Upcoming payroll dates and amounts: [LIST]\n- Expected new revenue: [ESTIMATES]\n- Loan payments: [LIST]\n- Quarterly tax payments due: [LIST]\n- Any large one-time expenses expected: [LIST]\n\nPlease create:\n1. Week-by-week cash flow projection for 13 weeks\n2. Running cash balance for each week\n3. Flag any weeks where cash drops below $[MINIMUM THRESHOLD]\n4. Best case / worst case scenarios\n5. Top 3 recommendations to improve cash flow\n6. A collection priority list for overdue A/R`,
    expectedOutput: '13-week cash forecast with scenarios and actionable recommendations.',
    tags: ['cash flow', 'forecasting', '13-week'],
  },
  {
    id: 'ra-4',
    title: 'Industry Benchmarking Analyzer',
    description: 'Compare client financials against industry benchmarks.',
    category: 'reporting',
    difficulty: 'intermediate',
    prompt: `Compare my client's financials against industry benchmarks.\n\nClient Details:\n- Industry: [INDUSTRY] (NAICS code if known: [CODE])\n- Annual revenue: $[REVENUE]\n- Location: [STATE]\n- Years in business: [YEARS]\n\nClient Financials:\n- Gross Margin: [%]\n- Net Margin: [%]\n- Operating Expenses as % of Revenue: [%]\n- Payroll as % of Revenue: [%]\n- Rent as % of Revenue: [%]\n- Marketing as % of Revenue: [%]\n- Owner's Comp as % of Revenue: [%]\n\nPlease:\n1. Provide industry benchmark ranges for each metric\n2. Rate each metric as Above/At/Below benchmark\n3. Identify the top 3 areas where the client is underperforming\n4. Suggest specific actions to improve each underperforming area\n5. Calculate the dollar impact if they moved each metric to benchmark level\n6. Note which benchmarks are most critical for this industry`,
    expectedOutput: 'Benchmark comparison with gap analysis and improvement recommendations.',
    tags: ['benchmarking', 'industry comparison', 'analysis'],
  },
  {
    id: 'ra-5',
    title: 'Board-Ready Financial Presentation',
    description: 'Transform QBO reports into a presentation-ready financial overview.',
    category: 'reporting',
    difficulty: 'intermediate',
    prompt: `My client needs to present financials to [AUDIENCE: investors/board/bank/partners] for [PERIOD].\n\nHere are the QBO reports:\n- P&L: [PASTE]\n- Balance Sheet: [PASTE]\n- Cash Flow Statement: [PASTE]\n\nPlease create presentation-ready content:\n1. 1-page Financial Highlights Summary (key wins and challenges)\n2. Revenue Analysis with visual-friendly data points\n3. Profitability Trend (formatted for charts)\n4. Cash Position and Runway\n5. Key Metrics Dashboard Data\n6. Forward-Looking Projections (based on trends)\n7. Talking points for each section\n8. Anticipated questions and prepared answers\n\nTone: Professional, confident, data-driven. Highlight positives while being transparent about challenges.`,
    expectedOutput: 'Presentation-ready financial content with talking points and Q&A prep.',
    tags: ['presentation', 'board', 'investor', 'financial summary'],
  },

  // === ACCOUNTS RECEIVABLE (4) ===
  {
    id: 'ar-1',
    title: 'Collections Email Sequence',
    description: 'Draft professional collection emails for overdue invoices.',
    category: 'accounts-receivable',
    difficulty: 'beginner',
    prompt: `I need collection emails for [CLIENT NAME]'s overdue invoices.\n\nOverdue invoices:\n[LIST: Customer name, Invoice #, Amount, Due date, Days overdue]\n\nPlease create a collection email sequence:\n1. Friendly Reminder (1-7 days overdue) - assumes it was an oversight\n2. Second Notice (8-14 days overdue) - firmer but still professional\n3. Urgent Notice (15-30 days overdue) - emphasizes consequences\n4. Final Notice (30+ days overdue) - mentions potential collection action\n5. Payment Plan Offer (for large balances) - offers to work together\n\nFor each email:\n- Subject line\n- Body text\n- Call to action\n- Appropriate tone\n\nAlso include a phone call script for the 15+ day follow-up.`,
    expectedOutput: '5-email collection sequence plus phone call script.',
    tags: ['collections', 'email', 'accounts receivable'],
  },
  {
    id: 'ar-2',
    title: 'A/R Aging Analysis and Action Plan',
    description: 'Analyze A/R aging and create a prioritized collection strategy.',
    category: 'accounts-receivable',
    difficulty: 'intermediate',
    prompt: `Here is the A/R Aging Summary for [CLIENT NAME] as of [DATE]:\n\n[PASTE A/R AGING REPORT]\n\nPlease analyze:\n1. Total A/R and breakdown by aging bucket (current, 1-30, 31-60, 61-90, 90+)\n2. Concentration risk (any single customer > 20% of total A/R?)\n3. DSO calculation and trend (if prior period data provided)\n4. Bad debt reserve recommendation (based on aging)\n5. Priority collection list (highest dollar amounts in oldest buckets first)\n6. For each customer 30+ days overdue, suggest a specific action\n7. Cash impact: If all 30+ day invoices were collected, what would the cash increase be?\n8. Recommendations to prevent future A/R buildup\n9. Journal entry for bad debt allowance (if applicable)`,
    expectedOutput: 'A/R analysis with collection priorities, bad debt estimate, and action plan.',
    tags: ['A/R aging', 'collections', 'analysis'],
  },
  {
    id: 'ar-3',
    title: 'Invoice Template Optimizer',
    description: 'Improve QBO invoice templates to get paid faster.',
    category: 'accounts-receivable',
    difficulty: 'beginner',
    prompt: `My client's average collection time is [DAYS] days. Industry average is [BENCHMARK] days.\n\nCurrent invoice setup:\n- Payment terms: [NET 30, NET 15, etc.]\n- Payment methods accepted: [LIST]\n- Late fee policy: [YES/NO, AMOUNT]\n- Auto-reminders: [YES/NO]\n\nPlease provide:\n1. Optimized invoice template recommendations (what to include/exclude)\n2. Suggested payment terms changes to speed collection\n3. QBO auto-reminder setup (timing and message content)\n4. Late fee policy recommendation and implementation steps in QBO\n5. Online payment optimization (how to set up QBO Payments for faster collection)\n6. Email template for sending invoices that increases open and pay rates\n7. Calculate the cash flow impact of reducing DSO by 5/10/15 days`,
    expectedOutput: 'Invoice optimization recommendations with QBO setup steps and impact analysis.',
    tags: ['invoicing', 'payment terms', 'collections optimization'],
  },
  {
    id: 'ar-4',
    title: 'Revenue Recognition Advisor',
    description: 'Apply proper revenue recognition for complex billing scenarios.',
    category: 'accounts-receivable',
    difficulty: 'advanced',
    prompt: `My client has the following billing scenarios. Help me determine proper revenue recognition:\n\nScenario: [DESCRIBE - e.g., annual subscription billed upfront, milestone-based project billing, retainer with variable usage, product + installation bundle]\n\n- Total contract value: $[AMOUNT]\n- Billing schedule: [DESCRIPTION]\n- Service delivery timeline: [DESCRIPTION]\n- Client's accounting method: [CASH/ACCRUAL]\n\nPlease provide:\n1. Proper revenue recognition method for this scenario\n2. The relevant accounting standard (ASC 606 simplified)\n3. Monthly journal entries for the contract period\n4. How to set this up in QBO (accounts needed, recurring entries)\n5. Deferred revenue balance at each period end\n6. Common mistakes to avoid with this type of billing\n7. Impact on financial statements if done incorrectly`,
    expectedOutput: 'Revenue recognition guidance with journal entries and QBO implementation.',
    tags: ['revenue recognition', 'ASC 606', 'deferred revenue'],
  },

  // === ACCOUNTS PAYABLE (4) ===
  {
    id: 'ap-1',
    title: 'Vendor Payment Prioritizer',
    description: 'Prioritize which bills to pay when cash is tight.',
    category: 'accounts-payable',
    difficulty: 'intermediate',
    prompt: `My client has $[AVAILABLE CASH] available to pay bills, but total bills due are $[TOTAL DUE].\n\nHere are the outstanding bills:\n[LIST: Vendor, Amount, Due Date, Terms, Early Pay Discount, Late Fee, Relationship Importance]\n\nPlease create:\n1. A prioritized payment list using these criteria: Legal obligations first (taxes, payroll), then critical vendors (can't operate without), then strategic (discount opportunities), then everything else\n2. Recommended payment amount for each vendor (partial payments where appropriate)\n3. Cash remaining after each payment\n4. Which vendors to call and negotiate extended terms with\n5. Draft scripts for requesting extended payment terms\n6. A/P aging forecast: what happens to aging if we follow this plan\n7. Early payment discount analysis: ROI of taking each discount`,
    expectedOutput: 'Prioritized payment plan with scripts and discount analysis.',
    tags: ['A/P', 'cash management', 'payment prioritization'],
  },
  {
    id: 'ap-2',
    title: '1099 Vendor Audit',
    description: 'Review all vendors to ensure proper 1099 tracking.',
    category: 'accounts-payable',
    difficulty: 'intermediate',
    prompt: `I need to audit [CLIENT NAME]'s vendor list for 1099 compliance.\n\nHere is the list of vendors and their YTD payments:\n[PASTE VENDOR LIST WITH AMOUNTS]\n\nPlease:\n1. Identify all vendors likely to need a 1099-NEC (services $600+)\n2. Flag vendors that might be exempt (corporations, etc.)\n3. List W-9 information needed for each 1099 vendor\n4. Create a tracking spreadsheet template\n5. Draft an email to send to vendors requesting missing W-9s\n6. Calculate the penalty exposure for each missing W-9\n7. Note the filing deadline and recommended timeline\n8. Identify any vendors that might be misclassified (should be employee vs contractor)`,
    expectedOutput: '1099 audit report with vendor list, W-9 tracking, and penalty calculations.',
    tags: ['1099', 'vendor audit', 'compliance'],
  },
  {
    id: 'ap-3',
    title: 'Expense Policy Creator',
    description: 'Draft an expense policy and implement controls in QBO.',
    category: 'accounts-payable',
    difficulty: 'intermediate',
    prompt: `My client needs an expense policy. Business details:\n- Business type: [TYPE]\n- Number of employees: [NUMBER]\n- Who can make purchases: [LIST ROLES]\n- Current problems: [e.g., no receipts, personal charges, unauthorized purchases]\n- Monthly expense budget: $[AMOUNT]\n\nPlease create:\n1. A comprehensive but simple expense policy covering: approval limits by role, receipt requirements, reimbursement process, prohibited expenses, travel policy, meal/entertainment limits, personal use policy\n2. QBO implementation steps: user roles, approval workflows, expense categories\n3. A receipt collection process (recommend apps/tools)\n4. Monthly audit checklist for the bookkeeper\n5. Consequences for policy violations\n6. Employee acknowledgment form\n\nKeep it practical for a small business - not overly corporate.`,
    expectedOutput: 'Complete expense policy with QBO implementation and employee forms.',
    tags: ['expense policy', 'controls', 'process'],
  },
  {
    id: 'ap-4',
    title: 'Recurring Bill Automation Setup',
    description: 'Set up recurring transactions in QBO for predictable expenses.',
    category: 'accounts-payable',
    difficulty: 'beginner',
    prompt: `My client has the following recurring bills:\n\n[LIST: Vendor, Amount, Frequency, Due Date, Account/Category, Payment Method]\n\nPlease help me:\n1. Set up each as a recurring transaction in QBO (step-by-step with navigation paths)\n2. Choose the right template type for each (Scheduled, Reminder, or Unscheduled)\n3. Set appropriate creation dates (how many days before due)\n4. Group by payment method for efficient batch payments\n5. Create a monthly recurring expense summary\n6. Calculate the total monthly/annual recurring expenses\n7. Identify any that could be renegotiated or eliminated\n8. Set up QBO reminders for variable-amount recurring bills`,
    expectedOutput: 'QBO recurring transaction setup guide with optimization recommendations.',
    tags: ['recurring', 'automation', 'bills'],
  },

  // === JOURNAL ENTRIES (4) ===
  {
    id: 'je-1',
    title: 'Owner Distribution Tracker',
    description: 'Properly record and track owner draws, distributions, and loans.',
    category: 'journal-entries',
    difficulty: 'intermediate',
    prompt: `My client ([ENTITY TYPE]) has the following owner transactions for [PERIOD]:\n\n[LIST: Date, Description, Amount, Source (bank transfer, credit card charge, etc.)]\n\nPlease help me:\n1. Classify each transaction (distribution, draw, loan to shareholder, personal expense, salary)\n2. Create the correct journal entry for each based on entity type\n3. Track the running balance of owner equity/draws\n4. Flag any transactions that could be tax issues (excess distributions, below-market loans, etc.)\n5. Calculate if S-Corp reasonable compensation requirements are being met\n6. Provide the year-end equity reconciliation\n7. Note any QBO accounts needed that might not exist yet`,
    expectedOutput: 'Classified transactions with journal entries and equity reconciliation.',
    tags: ['owner draws', 'distributions', 'equity'],
  },
  {
    id: 'je-2',
    title: 'Loan Amortization Entry Builder',
    description: 'Create loan amortization schedules and monthly entries.',
    category: 'journal-entries',
    difficulty: 'intermediate',
    prompt: `My client has the following loan(s):\n\n[FOR EACH LOAN: Lender, Original amount, Current balance, Interest rate, Monthly payment, Term, Start date, Type (term loan, line of credit, SBA, equipment)]\n\nPlease create:\n1. An amortization schedule for each loan (showing principal, interest, and balance)\n2. Monthly journal entries separating principal and interest\n3. QBO accounts needed (long-term liability, current portion, interest expense)\n4. Year-end adjustment to reclassify current portion of long-term debt\n5. Total interest expense by loan for the year\n6. Remaining balance verification against lender statements\n7. Guidance on how to record in QBO when the bank payment auto-imports`,
    expectedOutput: 'Amortization schedules, journal entries, and QBO recording guidance.',
    tags: ['loans', 'amortization', 'interest'],
  },
  {
    id: 'je-3',
    title: 'Intercompany Transaction Handler',
    description: 'Record intercompany transactions between related entities.',
    category: 'journal-entries',
    difficulty: 'advanced',
    prompt: `My client owns multiple entities that transact with each other:\n\nEntities:\n[LIST: Entity name, Entity type, QBO file]\n\nIntercompany transactions:\n[LIST: From entity, To entity, Description, Amount, Date]\n\nPlease help me:\n1. Create matching journal entries for BOTH sides of each transaction\n2. Set up proper intercompany receivable/payable accounts\n3. Track the running intercompany balance\n4. Verify the balances net to zero across all entities\n5. Flag any transactions that might create tax issues (below-market terms, etc.)\n6. Create a monthly intercompany reconciliation process\n7. Note any transfer pricing considerations\n8. Suggest QBO sub-accounts for clean tracking`,
    expectedOutput: 'Matched intercompany entries with reconciliation and tracking setup.',
    tags: ['intercompany', 'related entities', 'reconciliation'],
  },
  {
    id: 'je-4',
    title: 'Opening Balance Entry Builder',
    description: 'Create opening balance entries when migrating to QBO.',
    category: 'journal-entries',
    difficulty: 'advanced',
    prompt: `I'm migrating [CLIENT NAME] to QuickBooks Online. Here is their prior system data:\n\nTrial Balance as of [DATE]:\n[PASTE TRIAL BALANCE]\n\nAdditional information:\n- A/R detail by customer: [PASTE]\n- A/P detail by vendor: [PASTE]\n- Fixed asset list: [PASTE]\n- Loan balances: [PASTE]\n- Inventory: [PASTE OR N/A]\n\nPlease help me:\n1. Create the opening balance journal entry\n2. Verify debits equal credits\n3. Explain how to enter individual A/R invoices vs. a single journal entry (and which is better)\n4. Same for A/P bills\n5. Handle fixed assets and accumulated depreciation\n6. Set up loan balances correctly\n7. Enter inventory opening balances\n8. Handle retained earnings/owner's equity\n9. Provide a verification checklist after entry`,
    expectedOutput: 'Complete opening balance entries with verification checklist.',
    tags: ['migration', 'opening balances', 'QBO setup'],
  },

  // === QBO AUTOMATION (4) ===
  {
    id: 'auto-1',
    title: 'QBO Workflow Optimizer',
    description: 'Streamline repetitive QBO tasks with automation and best practices.',
    category: 'automation',
    difficulty: 'intermediate',
    prompt: `I want to optimize my monthly workflow for [CLIENT NAME]. Here's my current process:\n\n[DESCRIBE CURRENT MONTHLY WORKFLOW: e.g., Download bank statements, manually categorize transactions, reconcile accounts, run reports, send to client]\n\nTime spent currently: [HOURS] per month\n\nPlease help me:\n1. Identify every task that can be automated or streamlined in QBO\n2. Suggest QBO features I might not be using (bank rules, recurring transactions, memorized reports, etc.)\n3. Recommend third-party apps that integrate with QBO to save time\n4. Create an optimized workflow with estimated time savings\n5. Provide setup instructions for each automation\n6. Calculate my effective hourly rate improvement\n7. Create a standard operating procedure (SOP) for the optimized workflow`,
    expectedOutput: 'Optimized workflow with automation steps and SOP document.',
    tags: ['automation', 'efficiency', 'workflow'],
    isFree: true,
  },
  {
    id: 'auto-2',
    title: 'Bank Rule Master List',
    description: 'Create a comprehensive bank rule set for any industry.',
    category: 'automation',
    difficulty: 'beginner',
    prompt: `Create a comprehensive bank rule set for a [INDUSTRY] business in QBO.\n\nThe client's typical expenses include:\n[LIST KEY VENDORS AND EXPENSE TYPES]\n\nTheir typical revenue sources include:\n[LIST KEY REVENUE SOURCES]\n\nPlease create:\n1. 20+ bank rules organized by category (revenue, payroll, rent, utilities, supplies, etc.)\n2. For each rule: Name, Condition (Contains/Exact match), Action (auto-add/review), Category, Class (if applicable)\n3. Priority order (which rules should be created first for biggest impact)\n4. Rules for common bank fees, interest, and transfers\n5. Rules for payroll transactions (different payroll providers)\n6. A testing checklist to verify rules are working correctly\n7. Maintenance schedule (when to review and update rules)`,
    expectedOutput: '20+ bank rules with conditions, categories, and testing checklist.',
    tags: ['bank rules', 'automation', 'categorization'],
  },
  {
    id: 'auto-3',
    title: 'Memorized Report Package',
    description: 'Set up a complete memorized report suite in QBO.',
    category: 'automation',
    difficulty: 'beginner',
    prompt: `Set up a complete memorized (saved) report suite in QBO for [CLIENT NAME], a [INDUSTRY] business.\n\nReports they need:\n- Monthly P&L (current month and YTD)\n- P&L comparison (vs prior year)\n- Balance Sheet\n- A/R Aging Summary\n- A/P Aging Summary\n- Sales by Customer\n- Expenses by Vendor\n- [ANY INDUSTRY-SPECIFIC REPORTS]\n\nFor each report, provide:\n1. Exact QBO report name\n2. Custom settings (date range, comparison period, filters)\n3. Column selections\n4. How to memorize/save it in QBO (navigation path)\n5. Recommended email schedule (who gets it and when)\n6. Group organization for the report menu\n7. Export format recommendations (PDF vs Excel, when to use each)`,
    expectedOutput: 'Complete memorized report setup guide with schedules and recipients.',
    tags: ['reports', 'memorized reports', 'automation'],
  },
  {
    id: 'auto-4',
    title: 'QBO App Stack Recommender',
    description: 'Recommend the best QBO-integrated apps for any bookkeeper.',
    category: 'automation',
    difficulty: 'beginner',
    prompt: `I'm a bookkeeper with [NUMBER] clients. My current tech stack is:\n[LIST CURRENT TOOLS]\n\nPain points:\n[LIST: e.g., too much manual data entry, receipt collection is a nightmare, client communication is scattered, time tracking is messy]\n\nBudget for tools: $[AMOUNT]/month\n\nPlease recommend:\n1. Essential apps for every bookkeeper (receipt capture, practice management, document sharing)\n2. QBO-integrated apps that solve my specific pain points\n3. For each app: Name, price, what it does, QBO integration quality (1-5 stars), and setup time\n4. A comparison table of alternatives for each category\n5. Priority order for implementation\n6. Estimated time savings per month for each app\n7. Total ROI calculation (cost vs time saved at $[HOURLY RATE]/hr)\n8. Apps to avoid (poor QBO integration or reliability issues)`,
    expectedOutput: 'Curated app stack with comparisons, pricing, and ROI analysis.',
    tags: ['apps', 'tech stack', 'integrations'],
  },

  // === CLIENT COMMUNICATION (5) ===
  {
    id: 'cc-1',
    title: 'Monthly Client Update Email',
    description: 'Draft a professional monthly update email with financial highlights.',
    category: 'client-communication',
    difficulty: 'beginner',
    prompt: `Draft a monthly financial update email for [CLIENT NAME].\n\nKey numbers this month:\n- Revenue: $[AMOUNT] (vs $[PRIOR MONTH] last month)\n- Expenses: $[AMOUNT] (vs $[PRIOR MONTH] last month)\n- Net Income: $[AMOUNT]\n- Cash Balance: $[AMOUNT]\n- Outstanding A/R: $[AMOUNT]\n- Notable items: [LIST: e.g., large expense, new customer, unusual transaction]\n\nPlease write:\n1. A concise, friendly email summarizing the financial health\n2. Use plain English (no accounting jargon)\n3. Highlight 2-3 wins and 1-2 areas of concern\n4. Include a specific action item or question for the client\n5. Close with a look-ahead to next month\n\nTone: Friendly expert advisor, not just a number cruncher. The client should feel like they have a CFO in their corner.`,
    expectedOutput: 'Professional monthly update email ready to send.',
    tags: ['email', 'monthly update', 'client communication'],
    isFree: true,
  },
  {
    id: 'cc-2',
    title: 'Difficult Conversation Prep',
    description: 'Prepare for difficult client conversations about finances.',
    category: 'client-communication',
    difficulty: 'intermediate',
    prompt: `I need to have a difficult conversation with [CLIENT NAME] about:\n[SITUATION: e.g., they're mixing personal and business expenses, their books are a mess and need a cleanup fee, they owe back taxes, they're about to run out of cash, they need to raise prices]\n\nContext:\n- How long they've been a client: [TIME]\n- Relationship quality: [GOOD/OK/STRAINED]\n- Their personality: [TYPE: e.g., detail-oriented, hands-off, defensive, etc.]\n\nPlease prepare:\n1. Opening statement that leads with empathy and concern for their business\n2. Key talking points with specific numbers/examples\n3. Anticipated pushback and how to respond to each\n4. The specific ask or recommendation\n5. A follow-up email to send after the conversation documenting what was discussed\n6. Alternative approaches if they're resistant to the recommended change`,
    expectedOutput: 'Conversation prep with talking points, objection handling, and follow-up email.',
    tags: ['difficult conversations', 'client management', 'communication'],
  },
  {
    id: 'cc-3',
    title: 'Scope Creep Boundary Setter',
    description: 'Address scope creep and set boundaries with clients professionally.',
    category: 'client-communication',
    difficulty: 'intermediate',
    prompt: `My client [CLIENT NAME] keeps asking me to do work outside our agreement. Our agreement covers:\n[LIST INCLUDED SERVICES]\n\nThey've been asking me to also do:\n[LIST OUT-OF-SCOPE REQUESTS]\n\nFrequency: [HOW OFTEN]\nTime impact: approximately [HOURS] extra per month\n\nPlease help me:\n1. Draft a professional email addressing the scope creep\n2. Clearly define what's included vs. what's additional\n3. Propose pricing for the additional services (at $[RATE]/hr or as a package)\n4. Create an updated scope of work / engagement letter\n5. Provide scripts for saying "no" to future out-of-scope requests gracefully\n6. Suggest how to prevent this with future clients (better onboarding, clearer SOW)`,
    expectedOutput: 'Scope creep email, updated SOW, and scripts for boundary setting.',
    tags: ['scope creep', 'boundaries', 'pricing', 'engagement letter'],
  },
  {
    id: 'cc-4',
    title: 'Price Increase Announcement',
    description: 'Draft a professional price increase communication.',
    category: 'client-communication',
    difficulty: 'beginner',
    prompt: `I need to raise my rates from $[CURRENT] to $[NEW] per [MONTH/HOUR] for [ALL CLIENTS / SPECIFIC CLIENT].\n\nDetails:\n- Last rate increase: [DATE or NEVER]\n- Reason: [e.g., inflation, expanded services, additional work, market rate adjustment]\n- Effective date: [DATE]\n- Advance notice: [WEEKS/MONTHS]\n\nPlease draft:\n1. A professional price increase email that leads with value delivered\n2. Emphasize what they've been getting (list specific benefits)\n3. Present the increase as an investment in their business\n4. Offer a loyalty incentive (e.g., lock in rate for 12 months if they prepay)\n5. Include FAQ section anticipating their questions\n6. A follow-up script if they push back\n7. An alternative option (reduced scope at current price, if applicable)`,
    expectedOutput: 'Price increase email with value framing, FAQ, and pushback scripts.',
    tags: ['pricing', 'rate increase', 'client retention'],
  },
  {
    id: 'cc-5',
    title: 'Client Wow Report',
    description: 'Create a visually appealing financial summary that impresses clients.',
    category: 'client-communication',
    difficulty: 'intermediate',
    prompt: `Create a "Client Wow Report" for [CLIENT NAME] for [PERIOD]. This should be a financial summary that goes beyond basic reports and actually impresses the client.\n\nData:\n- Revenue: $[AMOUNT] (prior period: $[AMOUNT])\n- Expenses: $[AMOUNT] (prior period: $[AMOUNT])\n- Net Income: $[AMOUNT]\n- Cash: $[AMOUNT]\n- A/R: $[AMOUNT]\n- Key metrics for their industry: [ANY SPECIFIC]\n\nPlease create:\n1. A visually structured report with sections and clear formatting\n2. "Scoreboard" section: 5 key numbers with up/down arrows and context\n3. "What's Working" section: 3 positive trends with explanations\n4. "Watch List" section: 2-3 areas that need attention\n5. "Your Money Moves" section: 3 specific recommendations they can implement\n6. "Looking Ahead" section: What to expect next month\n7. Industry comparison: How they stack up\n8. Include a conversational summary paragraph they'd actually want to read\n\nThis should be something a non-accountant business owner would love to receive and actually read.`,
    expectedOutput: 'A "Client Wow Report" that makes clients feel they have a real CFO advisor.',
    tags: ['wow report', 'client deliverable', 'financial summary'],
  },
];

export const FREE_PROMPT_IDS = PROMPTS.filter(p => p.isFree).map(p => p.id);

export function getPromptsByCategory(category: PromptCategory): Prompt[] {
  return PROMPTS.filter(p => p.category === category);
}

export function searchPrompts(query: string): Prompt[] {
  const lower = query.toLowerCase();
  return PROMPTS.filter(p =>
    p.title.toLowerCase().includes(lower) ||
    p.description.toLowerCase().includes(lower) ||
    p.tags.some(t => t.toLowerCase().includes(lower)) ||
    p.category.toLowerCase().includes(lower)
  );
}
