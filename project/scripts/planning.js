const KEY_PROFILE = "trailnest-profile";
const KEY_SUBMISSIONS = "trailnest-submissions";

function getProfile() {
    return JSON.parse(localStorage.getItem(KEY_PROFILE)) ?? { fullName: "", email: "" };
}

function setProfile(profile) {
    localStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
}

function getSubmissions() {
    return JSON.parse(localStorage.getItem(KEY_SUBMISSIONS)) ?? [];
}

function setSubmissions(list) {
    localStorage.setItem(KEY_SUBMISSIONS, JSON.stringify(list));
}

function renderSubmissions() {
    const host = document.querySelector("#recentReports");
    if (!host) return;

    const submissions = getSubmissions();

    if (submissions.length === 0) {
        host.innerHTML = `<p class="muted">No submissions yet.</p>`;
        return;
    }

    const top = submissions.slice(0, 3);

    host.innerHTML = `
    <ul>
      ${top.map((s) => `
        <li>
          <strong>${s.type}</strong> — ${s.trailName}<br>
          <small>By ${s.fullName} • ${s.created}</small>
        </li>
      `).join(``)}
    </ul>
  `;
}

function fillProfileFields() {
    const profile = getProfile();
    const nameInput = document.querySelector("#fullName");
    const emailInput = document.querySelector("#email");

    if (nameInput) nameInput.value = `${profile.fullName}`;
    if (emailInput) emailInput.value = `${profile.email}`;
}

function setMessage(text, isError) {
    const msg = document.querySelector("#formMsg");
    if (!msg) return;

    msg.textContent = `${text}`;
    msg.style.color = isError ? `#b91c1c` : `#14532D`;
}

function handleSubmit(e) {
    e.preventDefault();

    const fullName = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const type = document.querySelector("#type").value;
    const trailName = document.querySelector("#trailName").value.trim();
    const details = document.querySelector("#details").value.trim();
    const agree = document.querySelector("#agree").checked;

    if (!fullName || !email || !type || !trailName || !details) {
        setMessage(`Please complete all fields.`, true);
        return;
    }

    if (!agree) {
        setMessage(`Please confirm the safety acknowledgement checkbox.`, true);
        return;
    }

    setProfile({ fullName, email });

    const submission = {
        fullName,
        email,
        type,
        trailName,
        details,
        created: `${new Date().toLocaleString()}`
    };

    const submissions = getSubmissions();
    const updated = [submission, ...submissions].slice(0, 10);
    setSubmissions(updated);

    setMessage(`Thanks, ${fullName}. Your ${type.toLowerCase()} for “${trailName}” was saved.`, false);

    document.querySelector("#type").value = "";
    document.querySelector("#trailName").value = "";
    document.querySelector("#details").value = "";
    document.querySelector("#agree").checked = false;

    renderSubmissions();
}

function initPlanning() {
    fillProfileFields();
    renderSubmissions();

    const form = document.querySelector("#reportForm");
    if (form) {
        form.addEventListener("submit", (e) => handleSubmit(e));
    }
}

initPlanning();