const img = (name) => `/images/${name}.webp`

export const profile = {
  name: 'Dr. Prachi Dabholkar',
  role: 'Public Health Researcher · Dentist (BDS) · MPH',
  email: 'prachi25dabholkar@gmail.com',
  phone: '+1 (437) 299-2893',
  linkedin: 'https://www.linkedin.com/in/dr-prachi-dabholkar-207a931b4',
  location: 'Ontario, Canada',
  portrait: img('conf-lhrd'),
  tagline:
    'I bridge what happens in the clinic with what unfolds across populations, turning field evidence, lived experience and spatial data into equity-focused health solutions.',
  about: [
    'Trained as a dentist and now completing a CEPH-accredited Master of Public Health at Western University, I approach public health with both clinical depth and systems thinking.',
    'My work spans multi-centric community surveys across 3,400 households, qualitative and mixed-methods research, geospatial analysis for health equity, and on-the-ground health promotion with underserved communities in India and Canada.',
    'I care about the gap between how health systems are designed and how people actually experience them, and about closing that gap with evidence that leads to action.',
  ],
}

export const stats = [
  { value: 3400, suffix: '', label: 'Households surveyed', note: 'ICMR multi-centric burns study' },
  { value: 17, suffix: '', label: 'Urban & rural field sites', note: '5 urban · 12 rural' },
  { value: 5500, suffix: '+', label: 'People reached', note: 'Health camps & digital outreach' },
  { value: 12, suffix: '+', label: 'Presentations & awards', note: 'National & international' },
]

// Story dots in the Impact grid (17 rows × 20 cols, 340 dots). `at` = [row, col]. Array order = autoplay order.
// parts: dot counts lit outward from the story dot, coloured in palette order (sand, dusty blue, muted rose, grey-blue);
//        chart series use the same order, so dots and chart share colours. light: 'row' | 'quad' override parts.
// WHO figures verified against the WHO "Burns" fact sheet (21 Oct 2026, 2023 GHE data).
const WHO = 'WHO, Burns fact sheet (2023 estimates)'
const STUDY = 'ICMR multi-centric burns study'
export const dotStories = [
  { at: [5, 1], parts: [340], title: 'Millions, uncounted', source: 'MoHFW, DGHS: National Burn Programme',
    text: 'India sees an estimated 6–7 million burn injuries a year, and there is no national burn registry. If this grid were one year of them, each dot would be about 20,000 people.',
    chart: { kind: 'stat', value: '6–7M', label: 'burn injuries a year in India (estimate)' } },
  { at: [3, 15], parts: [117, 109, 114], title: 'Two thirds of the burden', source: WHO,
    text: 'In 2023 about 163,000 people died worldwide from fire, heat and hot substances. About two thirds were in the WHO South-East Asia and African Regions.',
    chart: { kind: 'bars', items: [['South-East Asia', 56300], ['Africa', 52100], ['Rest of world', 54600]] } },
  { at: [7, 9], parts: [238, 102], title: 'Women carry the risk', source: WHO,
    text: 'In the WHO South-East Asia Region, which includes India, women accounted for about 70% of burn deaths. Open cooking fires and unstable stoves are key household risks.',
    chart: { kind: 'donut', items: [['Women', 70], ['Men', 30]] } },
  { at: [8, 14], parts: [176, 164], title: 'A global gap', source: WHO,
    text: 'Worldwide the gap is smaller but still there: about 84,600 women and 78,800 men died from burns in 2023.',
    chart: { kind: 'bars', items: [['Women', 84600], ['Men', 78800]] } },
  { at: [10, 17], parts: [74, 266], title: 'Children at risk', source: WHO,
    text: 'About 35,600 of those deaths were children under 15. Hot liquids, cooking equipment and open flames put children at particular risk of scalds.',
    chart: { kind: 'donut', items: [['Under 15', 22], ['15 and older', 78]] } },
  { at: [1, 4], parts: [100, 240], title: 'Where we went', source: STUDY,
    text: 'The study ran across 17 field sites, 5 urban and 12 rural, and the dots split in that ratio. (Split by sites; households per site varied.)',
    chart: { kind: 'bars', items: [['Urban sites', 5], ['Rural sites', 12]] } },
  { at: [2, 9], light: 'quad', title: 'Four lenses on every home', source: STUDY,
    text: 'Each household was studied through four lenses: how common burns were, first-aid knowledge and practice, quality of life, and out-of-pocket cost. Each colour is one lens.',
    chart: { kind: 'chips', items: ['Prevalence', 'First-aid KAP', 'Quality of life', 'Out-of-pocket cost'] } },
  { at: [16, 6], parts: [26], title: 'Into the classroom', source: STUDY,
    text: 'Alongside households, the study surveyed 260 adolescents across 5 high schools. At the same 10-per-dot scale, that is these 26 dots.',
    chart: { kind: 'stat', value: '260', label: 'adolescents across 5 high schools' } },
  { at: [11, 11], parts: [145, 148, 47], title: 'Who pays for care', source: 'National Health Accounts, India 2023-24',
    text: 'The study measured what burns cost families. Nationally, households pay about 42.7% of health spending out of pocket, close to the government’s 43.5%, down from 64.2% in 2013-14.',
    // Years where an NHA estimate was found; x is the fiscal-year start, so the missing 2020-21 stays a visible gap.
    chart: { kind: 'line', suffix: '%', label: 'Out-of-pocket share of health spending', points: [[2013, 64.2], [2018, 48.2], [2019, 47.1], [2021, 39.4], [2022, 43.4], [2023, 42.7]] } },
  { at: [13, 3], light: 'row', title: '20 minutes that matter', source: WHO,
    text: 'One row of 20 dots: about 20 minutes of cool running water is the advised first aid for smaller burns. Correcting first-aid myths was part of the study’s campaigns.',
    chart: { kind: 'timer', minutes: 20, avoid: ['Ice', 'Oil', 'Butter', 'Toothpaste'] } },
  { at: [15, 12], parts: [0, 340], title: 'Back to the community', source: STUDY,
    text: 'The findings didn’t stay in a report. They fed prevention and first-aid campaigns in the same communities that were surveyed.',
    chart: { kind: 'flow', steps: ['Survey', 'Findings', 'Campaigns'] } },
]

