import {
  ProfileData,
  EducationItem,
  SkillItem,
  ProjectItem,
  ServiceItem,
  ExperienceItem,
  AchievementItem,
  BlogPostItem,
  GalleryItem,
} from '../types';

export const initialProfile: ProfileData = {
  name: 'Abdi Ahmed Sharif',
  title: 'Senior Technology Strategist & Principal Software Architect',
  domain: 'Abdanet.com',
  tagline: 'Engineering scalable distributed systems, modern cloud architectures, and transformative digital experiences.',
  summary: 'Abdi Ahmed Sharif is a seasoned technology leader, systems architect, and software engineer with over a decade of experience driving digital innovation, enterprise software development, and high-impact digital initiatives.',
  aboutBio: 'With a career grounded in deep computer science principles and executive technology leadership, Abdi Ahmed Sharif has spearheaded complex system modernizations, cloud transitions, and cross-border software deployments. His approach pairs rigorous architectural patterns with an unrelenting focus on business outcomes, user clarity, and operational resilience.',
  personalBackground: 'Raised with an innate curiosity for computing and engineering, Abdi transitioned from hands-on programming to leading multi-disciplinary engineering teams across telecommunications, financial technology, and government digital modernization. Outside of architecting enterprise solutions, he is passionate about mentoring the next generation of software engineers, advancing open digital public infrastructure, and exploring AI-driven productivity systems.',
  interests: [
    'Distributed Cloud Computing',
    'Financial Inclusion Systems',
    'AI Systems & Intelligent Automation',
    'Digital Public Goods',
    'Competitive Chess & Strategy',
    'Youth Tech Mentorship'
  ],
  email: 'abdisaahmed42@gmail.com',
  phone: '+252 61 500 0000',
  location: 'Mogadishu & Global Remote',
  availability: 'Available for Executive Consulting & Strategic Partnerships',
  yearsExperience: 10,
  completedProjects: 48,
  enterpriseClients: 24,
  satisfactionRate: 99,
  heroImage: '/src/assets/images/abdi_ahmed_sharif_portrait_1794009853483.jpg',
  workspaceImage: '/src/assets/images/executive_modern_office_1794009853111.jpg',
  socials: {
    facebook: 'https://facebook.com/AbdiAhmedSharif',
    telegram: 'https://t.me/AbdiAhmedSharif',
    youtube: 'https://youtube.com/@AbdaNetTech',
    linkedin: 'https://linkedin.com/in/abdi-ahmed-sharif',
    github: 'https://github.com/abdanet',
    twitter: 'https://twitter.com/abdanet_tech'
  }
};

export const initialEducation: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Master of Science (M.Sc.)',
    field: 'Computer Science & Software Systems',
    institution: 'University of Information Technology',
    period: '2016 – 2018',
    location: 'International Graduate Program',
    honors: 'Graduated with First-Class Distinction (Summa Cum Laude)',
    description: 'Specialized in Distributed Architecture, High-Concurrency Cloud Platforms, and Cryptographic Security Protocols.',
    highlights: [
      'Master Thesis: Resilient Distributed Consensus for Cross-Border Financial Gateways',
      'President of Graduate Engineering Computing Society',
      'Dean’s Honor List for Academic Excellence across all consecutive semesters'
    ]
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Science (B.Sc.)',
    field: 'Information Technology & Software Engineering',
    institution: 'Faculty of Computer Science and Engineering',
    period: '2011 – 2015',
    location: 'Mogadishu, Somalia',
    honors: 'Department Valedictorian & Highest Honors',
    description: 'Comprehensive study of algorithmic foundations, software development lifecycles, database management, and telecommunications networks.',
    highlights: [
      'Led the winning collegiate software capstone project in National Tech Innovation Cup',
      'Represented institution at regional East African Computing Olympiad',
      'Published undergraduate paper on mobile banking network latency mitigation'
    ]
  },
  {
    id: 'edu-3',
    degree: 'Executive Professional Certification',
    field: 'Enterprise Cloud Architecture & Cybersecurity Governance',
    institution: 'Cloud Native Computing Foundation (CNCF) & AWS Institute',
    period: '2020 – 2021',
    location: 'Online Executive Credentials',
    honors: 'Distinguished Fellow Credential',
    description: 'Intensive specialization covering multi-cloud resilience, Kubernetes cluster operations, zero-trust security postures, and microservice orchestration.',
    highlights: [
      'Advanced Certified Solutions Architect (Professional Level)',
      'Certified Kubernetes Administrator (CKA)'
    ]
  }
];

