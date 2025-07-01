const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // 버튼 텍스트 변경
    toggleButton.textContent = body.classList.contains('dark-mode') 
        ? 'Toggle Light Mode' 
        : 'Toggle Dark Mode';
});

/* ─── skills 탭 토글 ──────────────────────────────── */
document.getElementById('skillNav').addEventListener('click', e=>{
  if(!e.target.classList.contains('category-btn')) return;
  const id=e.target.dataset.target;

  // active 상태 변경
  document.querySelectorAll('#skillNav .category-btn')
          .forEach(btn=>btn.classList.toggle('active',btn===e.target));

  // 리스트 토글
  document.querySelectorAll('#skills .stack-list')
          .forEach(list=>list.classList.toggle('hidden',list.id!==id));
});
/* ──────────────────────────────────────────────── */