export const experience = [
  {
    role: 'Research Associate',
    org: 'St. Francis Xavier University',
    period: 'May 2026 – Present',
    region: 'Canada',
    tags: ['Qualitative', 'Geospatial', 'Policy'],
    points: [
      'Literature reviews, interfacility patient-transfer policy analysis and evidence synthesis supporting health-system and EMS initiatives.',
      'Led geospatial analysis of the interfacility transfer system in Nova Scotia, revealing system and geographic inequities through visual knowledge translation.',
      'Qualitative and mixed-methods analysis in NVivo: thematic coding, framework analysis and mapping findings to the Theoretical Domains Framework (TDF).',
      'Reviewed operational procedures and workflows to identify equity and implementation gaps; co-facilitated stakeholder interviews with reflexive field notes.',
    ],
  },
  {
    role: 'Knowledge Translation Lead',
    org: 'More Than Circumstance',
    period: 'Jun 2026 – Present',
    region: 'Canada',
    tags: ['Knowledge Translation', 'Qualitative'],
    points: [
      'Design interview guides and conduct key-informant interviews with experts in homelessness.',
      'Develop respectful dissemination content and communication strategies that centre the lived experiences of people experiencing homelessness.',
      'Translate findings into accessible resources that inform community engagement, advocacy and action.',
    ],
  },
  {
    role: 'Consultant',
    org: 'Nyarko and Sandhu Consultancy',
    period: 'Jul 2026 – Aug 2026',
    region: 'Canada',
    tags: ['Program Evaluation', 'Qualitative'],
    points: [
      'Thematic analysis of interviews and focus groups in Quirkos to evaluate the Health Empowerment through Active Leadership (HEAL) program.',
      'Synthesized findings into evidence-based recommendations supporting community health leadership for sexual and gender minority communities.',
    ],
  },
  {
    role: 'Junior Medical Officer',
    org: 'Indian Council of Medical Research · NIPHTR',
    period: 'Jul 2024 – Sep 2025',
    region: 'India',
    tags: ['Epidemiology', 'Field Operations', 'GIS'],
    points: [
      'Led operational planning for a multi-centric study of burn-injury prevalence, KAP, quality of life and out-of-pocket expenditure across 5 urban and 12 rural areas (n = 3,400 households).',
      'Conducted primary data collection across 5 high schools (n = 260 adolescents); compiled interim and annual reports for ICMR.',
      'Analyzed leprosy cases at habitat and district level, and drafted and supervised the ArcGIS Atlas of Leprosy for the Andaman & Nicobar Islands.',
    ],
  },
  {
    role: 'Health Camp Coordinator',
    org: 'Switch India Medical NGO',
    period: 'Jun 2023 – May 2024',
    region: 'India',
    tags: ['Community Health', 'Health Promotion'],
    points: [
      'Planned 7 general health camps and 8 awareness sessions reaching 1,000+ beneficiaries, and 4,500 people monthly through social media campaigns.',
      'Trained volunteers, expanded dental teams and introduced virtual medical education, improving camp efficiency by 60%.',
      'Addressed health inequities in Indigenous areas of the community through preventive health initiatives.',
    ],
  },
  {
    role: 'Intern',
    org: 'National Health Mission, Pune',
    period: 'Feb 2024 – Apr 2024',
    region: 'India',
    tags: ['Community Diagnosis', 'Health Promotion'],
    points: [
      'Community diagnosis of 50 semi-urban households through observation, key-informant interviews, focus groups and surveys.',
      'Designed KAP assessments and IEC materials; organized camps, puppet shows and rallies.',
      'Achieved a 95% increase in anemia awareness among women of reproductive age (post-intervention KAP).',
    ],
  },
  {
    role: 'Clinical Documentation Specialist',
    org: 'IKS Health',
    period: 'Oct 2022 – May 2023',
    region: 'India',
    tags: ['Clinical', 'Health Informatics'],
    points: ['Streamlined medicolegal documentation for Texas-based physicians in NextGen EMR, improving efficiency by 35% across 12–15 patients daily.'],
  },
  {
    role: 'Clinical Associate Dentist',
    org: 'Amarraj Research Foundation · AF Care Dental',
    period: 'Apr 2022 – Sep 2022',
    region: 'India',
    tags: ['Clinical', 'Oral Health'],
    points: [
      'Oral screenings and treatment plans for 50–55 patients monthly with 98% patient satisfaction.',
      'Ran oral-health education sessions (+20% patient footfall) and managed five community screening camps.',
    ],
  },
]