export const initialSkills: SkillItem[] = [
  { id: 'sk-1', name: 'Distributed Systems & Microservices', category: 'Architecture & Cloud', proficiency: 96, experienceYears: 9, featured: true },
  { id: 'sk-2', name: 'Cloud Infrastructure (AWS / GCP / Azure)', category: 'Architecture & Cloud', proficiency: 94, experienceYears: 8, featured: true },
  { id: 'sk-3', name: 'Docker, Kubernetes & Containerization', category: 'Architecture & Cloud', proficiency: 92, experienceYears: 7, featured: true },
  { id: 'sk-4', name: 'Full-Stack TypeScript & React / Node.js', category: 'Technical', proficiency: 95, experienceYears: 10, featured: true },
  { id: 'sk-5', name: 'Go, Python & High-Throughput APIs', category: 'Technical', proficiency: 88, experienceYears: 7, featured: true },
  { id: 'sk-6', name: 'Database Architecture (PostgreSQL, Redis, Mongo)', category: 'Technical', proficiency: 93, experienceYears: 9, featured: true },
  { id: 'sk-7', name: 'FinTech Integrations & Payment Gateways', category: 'Technical', proficiency: 94, experienceYears: 8, featured: true },
  { id: 'sk-8', name: 'Executive Tech Leadership & Team Scaling', category: 'Digital & Leadership', proficiency: 92, experienceYears: 6, featured: true },
  { id: 'sk-9', name: 'Agile Product Lifecycle & Scrum Mastery', category: 'Digital & Leadership', proficiency: 90, experienceYears: 8, featured: false },
  { id: 'sk-10', name: 'Cybersecurity, OWASP & Zero-Trust Architecture', category: 'Architecture & Cloud', proficiency: 89, experienceYears: 6, featured: true },
  { id: 'sk-11', name: 'CI/CD Pipelines (GitHub Actions, GitLab, Terraform)', category: 'Tools & Frameworks', proficiency: 91, experienceYears: 7, featured: false },
  { id: 'sk-12', name: 'GraphQL, gRPC & Real-time WebSockets', category: 'Tools & Frameworks', proficiency: 87, experienceYears: 5, featured: false }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'NexusPay Enterprise Financial Settlement Platform',
    category: 'FinTech & Payments',
    summary: 'A resilient, real-time multi-currency clearing and settlement engine processing high volumes with sub-second finality.',
    fullDescription: 'Architected and led the engineering of a mission-critical core financial engine that integrates commercial banking nodes, mobile money networks, and international remittance channels. Implemented strict event-sourcing with idempotent transaction ledgers, achieving 99.999% uptime and processing millions in daily transaction volume.',
    client: 'Pan-Regional Banking Consortium',
    year: '2025',
    tags: ['FinTech', 'Event Sourcing', 'PostgreSQL', 'Go', 'Kubernetes'],
    metrics: 'Processed $42M+ monthly transaction volume with zero downtime',
    image: '/src/assets/images/fintech_cloud_platform_1794009854756.jpg',
    liveUrl: 'https://abdanet.com/projects/nexuspay',
    githubUrl: 'https://github.com/abdanet/nexuspay-core',
    featured: true
  },
  {
    id: 'proj-2',
    title: 'OmniGrid Telecom Fleet & Network Monitoring Core',
    category: 'Cloud Architecture',
    summary: 'Cloud-native telemetry pipeline collecting and visualizing 500k+ edge telemetry points across telecommunications infrastructure.',
    fullDescription: 'Designed a distributed observability and network diagnostics framework. Utilizing time-series databases and edge-ingestion agents, the system enables predictive maintenance, outage alerts in under 3 seconds, and automated traffic failover.',
    client: 'Major Telecom Operator',
    year: '2024',
    tags: ['Telemetry', 'Distributed Systems', 'Kafka', 'React', 'TimescaleDB'],
    metrics: 'Reduced mean time to incident detection (MTTD) by 78%',
    image: '/src/assets/images/digital_network_system_1794009855262.jpg',
    liveUrl: 'https://abdanet.com/projects/omnigrid',
    githubUrl: 'https://github.com/abdanet/omnigrid-telemetry',
    featured: true
  },
  {
    id: 'proj-3',
    title: 'GovPortal Unified Public Registry & e-Services',
    category: 'Enterprise Software',
    summary: 'National citizen registry and digitized licensing portal reducing document processing latency from weeks to minutes.',
    fullDescription: 'Spearheaded technical architecture for a central civil registry and municipal business licensing system. Enforced strict RBAC, end-to-end digital signatures, and automated audit logs compliant with international data protection standards.',
    client: 'Department of Public Innovation',
    year: '2024',
    tags: ['Enterprise', 'Security', 'TypeScript', 'Docker', 'PostgreSQL'],
    metrics: 'Servicing 320,000+ active citizen verifications annually',
    image: '/src/assets/images/executive_modern_office_1794009853111.jpg',
    liveUrl: 'https://abdanet.com/projects/govportal',
    featured: true
  },
  {
    id: 'proj-4',
    title: 'SomSupply Logistics & Cold-Chain Inventory ERP',
    category: 'Mobile & Web',
    summary: 'Cross-platform inventory routing and offline-capable mobile dispatch platform for medical and commercial supplies.',
    fullDescription: 'Developed an offline-first mobile companion and centralized cloud dispatcher that syncs securely when cellular data reconnects. Includes live GPS tracking, QR batch scanning, and automated invoice reconciliation.',
    client: 'Health Logistics Logistics Group',
    year: '2023',
    tags: ['Mobile', 'Offline First', 'React Native', 'Node.js', 'Redis'],
    metrics: '99.4% delivery reconciliation accuracy across 14 regional hubs',
    image: '/src/assets/images/fintech_cloud_platform_1794009854756.jpg',
    liveUrl: 'https://abdanet.com/projects/somsupply',
    featured: false
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'Enterprise Architecture & Systems Engineering',
    shortDesc: 'Designing high-throughput, fault-tolerant distributed architectures tailored for scalable growth.',
    fullDesc: 'We evaluate your technical stack, identify bottlenecks, and engineer robust architectural blueprints. From monolithic-to-microservices migration to event-driven architectures, we ensure your infrastructure scales seamlessly.',
    deliverables: [
      'Comprehensive Architecture Blueprint & Component Diagrams',
      'Concurrency, Latency & Load Simulation Reports',
      'Database Schema Optimization & Query Profiling',
      'Security Hardening & Fault-Tolerance Protocols'
    ],
    icon: 'Cpu',
    engagementModel: 'Fixed Scope Project or Strategic Retainer'
  },
  {
    id: 'serv-2',
    title: 'Full-Stack Custom Software Development',
    shortDesc: 'End-to-end engineering of modern web applications, mobile platforms, and secure APIs.',
    fullDesc: 'Building battle-tested digital products using TypeScript, React, Node.js, Go, and Python. We oversee the entire lifecycle from product discovery, UI/UX implementation, backend APIs, to automated production deployments.',
    deliverables: [
      'Production-Ready Source Code with 90%+ Unit/Integration Test Coverage',
      'Modern, High-Performance Responsive Web & Mobile Interfaces',
      'Clean RESTful & GraphQL API Specifications',
      'CI/CD Automated Deployment Pipelines'
    ],
    icon: 'Code2',
    engagementModel: 'Milestone-Based Development'
  },
  {
    id: 'serv-3',
    title: 'Cloud Transformation & DevOps Automation',
    shortDesc: 'Modernizing infrastructure with Kubernetes, infrastructure-as-code, and resilient cloud architectures.',
    fullDesc: 'Seamlessly transition legacy workloads into reliable AWS or Google Cloud environments. We implement automated Terraform pipelines, Docker containerization, Kubernetes orchestration, and 24/7 monitoring telemetry.',
    deliverables: [
      'Multi-Environment Terraform / CloudFormation Scripts',
      'Hardened Kubernetes Cluster Configuration',
      'Zero-Downtime Deployment Blueprints',
      'Grafana / Prometheus Observability Dashboards'
    ],
    icon: 'Cloud',
    engagementModel: 'Implementation Sprint & Retainer'
  },
  {
    id: 'serv-4',
    title: 'Fractional CTO & Executive Advisory',
    shortDesc: 'Strategic technology guidance for startups, growth-stage ventures, and digital transformation initiatives.',
    fullDesc: 'Bridge the gap between business objectives and engineering execution. As an executive advisor, Abdi helps founders and leadership teams make decisive technical choices, hire engineering talent, and prepare for investor due diligence.',
    deliverables: [
      'Quarterly Technology Strategy & Roadmap Planning',
      'Engineering Team Hiring, Mentorship & Code Quality Audits',
      'Vendor & Technical Vendor Due Diligence',
      'Board & Investor Technical Presentation Support'
    ],
    icon: 'Compass',
    engagementModel: 'Executive Monthly Advisory'
  },
  {
    id: 'serv-5',
    title: 'Cybersecurity Audit & Compliance Readiness',
    shortDesc: 'Penetration testing, code auditing, and compliance alignment for enterprise data security.',
    fullDesc: 'Identify vulnerabilities before adversaries do. We conduct comprehensive vulnerability assessments, OWASP top 10 compliance audits, zero-trust network configurations, and data encryption reviews.',
    deliverables: [
      'Executive Threat Vulnerability Matrix',
      'Remediation Code Patches & Implementation Guidance',
      'Data Privacy & Regulatory Compliance Assessment',
      'Incident Response Plan & Operational Playbooks'
    ],
    icon: 'ShieldCheck',
    engagementModel: 'Targeted Assessment Audit'
  },
  {
    id: 'serv-6',
    title: 'Corporate Technology Training & Capacity Building',
    shortDesc: 'Upskilling enterprise engineering teams in modern cloud standards, secure coding, and agile velocity.',
    fullDesc: 'Interactive workshops and intensive bootcamps tailored to upskill in-house development teams. Hands-on coding sessions in React, modern TypeScript, distributed microservices, and automated testing.',
    deliverables: [
      'Customized Syllabus & Hands-On Engineering Labs',
      'Recorded Sessions & Reusable Documentation',
      'Team Code Review Sessions & Capstone Evaluations',
      'Post-Workshop Skill Assessment Reports'
    ],
    icon: 'GraduationCap',
    engagementModel: '1–4 Week Intensive Programs'
  }
];

