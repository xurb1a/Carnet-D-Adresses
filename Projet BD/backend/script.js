document.addEventListener("DOMContentLoaded", () => {
    const profileBtn = document.querySelector('.profile-button');
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'profile-dropdown';
    dropdownMenu.innerHTML = `
        <ul>
            <li><a href="#">Mon compte</a></li>
            <li><a href="#">Paramètres</a></li>
            <li><a href="login.html" onclick="sessionStorage.clear()">Déconnexion</a></li>
        </ul>
    `;
    dropdownMenu.style.display = 'none';
    profileBtn?.parentElement?.appendChild(dropdownMenu);

    // Toggle profile dropdown
    profileBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Hide dropdown on outside click
    document.addEventListener('click', () => {
        dropdownMenu.style.display = 'none';
    });

    // Smooth hover effect for buttons (CSS fallback via JS)
    document.querySelectorAll('button, .profile-button, .add-button').forEach(btn => {
        btn.style.transition = 'all 0.3s ease';
    });

    // Optionally attach tooltips
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const tip = document.createElement('div');
            tip.className = 'tooltip';
            tip.innerText = el.dataset.tooltip;
            document.body.appendChild(tip);
            const rect = el.getBoundingClientRect();
            tip.style.left = rect.left + 'px';
            tip.style.top = rect.top - 30 + 'px';
        });
        el.addEventListener('mouseleave', () => {
            document.querySelectorAll('.tooltip').forEach(t => t.remove());
        });
    });
});
