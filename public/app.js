
function openModal(id){document.getElementById(id)?.classList.add('open')}
function closeModal(id){document.getElementById(id)?.classList.remove('open')}
document.addEventListener('click',e=>{
  if(e.target.classList.contains('modal')) e.target.classList.remove('open');
});
function filterCards(inputId, cardSelector){
  const input=document.getElementById(inputId);
  if(!input)return;
  input.addEventListener('input',()=>{
    const q=input.value.trim().toLowerCase();
    
    // Use API filtering for better results
    if(inputId==='playerSearch'){
      const roleFilter=document.getElementById('roleFilter');
      const role=roleFilter?roleFilter.value:'Все роли';
      loadPlayersFromAPI(role, q);
    }else if(inputId==='tournamentSearch'){
      const statusFilter=document.getElementById('tournamentFilter');
      const status=statusFilter?statusFilter.value:'Все турниры';
      loadTournamentsFromAPI(status, q);
    }else if(inputId==='teamSearch'){
      loadTeamsFromAPI(q);
    }
  });
}

function filterByRole(selectId, cardSelector){
  const select=document.getElementById(selectId);
  if(!select)return;
  select.addEventListener('change',()=>{
    const role=select.value;
    const searchInput=document.getElementById('playerSearch');
    const search=searchInput?searchInput.value.trim():'';
    loadPlayersFromAPI(role, search);
  });
}