export const projects = [
  {
    id: 'burns',
    title: 'Burn Injury Prevention & Community Burden',
    org: 'ICMR · NIPHTR',
    year: '2024–25',
    category: 'Epidemiology',
    cover: img('burns-iec-2'),
    hook: 'Where are we failing in preventing burn injuries, and why?',
    summary:
      'A multi-centric, community-based study of burn prevalence, first-aid knowledge, quality of life and out-of-pocket costs, moving beyond hospitals into homes.',
    metrics: [['3,400', 'households'], ['17', 'field sites'], ['IEC', 'interventions']],
    story: [
      'Burn injuries are often treated as isolated household accidents. This project asked whether they are symptoms of deeper systemic gaps in prevention, first-aid knowledge and access to care.',
      'Across 5 urban and 12 rural areas we surveyed 3,400 households, documenting unsafe cooking environments, first-aid misconceptions and the financial strain of injury. The study was led by ICMR with coordination from ABVIMS and Dr. RML Hospital.',
      'I operationalized research at scale: standardizing tools across diverse field teams, troubleshooting on-ground barriers, and maintaining data quality while compiling qualitative and quantitative datasets into risk patterns, knowledge gaps and indicators of financial burden.',
      'Findings fed directly into Information, Education & Communication (IEC) campaigns on prevention and first aid in the communities we surveyed.',
    ],
    gallery: ['burns-survey', 'burns-field-1', 'burns-field-2', 'burns-field-3', 'burns-field-4', 'burns-field-5', 'burns-data-1', 'burns-data-2', 'burns-data-3', 'burns-iec-1', 'burns-iec-2', 'burns-iec-3'].map(img),
  },
  {
    id: 'nova-scotia',
    title: 'Non-Urgent Interfacility Transfers in Nova Scotia',
    org: 'St. Francis Xavier University',
    year: '2026',
    category: 'Health Systems',
    cover: null,
    hook: 'Best Paper Presentation, EMS Research Day 2026',
    summary:
      'Mixed-methods policy and key-informant analysis of equity, coordination and continuity of care in Nova Scotia’s non-urgent transfer system.',
    metrics: [['TDF', 'framework'], ['NVivo', 'coding'], ['GIS', 'equity map']],
    story: [
      'I examined the equity and implementation challenges of non-urgent interfacility patient transfers, using evidence reviews and policy mapping to understand current processes.',
      'I supported qualitative analysis in NVivo, contributing to coding and thematic synthesis and organizing findings with the Theoretical Domains Framework to surface barriers and facilitators.',
      'A geospatial analysis made system and geographic inequities visible, supporting evidence-informed recommendations to improve coordination. A manuscript is in preparation.',
    ],
    link: { href: 'https://storymaps.arcgis.com/stories/fee1661bba7344d2a053bb5a1e9ff7e5', label: 'Where Need Meets Care: StoryMap' },
    gallery: [],
  },
  {
    id: 'heat',
    title: 'Heat & the Aging Population: Are We Prepared?',
    org: 'Western University',
    year: '2025–26',
    category: 'Geospatial',
    cover: img('conf-wrf'),
    hook: 'GIS framework for climate–health service gaps',
    summary:
      'A spatial look at whether aging populations, heat exposure and heat-response infrastructure align in Massachusetts.',
    metrics: [['GIS', 'StoryMaps'], ['65+', 'focus group'], ['Policy', 'audience']],
    story: [
      'Independently conducted a healthy-ageing project in Massachusetts, using GIS and StoryMaps to visualize essential resources and infrastructure.',
      'The analysis identified service gaps where older adults face heat exposure without adequate cooling or care resources, giving policymakers evidence for equitable interventions.',
      'Presented at the Western Research Forum 2026.',
    ],
    link: { href: 'https://storymaps.arcgis.com/stories/47e4f6b41f7448239779247f3fa683c1', label: 'Explore the StoryMap' },
    gallery: [img('conf-wrf')],
  },
  {
    id: 'leprosy',
    title: 'Geospatial Atlas of Leprosy, Andaman & Nicobar',
    org: 'ICMR · NIPHTR',
    year: '2024–25',
    category: 'Geospatial',
    cover: img('leprosy-1'),
    hook: 'Seeing disease at the micro level',
    summary:
      'Habitat- and district-level mapping of leprosy to reveal localized clusters that routine surveillance misses in remote, low-endemic islands.',
    metrics: [['Atlas', 'ArcGIS'], ['Habitat', 'resolution'], ['Hotspots', 'identified']],
    story: [
      'Leprosy is declining nationally but remains a concern in remote regions like the Andaman & Nicobar Islands, where traditional surveillance often misses localized clusters.',
      'I analyzed case data, drafted the GIS atlas and supervised its design, turning maps into clear recommendations for targeted intervention and resource planning.',
      'The atlas supports micro-level hotspot management, strategic allocation in hard-to-reach islands and earlier detection.',
    ],
    quote: 'The greatest value of a picture is when it forces us to notice what we never expected to see.',
    link: { href: 'https://drive.google.com/file/d/1EK8H_eku-VBtbRNvRXNW1c9_1fmZBhwy/view?usp=sharing', label: 'View the atlas' },
    gallery: [img('leprosy-1'), img('leprosy-2')],
  },
  {
    id: 'cdcp',
    title: 'Canadian Dental Care Plan Awareness Study',
    org: 'Independent research',
    year: '2026',
    category: 'Epidemiology',
    cover: null,
    hook: 'Who knows about the CDCP, and who doesn’t?',
    summary:
      'Regression modelling on national Canadian Oral Health Survey (COHS) data to identify factors associated with program awareness.',
    metrics: [['COHS', 'national data'], ['R', 'RStudio'], ['Regression', 'modelling']],
    story: [
      'Developed the study proposal examining awareness of the Canadian Dental Care Plan using national COHS data.',
      'Conducting descriptive statistics and regression modelling in RStudio to identify the population groups least aware of the program, a key equity lever for uptake.',
    ],
    gallery: [],
  },
  {
    id: 'nhm',
    title: 'National Health Mission: Listening to Communities',
    org: 'NHM Pune',
    year: '2024',
    category: 'Community',
    cover: img('nhm-1'),
    hook: '+95% anemia awareness post-intervention',
    summary:
      'Community diagnosis and health-education programs designed from conversations in clinics and homes.',
    metrics: [['50', 'households'], ['95%', 'awareness gain'], ['KAP', 'assessed']],
    story: [
      'Walking through clinics and community health centres, I met patients face-to-face to understand the challenges they faced accessing care.',
      'Those conversations shaped the health-education strategies I helped design, from KAP surveys and IEC materials to camps, puppet shows and awareness rallies.',
      'Seeing the connection between daily experience and system-level planning showed me how thoughtful interventions can strengthen community health.',
    ],
    gallery: ['nhm-1', 'nhm-2', 'nhm-3', 'nhm-4', 'nhm-5'].map(img),
  },
  {
    id: 'community',
    title: 'Health for Marginalized Communities',
    org: 'Switch India · WeChange',
    year: '2023–24',
    category: 'Community',
    cover: img('community-1'),
    hook: '1,000+ beneficiaries across seven camps',
    summary:
      'Health camps, oral-health education and mentorship taken directly into underserved neighbourhoods.',
    metrics: [['1,000+', 'in camps'], ['4,500', 'monthly online'], ['60%', 'efficiency gain']],
    story: [
      'On a field visit with Switch India I met a mother in a remote settlement who had never received oral-health guidance for her children. With local volunteers we ran hands-on preventive sessions and connected families to care.',
      'I planned and coordinated health camps in underserved neighbourhoods, helping over 1,000 community members access basic services.',
      'With WeChange I ran oral-health camps and mentored young girls to continue their studies despite limited resources.',
    ],
    gallery: ['community-1', 'community-2', 'community-3'].map(img),
  },
  {
    id: 'clinic',
    title: 'From Clinic to Community',
    org: 'AF Care Dental',
    year: '2022',
    category: 'Clinical',
    cover: img('clinic-1'),
    hook: 'The turning point',
    summary:
      'Outreach camps showed me that not everyone could come to the clinic, so I set out to take care to communities at scale.',
    metrics: [['98%', 'satisfaction'], ['5', 'screening camps'], ['+20%', 'footfall']],
    story: [
      'Freshly graduated as a dentist, I loved solving problems one-on-one. But outreach camps showed me that not everyone could come to me, and clinical knowledge alone wasn’t enough.',
      'At AF Care, a network of polyclinics, I coordinated care across branches and helped streamline operations, getting a front-row view of how health systems function.',
    ],
    gallery: ['clinic-1', 'clinic-2'].map(img),
  },
  {
    id: 'oral',
    title: 'Research & Publications in Oral Health',
    org: 'Yogita Dental College',
    year: '2018–21',
    category: 'Clinical',
    cover: img('pub-carabelli'),
    hook: 'First Prize, 31st International Dental Conference',
    summary:
      'Field epidemiology and manuscript writing on the Cusp of Carabelli in schoolchildren and on salivary pH changes.',
    metrics: [['2', 'publications'], ['School', 'screenings'], ['1st', 'prize']],
    story: [
      'I led data collection and manuscript writing for two studies: the prevalence of the Cusp of Carabelli among schoolchildren in North Ratnagiri, and salivary pH changes after tea, chewing gum and saline rinses.',
      'Doing both fieldwork and writing taught me to turn raw data into meaningful insight.',
    ],
    gallery: [img('pub-carabelli'), img('pub-salivary')],
  },
]

