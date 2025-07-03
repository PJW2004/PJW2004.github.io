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