function filterByStatus(selectId, cardSelector){
  const select=document.getElementById(selectId);
  if(!select)return;
  select.addEventListener('change',()=>{
    const status=select.value;
    const searchInput=document.getElementById('tournamentSearch');
    const search=searchInput?searchInput.value.trim():'';
    loadTournamentsFromAPI(status, search);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  filterCards('playerSearch','.player-card');
  filterCards('teamSearch','.team-card');
  filterCards('tournamentSearch','.t-card');
  
  filterByRole('roleFilter','.player-card');
  filterByStatus('tournamentFilter','.t-card');
  
  document.querySelectorAll('img[loading="lazy"]').forEach(img=>{
    if(img.complete){
      img.classList.add('loaded');
    }else{
      img.addEventListener('load',()=>img.classList.add('loaded'));
    }
  });
  
  // Load data from API
  loadPlayersFromAPI();
  loadTeamsFromAPI();
  loadTournamentsFromAPI();
  checkAuthStatus();
});

async function loadPlayersFromAPI(roleFilter='', searchQuery=''){
  try{
    let url='/api/players';
    const params=new URLSearchParams();
    if(roleFilter && roleFilter!=='Все роли'){
      params.append('role', roleFilter);
    }
    if(searchQuery){
      params.append('search', searchQuery);
    }
    if(params.toString()){
      url+=`?${params.toString()}`;
    }
    const response=await fetch(url);
    if(response.ok){
      const players=await response.json();
      renderPlayers(players);
    }else{
      console.log('API error, using demo data for players');
    }
  }catch(error){
    console.log('Using demo data for players');
  }
}

async function loadTeamsFromAPI(searchQuery=''){
  try{
    let url='/api/teams';
    if(searchQuery){
      url+=`?search=${searchQuery}`;
    }
    const response=await fetch(url);
    if(response.ok){
      const teams=await response.json();
      renderTeams(teams);
    }else{
      console.log('API error, using demo data for teams');
    }
  }catch(error){
    console.log('Using demo data for teams');
  }
}

async function loadTournamentsFromAPI(statusFilter='', searchQuery=''){
  try{
    let url='/api/tournaments';
    const params=new URLSearchParams();
    if(statusFilter && statusFilter!=='Все турниры'){
      params.append('status', statusFilter);
    }
    if(searchQuery){
      params.append('search', searchQuery);
    }
    if(params.toString()){
      url+=`?${params.toString()}`;
    }
    const response=await fetch(url);
    if(response.ok){
      const tournaments=await response.json();
      renderTournaments(tournaments);
    }else{
      console.log('API error, using demo data for tournaments');
    }
  }catch(error){
    console.log('Using demo data for tournaments');
  }
}

async function checkAuthStatus(){
  try{
    const response=await fetch('/api/auth/me');
    if(response.ok){
      const user=await response.json();
      updateAuthUI(user);
    }
  }catch(error){
    console.log('Not authenticated');
  }
}

function renderPlayers(players){
  const grid=document.querySelector('#playerGrid');
  if(!grid)return;
  
  if(players.length===0){
    grid.innerHTML='<div class="empty">Нет зарегистрированных игроков</div>';
    return;
  }
  
  grid.innerHTML=players.map(player=>`
    <article class="card player-card" data-role="${player.role}">
      <div class="player-top">
        <div class="avatar">
          ${player.avatar_url 
            ? `<img src="${player.avatar_url}" alt="${player.username}" style="width:100%;height:100%;object-fit:cover">`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
          }
        </div>
        <span class="tag ${player.verified?'red':''}">${player.verified?'VERIFIED':'UNVERIFIED'}</span>
      </div>
      <div class="player-name">${player.username}</div>
      <div class="real-name">Public Profile · ${player.region}</div>
      <div class="stat-row">
        <div class="stat"><strong>${player.role}</strong><span>Role</span></div>
        <div class="stat"><strong>${player.team_name||'Free'}</strong><span>Team</span></div>
      </div>
      <div class="card-footer">
        <a class="steam-link" href="profile.html?id=${player.id}">Открыть профиль →</a>
        <span class="mono muted">#${String(player.id).padStart(3,'0')}</span>
      </div>
    </article>
  `).join('');
}

function renderTeams(teams){
  const grid=document.querySelector('#teamGrid');
  if(!grid)return;
  
  if(teams.length===0){
    grid.innerHTML='<div class="empty">Нет зарегистрированных команд</div>';
    return;
  }
  
  grid.innerHTML=teams.map(team=>{
    let players='';
    for(let i=0;i<team.player_count;i++){
      players+='<span class="mini-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>';
    }

    return `
    <article class="card team-card">
      <div class="team-head">
        <div class="team-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
        </div>
        <div>
          <div class="team-name">${team.team_name}</div>
          <div class="muted">${team.status==='REGISTERED'?'Official team':'Application review'} · ${team.region}</div>
        </div>
      </div>
      <div class="team-info">
        <span class="tag ${team.status==='REGISTERED'?'red':''}">${team.status}</span>
        <span class="tag">${team.player_count} players</span>
      </div>
      <div class="team-players">
        ${players}
      </div>
      <div class="card-footer">
        <span class="muted">Organizer: ${team.organizer_contact}</span>
        <a class="steam-link" href="#">Команда →</a>
      </div>
    </article>
  `}).join('');
}

function renderTournaments(tournaments){
  const grid=document.querySelector('#tournamentGrid');
  if(!grid)return;
  
  if(tournaments.length===0){
    grid.innerHTML='<div class="empty">Нет активных турниров</div>';
    return;
  }
  
  grid.innerHTML=tournaments.map(t=>`
    <article class="card t-card" data-status="${t.access_type==='OPEN'?'Открытые':'По приглашению'}">
      <div class="t-top">
        <div>
          <div class="t-title">${t.title}</div>
          <div class="t-organizer">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            Organizer · TBD
          </div>
        </div>
        <div class="prize">${t.prize}</div>
      </div>
      <div class="t-meta">
        <div class="meta-box"><span>Формат</span><strong>${t.format}</strong></div>
        <div class="meta-box"><span>Доступ</span><strong>${t.access_type==='OPEN'?'Открытый':'По приглашению'}</strong></div>
        <div class="meta-box"><span>Регистрация</span><strong>${new Date(t.registration_deadline).toLocaleDateString('ru-RU')}</strong></div>
        <div class="meta-box"><span>Команд</span><strong>${t.current_teams} / ${t.max_teams}</strong></div>
      </div>
      <div class="card-footer">
        <span class="tag ${t.status==='REGISTRATION'?'red':''}">${t.status}</span>
        <button class="btn btn-light">${t.status==='REGISTRATION'?'Подать заявку →':'Подробнее →'}</button>
      </div>
    </article>
  `).join('');
}

function updateAuthUI(user){
  const authLinks=document.querySelectorAll('.header-steam');
  authLinks.forEach(link=>{
    link.querySelector('span').textContent=`${user.steam_username || user.username} →`;
  });
  
  // If on profile page, load profile data
  if(window.location.pathname.includes('profile.html')){
    loadProfileData(user);
  }
}

function loadProfileData(user){
  const profileContent=document.getElementById('profileContent');
  if(!profileContent)return;

  // Use avatar from database or fallback
  const avatarUrl=user.avatar_url||`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a61597ff40f1b32.jpg`;
  const steamId=user.steam_id;

  // Render profile based on user data
  profileContent.innerHTML=`
    <div class="profile-container">
      <aside class="profile-sidebar">
        <div class="profile-avatar-wrapper">
          <img src="${avatarUrl}" alt="${user.steam_username}" class="profile-avatar" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="profile-avatar-fallback" style="display:none">${user.steam_username?.charAt(0).toUpperCase()||'U'}</div>
        </div>
        <div class="profile-user">${user.steam_username||'User'}</div>
        <div class="profile-role">Verified Player</div>
        <div class="profile-actions">
          <a class="btn btn-dark" href="https://steamcommunity.com/profiles/${steamId}" target="_blank">Steam профиль →</a>
          <button class="btn btn-light" onclick="showNotification('Функция редактирования профиля доступна', 'info')">Редактировать</button>
        </div>
        <div class="profile-stats-mini">
          <div class="stat-mini">
            <span class="stat-value">0</span>
            <span class="stat-label">Матчей</span>
          </div>
          <div class="stat-mini">
            <span class="stat-value">0</span>
            <span class="stat-label">Турниров</span>
          </div>
          <div class="stat-mini">
            <span class="stat-value">0</span>
            <span class="stat-label">Команд</span>
          </div>
        </div>
      </aside>
      <section class="profile-main">
        <div class="profile-header">
          <h2 class="profile-title">${user.steam_username||'User'}</h2>
          <div class="profile-badges">
            <span class="badge badge-verified">Steam Verified</span>
            <span class="badge badge-region">${user.region||'CIS'}</span>
          </div>
        </div>
        
        <div class="profile-grid">
          <div class="profile-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>
            </div>
            <div class="card-content">
              <h4>Игровая статистика</h4>
              <p>0 матчей • 0% побед • 0 KDA</p>
            </div>
          </div>
          <div class="profile-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            </div>
            <div class="card-content">
              <h4>Турниры</h4>
              <p>0 участий • 0 побед • 0 призовых мест</p>
            </div>
          </div>
          <div class="profile-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div class="card-content">
              <h4>Команды</h4>
              <p>Не состоит в команде</p>
            </div>
          </div>
          <div class="profile-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div class="card-content">
              <h4>На платформе</h4>
              <p>${new Date(user.created_at).toLocaleDateString('ru-RU')}</p>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h3 class="section-title">История турниров</h3>
          <div class="empty-state">
            <div class="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
            </div>
            <p>Вы еще не участвовали в турнирах</p>
            <a href="tournaments.html" class="btn btn-light">Найти турнир →</a>
          </div>
        </div>

        <div class="profile-section">
          <h3 class="section-title">Командная история</h3>
          <div class="empty-state">
            <div class="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <p>Вы не состоите в команде</p>
            <a href="teams.html" class="btn btn-light">Найти команду →</a>
          </div>
        </div>

        <div class="profile-section">
          <h3 class="section-title">Информация об аккаунте</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Steam ID</span>
              <span class="info-value mono">${user.steam_id||'STEAM_ID'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Регистрация</span>
              <span class="info-value">${new Date(user.created_at).toLocaleDateString('ru-RU')}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Регион</span>
              <span class="info-value">${user.region||'CIS'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Статус</span>
              <span class="info-value success">Активен</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
function fakeSubmit(message, modalId){
  const form=document.querySelector(`#${modalId} form`);
  if(form) form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!validateForm(form)){
      showNotification('Пожалуйста, заполните все обязательные поля', 'error');
      return;
    }

    // Collect form data
    const formData=new FormData(form);
    const data={};
    formData.forEach((value,key)=>data[key]=value);

    // Handle player Steam IDs
    if(modalId==='teamModal'){
      const steamIdsInput=document.getElementById('playerSteamIds');
      if(steamIdsInput && steamIdsInput.value.trim()){
        const steamIds=steamIdsInput.value.split(',').map(id=>id.trim()).filter(id=>id);
        data.player_steam_ids=steamIds;
      }else{
        data.player_steam_ids=[];
      }
    }

    // Determine which API endpoint to call based on modal
    let apiUrl='';
    if(modalId==='teamModal'){
      apiUrl='/api/teams';
    }else if(modalId==='tournamentModal'){
      apiUrl='/api/tournaments';
    }

    if(apiUrl){
      fetch(apiUrl,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      })
      .then(response=>{
        if(!response.ok) return response.json().then(err=>{throw err});
        return response.json();
      })
      .then(result=>{
        closeModal(modalId);
        showNotification(message, 'success');
        form.reset();
        // Reload data
        if(modalId==='teamModal') loadTeamsFromAPI();
        if(modalId==='tournamentModal') loadTournamentsFromAPI();
      })
      .catch(error=>{
        console.error('Error:', error);
        showNotification(error.error||'Ошибка при отправке данных', 'error');
      });
    }else{
      closeModal(modalId);
      showNotification(message, 'success');
      form.reset();
    }
  });
}

