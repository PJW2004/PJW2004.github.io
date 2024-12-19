const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // 버튼 텍스트 변경
    toggleButton.textContent = body.classList.contains('dark-mode') 
        ? 'Toggle Light Mode' 
        : 'Toggle Dark Mode';
});