export const initialExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Principal Systems Architect & Founder',
    company: 'ABDA NET Technologies',
    location: 'Mogadishu & Regional Hubs',
    period: '2021 – Present',
    current: true,
    summary: 'Directing technical strategy, product engineering, and executive consulting for top-tier enterprise clients across East Africa and international partners.',
    achievements: [
      'Architected 12+ mission-critical platforms in banking, telecom, and public administration with over 99.98% operational uptime.',
      'Mentored and guided 35+ software engineers into senior development and DevOps leadership positions.',
      'Formulated strategic cloud adoption roadmaps saving clients an aggregate 40% in recurring infrastructure costs.'
    ],
    technologies: ['Cloud Architecture', 'Go', 'TypeScript', 'Kubernetes', 'PostgreSQL', 'Terraform']
  },
  {
    id: 'exp-2',
    role: 'Lead Software Architect',
    company: 'Horseed Digital Solutions',
    location: 'Mogadishu, Somalia',
    period: '2018 – 2021',
    current: false,
    summary: 'Led a cross-functional department of 18 software developers, QA engineers, and UX designers building enterprise ERPs and mobile payment gateways.',
    achievements: [
      'Spearheaded the rebuild of the core mobile payment integration engine, boosting transaction throughput by 450%.',
      'Implemented automated CI/CD pipelines reducing feature deployment cycle time from two weeks to under two hours.',
      'Authored corporate engineering standards and conducted weekly architectural review boards.'
    ],
    technologies: ['React', 'Node.js', 'Docker', 'AWS', 'Redis', 'Microservices']
  },
  {
    id: 'exp-3',
    role: 'Senior Full-Stack Engineer',
    company: 'Somali Telecommunications Corp (SomTel)',
    location: 'Mogadishu, Somalia',
    period: '2015 – 2018',
    current: false,
    summary: 'Developed core customer-facing self-service portals, billing system integrations, and real-time network status dashboards.',
    achievements: [
      'Engineered an SMS gateway and subscriber self-care portal utilized by over 500,000 active mobile subscribers.',
      'Reduced database query response times by 65% through optimized indexing and caching layers.',
      'Collaborated closely with telecommunications engineers to bridge SS7 signaling with modern web APIs.'
    ],
    technologies: ['JavaScript', 'Python', 'MySQL', 'Linux Systems', 'REST APIs']
  }
];