function showNotification(message, type='info'){
  const notification=document.createElement('div');
  notification.className=`notification notification-${type}`;
  notification.textContent=message;
  notification.style.cssText=`
    position:fixed;
    top:20px;
    right:20px;
    padding:16px 20px;
    background:${type==='success'?'#10b981':type==='error'?'#ef4444':'#3b82f6'};
    color:white;
    border-radius:10px;
    box-shadow:0 10px 30px rgba(0,0,0,0.15);
    z-index:1000;
    animation:slideIn 0.3s ease-out;
    font-weight:600;
    font-size:14px;
    max-width:350px;
  `;
  document.body.appendChild(notification);
  
  setTimeout(()=>{
    notification.style.animation='slideOut 0.3s ease-out forwards';
    setTimeout(()=>notification.remove(),300);
  },3000);
}

const style=document.createElement('style');
style.textContent=`
  @keyframes slideIn{
    from{transform:translateX(100%);opacity:0}
    to{transform:translateX(0);opacity:1}
  }
  @keyframes slideOut{
    from{transform:translateX(0);opacity:1}
    to{transform:translateX(100%);opacity:0}
  }
`;
document.head.appendChild(style);

function validateForm(form){
  const inputs=form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid=true;
  
  inputs.forEach(input=>{
    const value=input.value.trim();
    
    if(!value){
      isValid=false;
      input.style.borderColor='#ef4444';
      input.addEventListener('input',()=>{
        if(input.value.trim()){
          input.style.borderColor='';
        }
      },{once:true});
      return;
    }
    
    if(input.minLength && value.length < input.minLength){
      isValid=false;
      input.style.borderColor='#ef4444';
      showNotification(`Минимум ${input.minLength} символов`, 'error');
      input.addEventListener('input',()=>{
        if(input.value.length >= input.minLength){
          input.style.borderColor='';
        }
      },{once:true});
      return;
    }
    
    if(input.pattern && !new RegExp(input.pattern).test(value)){
      isValid=false;
      input.style.borderColor='#ef4444';
      showNotification('Неверный формат', 'error');
      input.addEventListener('input',()=>{
        if(new RegExp(input.pattern).test(input.value)){
          input.style.borderColor='';
        }
      },{once:true});
    }
  });
  
  return isValid;
}