export const skills = [
  {
    group: 'Research Methods',
    icon: 'Microscope',
    items: ['Mixed-methods design', 'Qualitative interviewing', 'Focus groups', 'Thematic & framework analysis', 'Theoretical Domains Framework', 'Rapid & literature reviews', 'Survey development', 'Community diagnosis'],
  },
  {
    group: 'Epidemiology & Data',
    icon: 'ChartLine',
    items: ['Study design', 'Descriptive & regression analysis', 'KAP assessment', 'Data cleaning & management', 'R / RStudio', 'SQL', 'MS Excel', 'Tableau dashboards'],
  },
  {
    group: 'Geospatial',
    icon: 'Map',
    items: ['ArcGIS Pro', 'ArcGIS StoryMaps', 'Hotspot & cluster mapping', 'Service-gap analysis', 'Disease atlases'],
  },
  {
    group: 'Health Promotion & KT',
    icon: 'Megaphone',
    items: ['IEC material design', 'Knowledge translation', 'Program planning & evaluation', 'Logic models & indicators', 'Stakeholder engagement', 'Health camps & outreach'],
  },
  {
    group: 'Tools',
    icon: 'Wrench',
    items: ['NVivo', 'Quirkos', 'RStudio', 'ArcGIS', 'Tableau', 'NextGen EMR', 'MS Office'],
  },
]

