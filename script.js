document.getElementById('skillNav').addEventListener('click', e => {
  if (!e.target.classList.contains('category-btn')) return;
  const id = e.target.dataset.target;

  // 1. switch the highlighted tab
  document.querySelectorAll('#skillNav .category-btn')
          .forEach(btn => btn.classList.toggle('active', btn === e.target));

  const lists = document.querySelectorAll('#skills .stack-list');

  // 2. toggle list visibility
  if (id === 'all') {
    // show everything
    lists.forEach(list => list.classList.remove('hidden'));
  } else {
    // show only the chosen category
    lists.forEach(list => list.classList.toggle('hidden', list.id !== id));
  }

  // 3. hide skill detail when category changes
  document.getElementById('skills-detail').classList.add('hidden');
  document.querySelectorAll('.stack-item').forEach(item => item.classList.remove('active'));
});

// 스킬 상세 데이터 (2단계 구조: 카테고리 > 항목)
const skillDetails = {
  'Go': null,
  'Python': null,
  'FastAPI': null,
  'Airflow': {
    'Task Execution': ['Celery Executor', 'Concurrency/Worker'],
    'Operators': ['VirtualEnvOperator']
  },
  'Kibana': {
    'Visualization': ['Dashboard']
  },
  'Prometheus': {
    'Query': ['PromQL'],
    'Alerting': ['Alertmanager']
  },
  'Grafana': {
    'Visualization': ['Dashboard Template'],
    'Alerting': ['Alert Rules']
  },
  'Kafka': {
    'Integration': ['Kafka Connect']
  },
  'VectorDB': null,
  'MariaDB': null,
  'Postgres': null,
  'Redis': null,
  'ElasticSearch': null,
  'GitLab': {
    'CI/CD': ['GitLab CI', 'GitLab Runner']
  },
  'Docker': {
    'Configuration': ['Dockerfile', 'Docker Compose']
  },
  'Kubernetes': {
    'CLI': ['kubectl'],
    'Resources': ['api-resource']
  },
  'Helm': {
    'Templating': ['Helm Template', 'Helm Hooks']
  },
  'Flow': null,
  'Notion': null,
  'Oracle Cloud Infrastructure': {
    'Compute': ['Instances'],
    'Storage': ['Block Storage(Block Volume, Boot Volume)', 'File Storage'],
    'Networking': ['Virtual cloud networks', 'Load balancers', 'DNS management(Public zones)', 'IP management(Reserved public IPs)', 'Network Command Center(Network Path Analyzer)'],
    'Developer Services': ['Containers & Artifacts'],
    'Observability & Management': ['Logging']
  },
  'Claude': {
    'Core Features': ['Agent Skills', 'Slash Command', 'Hooks'],
    'Advanced': ['Sub Agent', 'Model Context Protocol'],
    'Extensions': ['Plugins', 'Checkpoint']
  }
};

// 2단계 구조 렌더링 함수
function renderSkillDetails(details) {
  if (!details || typeof details !== 'object') return '';

  let html = '';
  for (const [category, items] of Object.entries(details)) {
    html += `
      <li class="skill-category" data-expanded="false">
        <span class="category-toggle">▸</span>
        <span class="category-name">${category}</span>
        <ul class="skill-items hidden">
          ${items.map(item => `<li class="skill-item">${item}</li>`).join('')}
        </ul>
      </li>
    `;
  }
  return html;
}

// 카테고리 토글 이벤트 핸들러
function setupCategoryToggle() {
  document.querySelectorAll('.skill-category').forEach(cat => {
    cat.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = cat.dataset.expanded === 'true';
      const toggle = cat.querySelector('.category-toggle');
      const items = cat.querySelector('.skill-items');

      if (isExpanded) {
        cat.dataset.expanded = 'false';
        toggle.textContent = '▸';
        items.classList.add('hidden');
      } else {
        cat.dataset.expanded = 'true';
        toggle.textContent = '▾';
        items.classList.remove('hidden');
      }
    });
  });
}

