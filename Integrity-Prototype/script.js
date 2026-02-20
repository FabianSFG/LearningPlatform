lucide.createIcons();

function handleLogin() {
    const rules = document.getElementById('rules').checked;
    if(!rules) {
        alert("¡Espera! Debes aceptar las reglas de la comunidad para entrar.");
        return;
    }
    
    const loginScreen = document.getElementById('login-screen');
    loginScreen.style.transform = "translateY(-100%)";
    loginScreen.style.transition = "0.6s cubic-bezier(0.7, 0, 0.3, 1)";
    
    setTimeout(() => {
        loginScreen.style.display = 'none';
        document.getElementById('app-container').className = 'app-visible';
        navigate('dashboard', document.querySelector('.nav-item'));
    }, 600);
}

function handleLogout() { location.reload(); }

const views = {
    dashboard: `
        <div class="animate-pop">
            <h2>Welcome back, Corrie</h2>
            <div class="card-grid" style="display:flex; gap:20px; margin-top:30px;">
                <div class="card" style="flex:1; background:white; padding:30px; border-radius:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                    <h3 style="color:#64748b; font-size:0.8rem; letter-spacing:1px;">ACTIVE MEMBERS</h3>
                    <p style="font-size:2rem; font-weight:800; color:var(--primary);">1,240</p>
                </div>
                <div class="card" style="flex:1; background:white; padding:30px; border-radius:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
                    <h3 style="color:#64748b; font-size:0.8rem; letter-spacing:1px;">PENDING TASKS</h3>
                    <p style="font-size:2rem; font-weight:800; color:#3b82f6;">4</p>
                </div>
            </div>
        </div>
    `,
    community: `
        <div class="chat-wrapper" style="background:white; border-radius:20px; overflow:hidden; border:1px solid #e2e8f0;">
            <div class="chat-messages" id="chat-box">
                <div class="msg received"><strong>Mark:</strong> Has anyone checked the new AI legal guide?</div>
                <div class="msg sent"><strong>Corrie:</strong> I'm looking at it right now!</div>
            </div>
            <div style="padding:20px; border-top:1px solid #e2e8f0; display:flex; gap:10px;">
                <input type="text" id="chat-input" placeholder="Say something to the community..." style="flex:1; padding:12px; border-radius:10px; border:1px solid #ddd; outline:none;">
                <button class="btn-login-glow" style="width:auto; padding:0 20px;" onclick="sendMessage()">Send</button>
            </div>
        </div>
    `,
    learning: `
        <div class="courses-grid">
            <div class="course-card" onclick="playVideo('dQw4w9WgXcQ', 'AI Foundations')">
                <div class="course-img"><i data-lucide="play" size="48"></i></div>
                <div class="course-info" style="padding:15px;"><strong>AI Foundations</strong><p>12 Lessons • Beginner</p></div>
            </div>
            <div class="course-card" onclick="playVideo('4K6nN69v90E', 'Advanced Automations')">
                <div class="course-img" style="background:#0f172a;"><i data-lucide="zap" size="48"></i></div>
                <div class="course-info" style="padding:15px;"><strong>Advanced Automations</strong><p>15 Lessons • Pro</p></div>
            </div>
        </div>
        <div id="video-area" style="display:none; margin-top:30px; border-radius:20px; overflow:hidden;">
            <h3 id="current-video-title"></h3>
            <iframe id="yt-frame" width="100%" height="450" src="" frameborder="0" allowfullscreen style="margin-top:15px;"></iframe>
        </div>
    `
};

function navigate(view, el) {
    document.getElementById('view-container').innerHTML = views[view];
    document.getElementById('page-title').innerText = view.toUpperCase();
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    lucide.createIcons();
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const box = document.getElementById('chat-box');
    if(!input.value) return;

    box.innerHTML += `<div class="msg sent"><strong>Corrie:</strong> ${input.value}</div>`;
    const val = input.value.toLowerCase();
    input.value = "";
    
    setTimeout(() => {
        if(val.includes("help") || val.includes("ia")) {
            triggerAI("I've noticed you're asking about AI. Loading help resources...");
            box.innerHTML += `<div class="msg received"><strong>AI Sidekick:</strong> Hi Corrie! I can help you with that. Opening Documentation...</div>`;
        }
    }, 800);
}

function playVideo(id, title) {
    document.getElementById('video-area').style.display = 'block';
    document.getElementById('yt-frame').src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    document.getElementById('current-video-title').innerText = "Now Watching: " + title;
    triggerAI("Enabling focus mode for: " + title);
}

function triggerAI(msg) {
    const toast = document.getElementById('ai-toast');
    document.getElementById('ai-text').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}