export const education = [
  { degree: 'Master of Public Health', school: 'Western University · Schulich School of Medicine & Dentistry', note: 'CEPH-accredited', period: 'Sep 2025 – Aug 2026', image: img('conf-ivey') },
  { degree: 'PG Diploma, Community Health Care', school: 'International Institute for Population Sciences · NIPHTR', note: '', period: 'Jun 2023 – May 2024', image: img('education') },
  { degree: 'Bachelor of Dental Surgery', school: 'MUHS · Yogita Dental College & Hospital', note: '', period: 'Oct 2016 – Dec 2021', image: img('pub-salivary') },
]

export const leadership = [
  { title: 'Rural Changemaker', org: 'Rural Ontario Institute', period: 'Sep 2026 – Sep 2027', text: 'Selected for a competitive 12-month leadership cohort developing 14 core competencies in project management, strategic problem-solving and community leadership.' },
  { title: 'Secretary, Fund Development Committee', org: 'Rural Ontario Institute', period: '2026 –', text: 'Supporting committee coordination and fund development for rural, northern and Indigenous communities.' },
]

export const publications = [
  { type: 'Published', cite: 'Dabholkar P. et al. (2021)', title: 'Prevalence of cusp of Carabelli in permanent maxillary first molars among school children in North Ratnagiri District', venue: 'IOSR Journal of Dental and Medical Sciences', href: 'https://drive.google.com/file/d/1Y1WBjRMff7KuCoPkZtUv0qUvd15KBgjc/view?usp=drive_link' },
  { type: 'Published', cite: 'Vanjari G.K., Talathi A., & Dabholkar P. (2021)', title: 'Evaluation of salivary pH changes following tea consumption and oral interventions', venue: 'International Journal of Dental Science and Innovative Research', href: 'https://drive.google.com/file/d/1PSWnrHZEWSLBxXyvmN27j1nsIpUWMxqG/view?usp=drive_link' },
  { type: 'In preparation', cite: 'Khakpour M., Dabholkar P., Zohara S., Ahmad E.', title: 'Non-Urgent Interfacility Transfers in Nova Scotia: A Qualitative Study of System Processes, Access, and Equity', venue: 'Manuscript in preparation' },
  { type: 'In preparation', cite: 'Khakpour M., et al.', title: 'Centering Children’s Perspectives in Rural Physician Retention: A Community-Engaged, Arts-Based Exploration of Internationally Trained Physicians’ Families in Nova Scotia', venue: 'Manuscript in preparation' },
  { type: 'Capstone', cite: 'Dabholkar P. (2026)', title: 'Pregnancy Outcomes Following Assisted Reproductive Techniques in Male Cancer Survivors: A Rapid Review', venue: 'MPH Capstone, Western University' },
]