// 스킬 아이템 클릭 이벤트
document.querySelectorAll('#skills .stack-list .stack-item').forEach(item => {
  item.addEventListener('click', () => {
    const skillName = item.querySelector('span').textContent;
    const details = skillDetails[skillName];

    if (!details) return;

    // active 상태 토글
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.stack-item').forEach(i => i.classList.remove('active'));

    const detailSection = document.getElementById('skills-detail');
    if (wasActive) {
      detailSection.classList.add('hidden');
      return;
    }

    item.classList.add('active');

    // 터미널에 내용 표시
    document.getElementById('terminal-title').textContent = `${skillName} - details`;

    const outputEl = document.getElementById('skill-details');
    outputEl.innerHTML = renderSkillDetails(details);

    // 토글 이벤트 설정
    setupCategoryToggle();

    detailSection.classList.remove('hidden');
  });
});

// 영어 번역 테이블 (한국어는 HTML 원본을 그대로 사용)
const translations = {
  en: {
    'intro.title': 'About Me',
    'intro.description': `
      My curiosity started in the 5th grade of elementary school. <br/>
      The first spark was a playful thought, "how could I use a hack?", while playing Clash of Clans and Clash Royale. Around the same time, I started attending "Easy Robot Academy," where I controlled robots using C, and that's where my relationship with coding truly began.
      <br/><br/>
      In middle school, I continued with block coding through Scratch and Entry, then first encountered Kali Linux via the security YouTube channel "Kerberos" and studied hacking by solving problems on webhacking sites.<br/>
      Through a friend's introduction, I got the chance to join a cybersecurity education program, where I came face to face with the reality that my peers held knowledge far deeper than mine. <br/>
      Since I wasn't particularly outstanding academically, I chose to attend a specialized vocational high school.
      <br/><br/>
      After entering vocational high school, I focused on raising both my grades and my programming skills together.<br/>
      I took on the role of club president to gain organizational leadership experience, ranked first in the entire school in one subject, and consistently participated in conferences and competitions, earning awards along the way. <br/>
      However, when I moved beyond regional competitions to the national stage, I once again ran head-on into the same wall I had felt during the middle school education program. <br/>
      That period was not just when I learned technology; it was also when I learned how to study and how to communicate with people.
      <br/><br/>
      After joining my first company, I learned how to work and how to take responsibility. After experiencing my first resignation, I learned how to reflect on myself, how to set goals, and how to ask someone for help.
    `,
    // 'intro.description': `
    //   My curiosity started in the 5th grade of elementary school. <br/>
    //   The first spark was a playful thought, "how could I use a hack?", while playing Clash of Clans and Clash Royale. Around the same time, I started attending "Easy Robot Academy," where I controlled robots using C, and that's where my relationship with coding truly began.
    //   <br/><br/>
    //   In middle school, I continued with block coding through Scratch and Entry, then first encountered Kali Linux via the security YouTube channel "Kerberos" and studied hacking by solving problems on webhacking sites.<br/>
    //   Through a friend's introduction, I got the chance to join a cybersecurity education program, where I came face to face with the reality that my peers held knowledge far deeper than mine. <br/>
    //   Since I wasn't particularly outstanding academically, I chose to attend a specialized vocational high school.
    //   <br/><br/>
    //   After entering vocational high school, I focused on raising both my grades and my programming skills together.<br/>
    //   I took on the role of club president to gain organizational leadership experience, ranked first in the entire school in one subject, and consistently participated in conferences and competitions, earning awards along the way. <br/>
    //   However, when I moved beyond regional competitions to the national stage, I once again ran head-on into the same wall I had felt during the middle school education program. <br/>
    //   That period was not just when I learned technology; it was also when I learned how to study and how to communicate with people.
    //   <br/><br/>
    //   After joining my first company, I learned how to work and how to take responsibility. After experiencing my first resignation, I learned how to reflect on myself, how to set goals, and how to ask someone for help.
    //   <br/><br/>
    //   Honestly, my starting point was "hacking looks cool," so for a long time I carried a lone-wolf mindset, believing I had to figure things out and succeed all on my own. <br/>
    //   But now, when I see someone who is truly skilled, the first thing I think about is how much effort they must have accumulated over time. <br/>
    //   I have also come to realize that the standard of "giving one's best" differs from person to person, and I am now searching for the way of doing my best that fits me.
    // `,

    'skills.title': 'Skills',
    'skills.cat.ai': 'AI',
    'skills.cat.lang': 'Language',
    'skills.cat.backend': 'Backend',
    'skills.cat.data': 'Data',
    'skills.cat.monitoring': 'Monitoring',
    'skills.cat.db': 'Database',
    'skills.cat.devops': 'DevOps',
    'skills.cat.cloud': 'Cloud',
    'skills.cat.collab': 'Collaboration',

    'military.title': 'Military Service',
    'military.personnel': 'Industrial Technical Personnel (Active Duty)',
    'military.type': 'Military service : Active Duty',
    'military.industry': 'Industry : Information Processing',
    'military.enlistDate': 'Enlistment Date : 2024-02-06',

    'education.title': 'Education',
    'education.knou.name': 'Korea National Open University',
    'education.knou.status': 'On Leave',
    'education.knou.year': 'Year : Senior',
    'education.knou.major': 'Major : Computer Science',
    'education.hanbom.name': 'Hanbom High School',
    'education.hanbom.status': 'Status : Graduated',
    'education.hanbom.major': 'Major : Big Data & Information',

    'experience.title': 'Experience',
    'experience.roleLabel': 'Role :',
    'experience.lubentis.name': 'Lubentis',
    'experience.lubentis.employment': 'Employment : Full-time',
    'experience.lubentis.department': 'Department : Logistics Division - AI Team',
    'experience.lubentis.role': 'Role : Software Engineer, Infra',
    'experience.lubentis.p1.summary': 'In-house External Integration Platform (ETL) Design & Development',
    'experience.lubentis.p1.desc': 'Designed and developed an in-house ETL platform to standardize external system integrations that were being repeatedly implemented per project. Built a common pipeline structure and template engine, completing integrations with 10 external systems and reducing initial project setup time by approximately 50%. Structural limitations identified during operation directly led to the subsequent migration project.',
    'experience.lubentis.p2.summary': 'In-house ETL Platform Migration & Enhancement',
    'experience.lubentis.p2.desc': "Led the migration to a workflow orchestration tool to resolve the existing ETL's sequential processing limitations, manual incident response, and security issues. Managed the entire process from tool comparison analysis, benchmark-based performance tuning, distributed processing architecture design, to security hardening. Improved processing from sequential to 10+ parallel executions, configured 186 workflows across 3 clients, and deployed 53 into production.",
    'experience.lubentis.p3.summary': 'Multi-Region Infrastructure Migration & Operations',
    'experience.lubentis.p3.desc': 'Led the migration to a new cloud platform to resolve region limitations and operational constraints. Designed and built multi-region infrastructure spanning 2 regions (Seoul & Singapore) with 27 servers and 11 subnets, enabling overseas client support. Diagnosed and resolved 14 operational issues over 7 months to maintain service stability, ultimately serving 5 clients reliably.',
    'experience.lubentis.p4.summary': 'Internal Developer Platform (IDP) Development',
    'experience.lubentis.p4.desc': 'Participated in developing an in-house IDP to resolve structural bottlenecks and licensing costs of the existing commercial deployment platform. Developed cluster resource monitoring within the IDP and web UI-based file storage management features. The platform achieved 83% deployment automation, handling 900 deployments per month across 4 clients for over a year.',
    'experience.lubentis.p5.summary': 'Internal GPU Server Management',
    'experience.lubentis.p5.desc': 'Established systematic diagnostic and response procedures to resolve persistent server access and GPU availability failures in the AI model training environment, caused by recurring driver conflicts and kernel compatibility issues. Diagnosed NVIDIA driver version conflicts at the kernel module level and performed reinstallations to restore Docker GPU usage, and rebuilt the Realtek NIC driver source to match the kernel version, recovering network connectivity that had broken after a kernel update. Standardized per-issue response procedures through Netplan configuration, GRUB parameter tuning, and kernel package dependency cleanup, and authored 5 troubleshooting manuals so that the same procedures could be followed by the team even in the absence of the responsible engineer.',
    'experience.lubentis.p6.summary': 'In-house MLOps Platform Development',
    'experience.lubentis.p6.desc': 'Took ownership of two core components of the in-house MLOps platform (AiFlow). Newly designed and implemented an engine that receives user-selected settings from the demand forecasting UI as JSON and automatically generates executable Python code, eliminating the manual authoring burden that developers had to shoulder every time a model was changed. Also redesigned the internal Git hosting server, handed over from the previous engineer, on a RESTful basis, strengthening the foundation for managing model sources in an internal Git repository and deploying them to containers without relying on external GitHub. Secured extensibility through a snippet template-based structure, enabling new preprocessing steps and models to be added without modifying the engine code.',
    'experience.takeSolution.name': 'Take Solution',
    'experience.takeSolution.employment': 'Employment : Intern',
    'experience.takeSolution.department': 'Department : Logistics Division - Big Data Team',

    'cert.title': 'Certifications',
    'cert.aws.issuer': 'Issuer : AWS',
    'cert.infoProcessing.name': 'Industrial Engineer Information Processing',
    'cert.infoProcessing.issuer': 'Issuer : HRD Korea (Human Resources Development Service of Korea)',
    'cert.programming.name': 'Craftsman Programmer [formerly Craftsman Information Processing]',
    'cert.programming.issuer': 'Issuer : HRD Korea (Human Resources Development Service of Korea)',
    'cert.diat.name': 'DIAT (Digital Information Ability Test) - IT Common Sense',
    'cert.diat.level': 'Level : Intermediate',
    'cert.diat.issuer': 'Issuer : KAIT (Korea Association for ICT Promotion)',
    'cert.computing.name': 'Computational Thinking Ability',
    'cert.computing.level': 'Level : 3',
    'cert.computing.issuer': 'Issuer : KCCI (Korea Chamber of Commerce & Industry)',

    'competition.title': 'Competitions',
    'competition.regional.name': 'Regional Skills Competition - Cloud Computing',
    'competition.regional.award': 'Award : Silver',
    'competition.regional.desc': 'Solved given challenges using AWS services (Network, Compute, Storage, Database, ...).<br>Meeting skilled competitors at the national competition was inspiring and motivated me to work harder.',

    'external.title': 'External Projects / Activities',
    'external.nvidia.name': 'NVIDIA DLI Cohort 2',
    'external.nvidia.host': 'Host : FastCampus',
    'external.nvidia.desc': 'Gained hands-on experience in RAG pipeline design and optimization, and in building LLM applications using prompt engineering.',
    'external.sleepTech.name': "<a href='https://medigatenews.com/news/3192488916'>SleepTech Health Idea Contest</a>",
    'external.sleepTech.host': 'Host : Medi C&C',
    'external.sleepTech.team': 'Team : Nabijam',
    'external.sleepTech.desc': 'After passing the document screening, presented our idea at a booth in COEX. Gained significant growth by observing various companies and teams.',
    'external.cyber.name': 'Cyber Guardians Hacking Camp',
    'external.cyber.host': 'Host : KITRI (Korea Information Technology Research Institute)',
    'external.cyber.desc': 'Gained foundational knowledge in hacking and cybersecurity.',

    'personal.title': 'Personal Projects',
    'personal.mooncraft.name': "<a href='https://hamlet-dev.com'>MoonCraft</a>",
    'personal.mooncraft.desc': 'A Minecraft-style 3D sandbox game featuring an AI NPC (Miku).<br>Built with Django Channels + WebSocket for real-time multiplayer, Three.js + @pixiv/three-vrm for 3D rendering, Gemini 2.0 Flash Function Calling with pgvector RAG for context-aware dialogue, and GPT-SoVITS/RVC TTS served on RunPod GPU.<br>Provisioned AWS, RunPod, and DigitalOcean infrastructure as code with Terraform/Ansible, configured CI/CD via GitHub Actions self-hosted runner, and developed with TDD (24 Phases / 178 tests).',
    'personal.military.name': "<a href='https://github.com/PJW2004/military-career'>Claude Code Plugin for Military Service Exception Company Job Listings</a>",
    'personal.military.desc': 'A Claude Plugin that integrates the Military Manpower Administration API with JobKorea/Saramin, allowing users to search for military service exception companies and view their actual job postings in one place.'
  }
};

