export const profile = {
  name: "Nadeem Shabir Mir",
  shortName: "Nadeem Shabir",
  degree: "Final year B.Tech",
  school: "IIT Bombay",
  classYear: "Class of 2027",
  location: "Mumbai",
  email: "mirnadeem2021@gmail.com",
  github: "https://github.com/nadeemshabir",
  githubHandle: "nadeemshabir",
  linkedin: "https://www.linkedin.com/in/nadeem-shabir-278022280",
  portraitSrc: "/portrait.jpg",
  availability:
    "Open to AI engineering and software engineering roles.",
};

export const nav = [
  { href: "/#work", id: "work", label: "Experience" },
  { href: "/#projects", id: "projects", label: "Projects" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export type Section = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ResultTable = {
  caption: string;
  columns: string[];
  rows: { cells: string[]; emphasis?: boolean }[];
};

export type Writeup = {
  slug: string;
  title: string;
  meta: string;
  summary: string;
  skills: string[];
  href: string;
  back: string;
  links: { label: string; href: string; home?: boolean }[];
  sections: Section[];
  table?: ResultTable;
  note?: string;
};

export const roles: Writeup[] = [
  {
    slug: "alimento",
    title: "Agentic AI Engineer Intern",
    meta: "Alimento Agro Foods, May 2026 to June 2026",
    summary:
      "Checked distributor promotional claims against bills that arrived handwritten, scanned, or digital.",
    skills: ["Gemini", "FastAPI", "PostgreSQL", "entity matching"],
    href: "/work/alimento",
    back: "/#work",
    links: [],
    sections: [
      {
        heading: "Document intelligence",
        bullets: [
          "Built a Gemini workflow that classifies bills and extracts structured line items from mixed formats.",
          "Added field level confidence scores so a reliable extraction can be separated from an uncertain one.",
        ],
      },
      {
        heading: "Claim reconciliation",
        bullets: [
          "Built a multi stage check of product and bill data against the promotional claim.",
          "Combined exact product matching, fuzzy name similarity, and price checks, because product descriptions are not written the same way twice.",
          "Routed ambiguous and conflicting matches to a person, instead of treating every automatic match as final.",
        ],
      },
      {
        heading: "Backend",
        bullets: [
          "FastAPI with asynchronous Python, and PostgreSQL for claim history.",
          "Checked new bills against earlier submissions, while unresolved historical claims stayed intact.",
        ],
      },
    ],
    note: "This is a public summary. Internal documents, production data, private business rules, and company code are not included.",
  },
  {
    slug: "bharatrix",
    title: "AI Engineer Intern",
    meta: "BharatRix Private Limited, February 2026 to April 2026",
    summary:
      "Tutoring in chat and live voice, grounded in more than 2,100 YouTube transcripts.",
    skills: ["RAG", "Pinecone", "Gemini Live", "FastAPI", "WebSockets"],
    href: "/work/bharatrix",
    back: "/#work",
    links: [],
    sections: [
      {
        heading: "Retrieval",
        bullets: [
          "Retrieved transcript passages and passed them in as context for each reply.",
          "Embedded text with `paraphrase-multilingual-mpnet-base-v2` (768 dimensions) and stored the vectors in Pinecone.",
          "Kept the top five chunks and their source metadata, so a response can be traced to a transcript.",
        ],
      },
      {
        heading: "Real time voice",
        bullets: [
          "Connected the Gemini Live API to FastAPI WebSockets for audio in both directions.",
          "Streamed PCM audio during the session.",
          "Handled barge in, so a person can interrupt a reply and the conversation continues.",
        ],
      },
    ],
  },
  {
    slug: "quansys",
    title: "Data Engineering Intern",
    meta: "Quansys AI Technologies Pvt. Ltd., January 2026 to April 2026",
    summary:
      "Fine tuned Whisper on a cleaned Hindi corpus, and built ingestion that can resume after a crash.",
    skills: ["Whisper", "A100", "speech data", "data pipelines"],
    href: "/work/quansys",
    back: "/#work",
    links: [],
    sections: [
      {
        heading: "Fine tuning",
        bullets: [
          "Fine tuned OpenAI Whisper on NVIDIA A100 GPUs.",
          "The corpus was a custom cleaned Hindi speech set of more than 27,000 files.",
          "Work covered both the data preparation and the training run.",
        ],
      },
      {
        heading: "Preparation",
        bullets: [
          "Schema transformation, deduplication, text cleaning, and timestamp aligned audio chunking.",
          "The output was one training ready format.",
        ],
      },
      {
        heading: "Ingestion",
        bullets: [
          "A crash resumable, VM safe pipeline for 35+ Indic speech datasets across 20+ Indian languages.",
          "More than 10 TB of audio from Hugging Face and Mozilla Common Voice.",
          "Memory efficient extraction, so a long job does not repeat work it has already finished.",
        ],
      },
    ],
  },
];

export const projects: Writeup[] = [
  {
    slug: "swe-agent",
    title: "Autonomous SWE Agent",
    meta: "A coding agent that reads the repo, edits, and looks at the tests",
    summary:
      "Given a coding task, it retrieves repository context, edits files, runs tests, and records the run. A failed tool call comes back as an observation instead of ending the job.",
    skills: ["Python", "FastAPI", "Tree-sitter", "ChromaDB", "Celery", "PostgreSQL"],
    href: "/projects/swe-agent",
    back: "/#projects",
    links: [{ label: "GitHub", href: "https://github.com/nadeemshabir/auto-swe-agent", home: true }],
    sections: [
      {
        heading: "What it does",
        paragraphs: [
          "Repository work is more than a code suggestion. The agent has to find the relevant files, change the right places, run tests, and respond when an assumption is wrong.",
        ],
      },
      {
        heading: "Retrieval",
        bullets: [
          "Tree-sitter parses source into chunks. Sentence Transformers embed them. ChromaDB stores the index.",
          "The agent pulls the code that matters for the task, instead of dumping the whole repository into the prompt.",
        ],
      },
      {
        heading: "Loop",
        bullets: [
          "A manual ReAct loop alternates between a decision and a tool: search, read, edit, run tests, read the output.",
          "Tool results go back into the next decision. A tool error is an observation. It does not have to stop the run.",
          "Planner, coder, and reviewer are stages in that one loop, not three separate services.",
        ],
      },
      {
        heading: "Limits and backend",
        bullets: [
          "An execution budget caps how much a run can do. File edits stay inside the working tree.",
          "FastAPI accepts the request. Celery runs the agent. Redis is the queue. PostgreSQL stores the run and the trace. Docker Compose hosts the stack on an Azure VM.",
        ],
      },
    ],
    note: "Tested on controlled GitHub issues in a test repository. A wide range of real repositories still needs further evaluation.",
  },
  {
    slug: "researchgpt",
    title: "ResearchGPT",
    meta: "Retrieval over research papers, with the choices decided by measurement",
    summary:
      "Answers a question from the paper text and cites the passage. Retrieval weights, fusion, and reranking were chosen from a SciFact evaluation, not left at the first setting.",
    skills: ["SciFact eval", "hybrid search", "ChromaDB", "FastAPI", "React"],
    href: "/projects/researchgpt",
    back: "/#projects",
    links: [
      { label: "GitHub", href: "https://github.com/nadeemshabir/ResearchGPT", home: true },
      { label: "Evaluation notes", href: "https://github.com/nadeemshabir/ResearchGPT/blob/main/docs/EVALUATION.md" },
      { label: "Live demo", href: "https://researchgpt-dljnaee32a-uc.a.run.app", home: true },
    ],
    table: {
      caption:
        "BEIR SciFact. 300 expert labelled queries over 5,183 scientific abstracts. No hand written or model written labels.",
      columns: ["Configuration", "Recall@5", "Recall@10", "MRR", "nDCG@10", "p95"],
      rows: [
        { cells: ["BM25 only", "0.6969", "0.7598", "0.5937", "0.6301", "98 ms"] },
        { cells: ["Dense only (MiniLM)", "0.7346", "0.7833", "0.6012", "0.6422", "40 ms"] },
        { cells: ["Hybrid 0.7 / 0.3", "0.7523", "0.8110", "0.6512", "0.6873", "179 ms"] },
        { cells: ["Hybrid RRF (k=60)", "0.7141", "0.7924", "0.6222", "0.6599", "178 ms"] },
        { cells: ["Hybrid 0.7 / 0.3 plus rerank", "0.7416", "0.8272", "0.6629", "0.6948", "4,998 ms"] },
        {
          cells: ["Hybrid 0.5 / 0.5 (shipped)", "0.7505", "0.8202", "0.6632", "0.6972", "179 ms"],
          emphasis: true,
        },
      ],
    },
    sections: [
      {
        heading: "What the table changed",
        paragraphs: [
          "The shipped setting is equal weight hybrid search: 0.5 semantic and 0.5 BM25. The earlier 0.7 / 0.3 split scored lower on nDCG@10. nDCG@10 at 0.5 / 0.5 is 0.6972, above the published ColBERTv2 number of 0.693, on CPU.",
          "A cross encoder reranker was measured and turned off. It cost about 28 times the latency for a small nDCG gain, and Recall@5 dropped. Reciprocal rank fusion also scored below weighted fusion, by 3.8 recall points.",
          "Hybrid search beat BM25 and dense retrieval on every metric in the table. Recall@5 is 5.5 points above BM25 and 1.8 above dense retrieval.",
        ],
      },
      {
        heading: "Generation scores that were withdrawn",
        paragraphs: [
          "RAGAS was run (faithfulness 0.8650, answer relevancy 0.8026 on 43 questions) and then not quoted. Calibrating the LLM judge against 23 hand graded answers gave Cohen's kappa of -0.195, worse than chance. The judge scored 0.781 on answers a person called supported and 0.783 on ones a person rejected.",
          "What is kept is what the code counts, not what a model judge says.",
        ],
        bullets: [
          "Unanswerable questions declined: 23 of 23.",
          "Citation rate for the deterministic citer: 1.0000, with 0 fabricated citations.",
          "Citation coverage, meaning the right sources were named: 0.9225.",
          "Median latency per question: 2.7 seconds.",
        ],
      },
      {
        heading: "How an answer is built",
        bullets: [
          "PDFs are chunked on section boundaries, then indexed in ChromaDB and in BM25.",
          "A question runs both searches. The scores are fused with the tuned weights. The reranker stays off.",
          "Citations are attached in code, by matching each paragraph to the chunks it came from. The model does not write the sources.",
          "If nothing relevant is indexed, the system says so instead of answering from memory.",
        ],
      },
    ],
  },
];

export function roleBySlug(slug: string) {
  return roles.find((role) => role.slug === slug);
}

export function projectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