export const talks = [
  { year: 2026, title: 'EMS Research Day', topic: 'Evaluating Equity and Coordination in Nova Scotia’s Non-Urgent Interfacility Transfer System', award: 'Best Paper Presentation', image: null },
  { year: 2026, title: 'London Health Research Day', topic: 'Rapid review on pregnancy outcomes after assisted reproductive technologies in male cancer survivors.', image: img('conf-lhrd') },
  { year: 2026, title: 'The President’s Challenge, Ivey Business School', topic: 'Pitched “SideKick”, a physical-activity app for healthier Canadian lifestyles.', award: 'Top 11 of 50 teams', image: img('conf-ivey') },
  { year: 2026, title: 'Global Brigades Canada Impact Summit', topic: 'How can GBC bridge relational gaps between communities and volunteers?', award: 'Top-voted solution', image: img('conf-gbc') },
  { year: 2026, title: 'Western Research Forum', topic: 'GIS Framework for Mapping Climate–Health Service Gaps Affecting Aging Adults in Massachusetts.', image: img('conf-wrf') },
  { year: 2024, title: 'National Public Health India Conference', topic: 'Ethics for the Use of Machine Learning in Research: A Literature Review (e-paper).', image: img('conf-nphic') },
  { year: 2021, title: 'World Oral Health Day Competition', topic: 'E-poster on preventive oral health for children.', award: '2nd Prize', image: img('conf-wohd') },
  { year: 2018, title: '31st International Dental Conference', topic: 'E-poster on the Cusp of Carabelli study.', award: 'First Prize · Prof. S. S. Sidhu Award', image: img('conf-idc') },
  { year: 2018, title: 'Denasia Agni Dental Conference', topic: 'Smart Materials in Dentistry: advances in restorative care.', award: '2nd Prize', image: img('conf-denasia') },
  { year: 2017, title: 'ICT VORTEX Fest', topic: 'Low-Level Laser Therapy for Recurrent Aphthous Ulcers.', image: img('conf-vortex') },
]

