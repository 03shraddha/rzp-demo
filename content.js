// ai opportunity map - content data
// edit this file to update entries, or use the add entry button in the ui.
// for bullet points in problem/solution, use \n to separate lines.

window.ENTRIES = [
  {
    id: "entry-4",
    name: "Aryan Pareek",
    role: "Product Manager",
    team: "Small & Medium Enterprises",
    company: "Razorpay",
    problem: "fragmented merchant ops - payments, shipping, and leads all in separate tools with no unified view\nnon-tech SME owners have no way to act on their own data - no dashboard, no pincode intelligence, no lead tracking",
    solution: "unified AI dashboard with payment geography, cancellation patterns, and Shiprocket integration to flag unserviceable pincodes at checkout\nno-code tools that centralize everything in one place - creating lock-in and cross-sell opportunities for Razorpay",
    refs: [
      { label: "what's driving Q1 revenue? - Claude managed agents slack bot", url: "https://platform.claude.com/cookbook/managed-agents-slack-data-bot" },
      { label: "Shopify on X", url: "https://x.com/Shopify/status/2042335627862032754" },
      { label: "searchstack-aeo - GitHub", url: "https://github.com/alexpospekhov/searchstack-aeo" },
      { label: "Shopify MCP agent catalog - merchant AI tooling reference", url: "https://shopify.dev/docs/agents/catalog/mcp" },
      { label: "Rows.com - no-code dashboard builder for non-tech teams", url: "https://rows.com/blog/post/no-code-dashboard-builder" }
    ]
  },
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
      { label: "@shannholmberg - AI-driven ad optimization in practice", url: "https://x.com/shannholmberg/status/2042316671579472167" },
      { label: "@ihtesham2005", url: "https://x.com/ihtesham2005/status/2042392207425225067" }
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
      { label: "Momentic (YC) - AI agent for automated QA testing", url: "https://www.ycombinator.com/companies/momentic" }
    ]
  },
  {
    id: "entry-5",
    name: "Ritwik Kadu",
    role: "Product Manager",
    team: "Cross Border Payments",
    company: "Razorpay",
    problem: "cross-border flows require per-corridor compliance work (RBI guidelines, GST invoicing, KYC) handled manually - one failed audit can shut down a merchant's international access\ninternational builders default to Stripe at the point of creation - no Razorpay footprint in AI dev tools or no-code platforms where apps are built",
    solution: "scrape the merchant's site at onboarding - auto-generate their T&C page and website whitelisting docs in seconds, not days - remove the biggest friction point that stalls activation\nown 'best payment gateway india' in search - when indian smes google payment options, razorpay should rank first, not appear as one option among many\nprogrammatic seo across every payment intent query - 'accept payments india', 'upi for business', 'payment gateway for startups' - razorpay should be the answer before the question is finished",
    refs: [
      { label: "Shopify on X - merchant onboarding automation", url: "https://x.com/Shopify/status/2042335627862032754" },
      { label: "seomachine - GitHub - programmatic SEO automation", url: "https://github.com/TheCraigHewitt/seomachine" },
      { label: "Sardine merchant risk agent - real-time website content monitoring at onboarding", url: "https://www.sardine.ai/merchant-risk" }
    ]
  },
  {
    id: "entry-6",
    name: "Pranay Bagrecha",
    role: "Product Manager",
    team: "Cross-Border Payments",
    company: "Razorpay",
    problem: "every standup required manual sql pulls from the data team — no self-serve analytics\nheavy documentation overhead and manual QA left little time for actual product decisions",
    solution: "now pulls weekly metrics and blocker data himself via an analytics agent, no dependency on data team\nnext step is browser automation and automated test coverage to replace manual QA",
    refs: [
      { label: "Reflect.run - AI-powered end-to-end testing platform", url: "https://reflect.run/" }
    ],
    ideasNote: "covered in other areas already"
  },
  {
    id: "entry-7",
    name: "Suyash Ratna",
    role: "Product Manager",
    team: "Offline Payments - Merchant Experience",
    company: "Razorpay",
    problem: "knowledge lives in slack threads and PM heads - no shared context across POS, hardware, call center, and field merchant teams. high TAT, constant re-interruptions\nmerchant escalations via social and email go undocumented - can't identify the merchant, owner, or timeline on time",
    solution: "per-PM AI agent with live project memory + slack summariser dashboard - any team gets context without interrupting the PM\ncrawler that detects merchant escalations across social and email, auto-identifies the merchant, and routes to ops with full context",
    refs: [
      { label: "Lenny Rachitsky - how to build a PM second brain with ChatGPT", url: "https://x.com/lennysan/status/2001049628641566957" },
      { label: "Gad Benram - built JIRA + Slack for AI agents using LangGraph + MCP", url: "https://x.com/gadbenram/status/2019521641156632619" },
      { label: "AethirCloud - AI infrastructure for real-time social monitoring at scale", url: "https://x.com/AethirCloud/status/2041821409006002510" }
    ]
  },
  {
    id: "entry-sreyas",
    name: "Sreyas Reddy Molugu",
    role: "Software Developer",
    team: "Core Payments",
    company: "Razorpay",
    problem: "compliance certification testing on FIDE is entirely manual - engineers connect to the portal by hand, run test cases one by one, and trace logs to find failures - every RBI or card network guideline change triggers another full cycle\nRBI mandates strict transaction validity rules - a credit card approved to process payments for a defined window cannot legally continue accepting transactions after that window closes - verifying this on every code change requires a full certification run each time\non-call engineers handle every production issue manually from start to finish - latency spike or failed payment fires a page, but Grafana triage, root cause analysis, patch, and deploy via Ray all require human effort. Vium can raise PRs but cannot test the code it writes",
    solution: "automated compliance loop: a test runner agent connects to FIDE and executes the full test suite, a log monitor agent watches Grafana and service logs in parallel, a failure analyzer agent identifies action points from failed cases, and a coding agent applies the fix and deploys via Ray - then the test runner reruns to confirm. no engineer needed in the loop\nsame pipeline handles on-call: when an alert fires, the monitor agent pulls metrics and logs, the analyzer traces root cause, the coding agent patches and deploys, and the test agent reruns to confirm - on-call becomes a supervisor not an executor\nVium integration: test runner agent runs against every Vium PR in staging before merge, removing the human verification step entirely",
    refs: [
      { label: "Claude managed agents quickstart - build custom agents to monitor logs, raise Jira tickets, and run automated tests", url: "https://platform.claude.com/workspaces/default/agent-quickstart" },
      { label: "Cognition Devin 2.2 - agent that self-verifies, tests with computer use, and auto-fixes its own code", url: "https://x.com/cognition/status/2026343816521994339" },
      { label: "PagerDuty AI incident responder - automated on-call triage and resolution agent", url: "https://x.com/pagerduty/status/1983247743305814472" },
      { label: "Rackspace LEIA - AI agent for compliance ops, cut manual processing by 150 hours per month", url: "https://x.com/Rackspace/status/2029612703401103751" },
      { label: "RBI payment gateway compliance requirements - Razorpay", url: "https://razorpay.com/blog/payment-gateway-compliance/" }
    ]
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
    id: "entry-10",
    name: "Shivank Kumar",
    role: "Strategy Manager",
    team: "",
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