export const initialAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'East Africa Tech Leader of the Year Award',
    issuer: 'Horn of Africa Digital Innovation Summit',
    year: '2024',
    category: 'Award',
    description: 'Recognized for pioneering contribution to digital financial inclusion and advancing modern software architecture standards across the region.',
    credentialId: 'HAF-INNOV-2024-8849'
  },
  {
    id: 'ach-2',
    title: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services (AWS)',
    year: '2023',
    category: 'Certification',
    description: 'Advanced credential demonstrating comprehensive mastery in designing distributed, scalable, fault-tolerant enterprise systems on AWS.',
    credentialId: 'AWS-PSA-9923841'
  },
  {
    id: 'ach-3',
    title: 'National Digital Transformation Excellence Honor',
    issuer: 'Ministry of Communications & Technology',
    year: '2023',
    category: 'Honor',
    description: 'Conferred in recognition of technical leadership in engineering secure, citizen-centric digital public registry platforms.',
    credentialId: 'MCT-HONOR-2023'
  },
  {
    id: 'ach-4',
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    year: '2022',
    category: 'Certification',
    description: 'Demonstrated deep proficiency in container orchestration, cluster networking, security policies, and high-availability workload deployment.',
    credentialId: 'CKA-773012-CNCF'
  },
  {
    id: 'ach-5',
    title: 'Distinguished Alumni Keynote Speaker',
    issuer: 'Faculty of Computer Science and Engineering',
    year: '2022',
    category: 'Milestone',
    description: 'Selected to deliver the commencement keynote on "Building Sovereign Digital Infrastructure for the Next Century".'
  }
];