export const certifications = [
  { title: 'TCPS 2: Tri-Council Policy Statement', org: 'Government of Canada', year: 'Dec 2025' },
  { title: 'Systematic Review, Meta-analysis & Scientific Writing', org: 'KLE Institute, Belagavi', year: 'May 2023' },
]

// span sets the bento tile shape: big = 2x2, tall = 1x2 (portrait photos), wide = 2x1 (landscape photos).
export const fieldGallery = [
  { src: img('hero'), cap: 'Community health education session', tag: 'Community', span: 'big' },
  { src: img('burns-field-3'), cap: 'Household survey, ICMR burns study', tag: 'Research', span: 'tall' },
  { src: img('conf-gbc'), cap: 'Global Brigades Canada Impact Summit', tag: 'Conferences', span: 'tall' },
  { src: img('burns-iec-2'), cap: 'Burn prevention & first-aid awareness campaign', tag: 'Research', span: 'wide' },
  { src: img('community-2'), cap: 'Recognition at a community health camp', tag: 'Community', span: 'tall' },
  { src: img('clinic-1'), cap: 'Oral screening camp', tag: 'Clinical' },
  { src: img('nhm-2'), cap: 'Key-informant interviews', tag: 'Community' },
  { src: img('conf-ivey'), cap: 'The President’s Challenge finalists', tag: 'Conferences' },
  { src: img('burns-iec-1'), cap: 'Street-level IEC outreach', tag: 'Research', span: 'wide' },
  { src: img('burns-field-4'), cap: 'Adolescent data collection in schools', tag: 'Research', span: 'tall' },
  { src: img('intro-1'), cap: 'Community outreach with NHM', tag: 'Community', span: 'wide' },
  { src: img('pub-salivary'), cap: 'Clinical research fieldwork', tag: 'Clinical', span: 'tall' },
  { src: img('conf-denasia'), cap: 'Presenting Smart Materials in Dentistry', tag: 'Conferences' },
  { src: img('clinic-2'), cap: 'Patient screening & documentation', tag: 'Clinical', span: 'wide' },
  { src: img('nhm-3'), cap: 'Health awareness session, Konkan Division', tag: 'Community', span: 'wide' },
  { src: img('burns-field-1'), cap: 'Door-to-door survey in urban settlements', tag: 'Research', span: 'tall' },
  { src: img('nhm-1'), cap: 'Health education at a community fair', tag: 'Community' },
  { src: img('community-1'), cap: 'Health camp in an underserved settlement', tag: 'Community', span: 'wide' },
  { src: img('conf-wrf'), cap: 'Presenting at Western Research Forum', tag: 'Conferences', span: 'tall' },
  { src: img('burns-field-5'), cap: 'Household interview, burns KAP study', tag: 'Research' },
  { src: img('conf-wohd'), cap: 'World Oral Health Day session', tag: 'Clinical', span: 'wide' },
  { src: img('burns-iec-3'), cap: 'Leading a first-aid awareness talk', tag: 'Research' },
]