// 언어 토글 (KR / EN)
(function() {
  const toggle = document.getElementById('lang-toggle');
  const nameKr = document.getElementById('name-kr');
  const nameEn = document.getElementById('name-en');
  const options = toggle.querySelectorAll('.lang-option');
  let currentLang = 'kr';

  // 원본(KR) innerHTML 캐시 (복원용)
  const i18nElements = document.querySelectorAll('[data-i18n]');
  const originals = new Map();
  i18nElements.forEach(el => originals.set(el, el.innerHTML));

  function applyLang(lang) {
    i18nElements.forEach(el => {
      if (lang === 'kr') {
        el.innerHTML = originals.get(el);
        return;
      }
      const key = el.getAttribute('data-i18n');
      const text = translations.en[key];
      if (text === undefined) return;

      // 내부의 <time>, .role 요소는 보존
      const time = el.querySelector('time');
      const role = el.querySelector('.role');
      const timeHtml = time ? ' ' + time.outerHTML : '';
      const roleHtml = role ? ' ' + role.outerHTML : '';
      el.innerHTML = text + timeHtml + roleHtml;
    });
  }

  toggle.addEventListener('click', () => {
    currentLang = currentLang === 'kr' ? 'en' : 'kr';

    nameKr.classList.toggle('hidden', currentLang === 'en');
    nameEn.classList.toggle('hidden', currentLang === 'kr');

    options[0].classList.toggle('active', currentLang === 'kr');
    options[1].classList.toggle('active', currentLang === 'en');

    applyLang(currentLang);

    document.documentElement.lang = currentLang === 'kr' ? 'ko' : 'en';
  });
})();