export const initialBlogPosts: BlogPostItem[] = [
  {
    id: 'post-1',
    title: 'Architecting High-Concurrency Payment Rails in Developing Economies',
    slug: 'architecting-high-concurrency-payment-rails',
    excerpt: 'How to build distributed financial systems that achieve sub-second finality and zero data loss in environments with intermittent edge connectivity.',
    content: `Financial infrastructure in emerging markets faces unique physical and topological constraints. Unlike traditional data center environments with guaranteed 10Gbps fiber rings, edge nodes often experience latency spikes, packet drops, and sudden network partitions.

### The Problem with Traditional Synchronous ACID

When building distributed financial ledgers, the default inclination is often to rely on strict two-phase commit (2PC) transactions across relational databases. However, during network splits, synchronous locking causes cascade timeouts, thread starvation, and catastrophic system lockups.

### The Event-Sourced Alternative

At ABDA NET, we have standardized on an **event-sourced state model** with idempotent message queues:

1. **Immutable Command Journals**: Every incoming payment authorization is stored as an immutable intention event prior to state execution.
2. **Deterministic State Reconciliation**: Balances are calculated through high-speed in-memory projections backed by snapshots.
3. **Partition-Tolerant Edge Handlers**: Local terminal transactions queue offline tokens signed with hardware cryptographic keys, verifying balance limits locally before forward-syncing.

By designing for partition tolerance as a first-class primitive, systems maintain 99.999% availability even during undersea cable disruptions or regional fiber cuts.`,
    date: 'March 14, 2026',
    readTime: '6 min read',
    category: 'Software Architecture',
    tags: ['FinTech', 'Distributed Systems', 'Event Sourcing', 'Fault Tolerance'],
    image: '/src/assets/images/fintech_cloud_platform_1794009854756.jpg',
    author: 'Abdi Ahmed Sharif'
  },
  {
    id: 'post-2',
    title: 'The Shift to Sovereign Cloud: Multi-Cloud Resilience for African Enterprises',
    slug: 'sovereign-cloud-multicloud-resilience',
    excerpt: 'Why relying on a single hyperscaler introduces unmanaged business risk, and practical strategies for portable containerized operations.',
    content: `As African enterprises rapidly digitize their core operations, the question of data sovereignty, vendor lock-in, and regulatory autonomy has become central to board-level strategy.

### The Pitfalls of Proprietary Cloud Lock-In

While proprietary serverless databases and vendor-specific queue systems provide immediate convenience during MVP prototyping, they create steep exit costs when regulatory guidelines mandate local data residency or when billing tariffs fluctuate.

### Strategy for Cloud Portability

To achieve true infrastructure independence:

- **Standardize on Kubernetes and OCI Containers**: Package every microservice identically regardless of whether it runs on AWS, Google Cloud, or local Tier-3 on-premise hardware.
- **Declarative Infrastructure with Terraform**: Define infrastructure as code so entire VPCs, ingress controllers, and storage volumes can be spun up in another region within 45 minutes.
- **Open Standards Data Layers**: Standardize on PostgreSQL with replication over proprietary managed databases.

Sovereignty is not about isolating oneself from global hyperscalers; it is about retaining the architectural freedom to choose where your workloads compute at any moment.`,
    date: 'February 2, 2026',
    readTime: '8 min read',
    category: 'Cloud Engineering',
    tags: ['Cloud', 'Kubernetes', 'DevOps', 'Data Sovereignty'],
    image: '/src/assets/images/digital_network_system_1794009855262.jpg',
    author: 'Abdi Ahmed Sharif'
  },
  {
    id: 'post-3',
    title: 'Building Engineering Culture: From Junior Coders to Architectural Thinkers',
    slug: 'building-engineering-culture',
    excerpt: 'Key lessons learned while growing engineering teams and mentoring the next generation of software leaders in Somalia.',
    content: `Writing code is only one component of engineering. The true competitive advantage of any technology organization lies in its communication clarity, architectural empathy, and willingness to ask hard questions before writing a single line of syntax.

### Key Principles We Instill at ABDA NET

1. **Read-Before-Write Discipline**: Before writing code, engineers must write a 1-page design proposal outlining trade-offs, failure modes, and security implications.
2. **Blameless Incident Post-Mortems**: When outages occur, the focus is never on individual mistakes, but on system gaps—why did our automated testing or deployment safeguards allow this to reach production?
3. **Continuous Mentorship**: Senior developers dedicate at least 20% of their bandwidth to pair-programming and code review discussions with junior engineers.

The future of technology in Africa will not be bought off the shelf; it will be engineered by talented, disciplined local teams who take pride in world-class craftsmanship.`,
    date: 'December 18, 2025',
    readTime: '5 min read',
    category: 'Leadership & Culture',
    tags: ['Leadership', 'Mentorship', 'Engineering Culture', 'Team Growth'],
    image: '/src/assets/images/executive_modern_office_1794009853111.jpg',
    author: 'Abdi Ahmed Sharif'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Keynote Address at East Africa Digital Transformation Forum',
    category: 'Conference',
    type: 'photo',
    url: '/src/assets/images/abdi_ahmed_sharif_portrait_1794009853483.jpg',
    caption: 'Presenting on future-ready cloud architectures to an audience of regional technology ministers, banking executives, and engineering leads.',
    date: 'October 2025'
  },
  {
    id: 'gal-2',
    title: 'Executive Architecture Studio & Engineering Command Center',
    category: 'Development',
    type: 'photo',
    url: '/src/assets/images/executive_modern_office_1794009853111.jpg',
    caption: 'The ABDA NET design and systems engineering workspace where client architectures and system prototypes are analyzed.',
    date: 'January 2026'
  },
  {
    id: 'gal-3',
    title: 'Enterprise FinTech Clearing System War-Room Launch',
    category: 'Development',
    type: 'photo',
    url: '/src/assets/images/fintech_cloud_platform_1794009854756.jpg',
    caption: 'Live cutover of the distributed real-time settlement engine serving regional banking institutions.',
    date: 'November 2025'
  },
  {
    id: 'gal-4',
    title: 'Telecommunications Network Telemetry Deployment',
    category: 'Leadership',
    type: 'photo',
    url: '/src/assets/images/digital_network_system_1794009855262.jpg',
    caption: 'Reviewing real-time edge network telemetry and automated anomaly detection dashboards.',
    date: 'August 2025'
  }
];
