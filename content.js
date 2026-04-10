// ai opportunity map - content data
// edit this file to update entries, or use the add entry button in the ui.
// for bullet points in problem/solution, use \n to separate lines.

window.ENTRIES = [
  {
    id: "entry-1",
    name: "Ayush Singh",
    role: "Business Analyst",
    team: "Engage (Ads Team)",
    company: "Razorpay",
    problem: "meta + google campaigns run manually with zero bid optimization or feedback loops\nhigh ops overhead, consistently suboptimal performance",
    solution: "agentic campaign manager that auto-launches and adjusts bids in real time\nworks across Meta and Google Ads, fully autonomous once set up",
    refs: [
      { label: "@Jaredorkin - real implementation of agentic campaign management", url: "https://x.com/Jaredorkin/status/2042006561292480912" },
      { label: "@shannholmberg - AI-driven ad optimization in practice", url: "https://x.com/shannholmberg/status/2042316671579472167" }
    ]
  },
  {
    id: "entry-3",
    name: "Prithvi Anil Kumar",
    role: "Backend Engineer",
    team: "Credit Cards Team",
    company: "CRED",
    problem: "QA is manual and misses edge cases across mobile flows\nblocks release velocity and slows engineering throughput",
    solution: "agentic test runner that simulates real user flows and finds edge cases\nruns on every build, removes manual QA dependency entirely",
    refs: [
      { label: "Reflect.run - AI-powered end-to-end testing platform", url: "https://reflect.run/" },
      { label: "Momentic (YC) - AI agent for automated QA testing", url: "https://www.ycombinator.com/companies/momentic" }
    ]
  },
  {
    id: "entry-4",
    name: "Aryan Pareek",
    role: "Product Manager",
    team: "Small & Medium Enterprises",
    company: "Razorpay",
    problem: "fragmented merchant ops - payments, shipping, and leads all in separate tools with no unified view\nnon-tech SME owners have no way to act on their own data - no dashboard, no pincode intelligence, no lead tracking",
    solution: "unified AI dashboard with payment geography, cancellation patterns, and Shiprocket integration to flag unserviceable pincodes at checkout\nno-code tools that centralize everything in one place - creating lock-in and cross-sell opportunities for Razorpay",
    refs: [
      { label: "Shopify on X", url: "https://x.com/Shopify/status/2042335627862032754" },
      { label: "searchstack-aeo - GitHub", url: "https://github.com/alexpospekhov/searchstack-aeo" },
      { label: "Shopify MCP agent catalog - merchant AI tooling reference", url: "https://shopify.dev/docs/agents/catalog/mcp" },
      { label: "Rows.com - no-code dashboard builder for non-tech teams", url: "https://rows.com/blog/post/no-code-dashboard-builder" }
    ]
  },
  {
    id: "entry-5",
    name: "Ritwik Kadu",
    role: "Product Manager",
    team: "Cross Border Payments",
    company: "Razorpay",
    problem: "",
    solution: "",
    refs: []
  },
  {
    id: "entry-6",
    name: "Pranay Bagrecha",
    role: "Product Manager",
    team: "",
    company: "Razorpay",
    problem: "",
    solution: "",
    refs: []
  },
  {
    id: "entry-7",
    name: "Suyash Ratna",
    role: "Product Manager",
    team: "Offline Payments - Merchant Experience",
    company: "Razorpay",
    problem: "knowledge is trapped in slack threads and individual PM heads - full-stack offline team (POS, checkout devices, hardware, call center, field merchants) has no shared context layer, so TAT is high and multiple teams interrupt the same PM asking the same questions\nmerchant escalations via social media and email go undocumented and unrouted - no way to identify the merchant on time, who owns it, or when it was flagged",
    solution: "per-PM AI agent with live context across all projects (not KT docs - actual working memory) paired with a slack summariser dashboard so any team can get context on integration experiments, merchant experience, and hardware without interrupting the PM\ncrawler that monitors merchant forums, social, and email for escalation signals - auto-identifies the merchant, flags it internally, and hands the ops person enough context to act immediately",
    refs: []
  },
  {
    id: "entry-8",
    name: "Lakshmish Hegde",
    role: "Associate Manager",
    team: "Banking Product & Solutions",
    company: "Razorpay",
    problem: "",
    solution: "",
    refs: []
  },
  {
    id: "entry-9",
    name: "Deepak Sivaraman",
    role: "Manager",
    team: "GTM Strategy",
    company: "Razorpay",
    problem: "",
    solution: "",
    refs: []
  },
  {
    id: "entry-2",
    name: "Mohammed Abdul Razzaq",
    role: "Backend Engineer",
    team: "Core Finance",
    company: "J.P. Morgan",
    problem: "approval workflows scattered across email chains with no single source of truth\ncoordination delays slow down finance ops across the board",
    solution: "centralized AI hub with LLM context summarization for fast stakeholder decisions\nasync approvals with intelligent nudges for anything still pending",
    refs: [
      { label: "r/automation - people already using AI to speed up internal approvals", url: "https://www.reddit.com/r/automation/comments/1lvhhcn/anyone_using_ai_to_help_speed_up_internal/" }
    ]
  }
];