// 병역 남은일자 및 잔여일자 계산
(function() {
  const startDate = new Date('2024-02-06'); // 편입일자
  const endDate = new Date('2026-12-05');   // 만료일자
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;

  // 남은일자: 만료일 - 오늘
  const remainingDays = Math.ceil((endDate - today) / msPerDay);

  // 잔여일자 계산 (현역병 입영 대상 공식)
  // (종전의 의무복무기간 - 복무한 일수) / 종전의 의무복무기간 × 현역병 의무복무기간
  const totalServiceDays = Math.ceil((endDate - startDate) / msPerDay); // 종전의 의무복무기간
  const servedDays = Math.ceil((today - startDate) / msPerDay);         // 복무한 일수
  const activeServiceDays = 548; // 현역병 의무복무기간 (18개월 ≈ 548일)

  const remainingServiceDays = Math.ceil(
    ((totalServiceDays - servedDays) / totalServiceDays) * activeServiceDays
  );

  const remainingEl = document.getElementById('remaining-days');
  if (remainingEl) {
    remainingEl.textContent = remainingDays > 0 ? remainingDays : 0;
  }

  const convertedEl = document.getElementById('converted-days');
  if (convertedEl) {
    convertedEl.textContent = remainingServiceDays > 0 ? remainingServiceDays : 0;
  }
})();
