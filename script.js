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
    document.getElementById('skill-name').textContent = skillName.toLowerCase().replace(/\s+/g, '-');
    document.getElementById('terminal-title').textContent = `${skillName} - details`;

    const outputEl = document.getElementById('skill-details');
    outputEl.innerHTML = renderSkillDetails(details);

    // 토글 이벤트 설정
    setupCategoryToggle();

    detailSection.classList.remove('hidden');
  });
});

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
