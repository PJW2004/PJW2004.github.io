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
