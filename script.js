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

// 스킬 상세 데이터
const skillDetails = {
  'Go': [''],
  'Python': [''],
  'FastAPI': [''],
  'Airflow': ['Celery Executor','Concurrency/Worker','VirtualEnvOperator'],
  'Kibana': ['Dashboard'],
  'Prometheus': ['PromQL','Alertmanager'],
  'Grafana': ['Dashboard Template','Alert Rules'],
  'Kafka': ['Kafka Connect'],
  'VectorDB': [''],
  'MariaDB': [''],
  'Postgres': [''],
  'Redis': [''],
  'ElasticSearch': [''],
  'GitLab': ['GitLab CI','GitLab Runner'],
  'Docker': ['Dockerfile','Docker Compose'],
  'Kubernetes': ['kubectl','api-resource'],
  'Helm': ['Helm Template','Helm Hooks'],
  'Flow': [''],
  'Notion': [''],
  'Oracle Cloud Infrastructure': ['']
};

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
    outputEl.innerHTML = details.map(d => `<li>${d}</li>`).join('');

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
