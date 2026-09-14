// Load admin data
async function loadAdminData(){
  try{
    // Check authentication
    const authResponse=await fetch('/api/auth/me');
    if(!authResponse.ok){
      window.location.href='index.html';
      return;
    }
    const user=await authResponse.json();

    // Check if user has admin or creator role
    const roleResponse=await fetch(`/api/admin/users`);
    if(!roleResponse.ok){
      alert('У вас нет доступа к админ панели');
      window.location.href='index.html';
      return;
    }

    // Load pending teams
    loadPendingTeams();

    // Load pending tournaments
    loadPendingTournaments();

    // Load users
    loadUsers();
  }catch(error){
    console.error('Admin error:', error);
    alert('Ошибка загрузки админ панели');
  }
}

async function loadPendingTeams(){
  try{
    const response=await fetch('/api/admin/teams/pending');
    if(response.ok){
      const teams=await response.json();
      renderPendingTeams(teams);
    }
  }catch(error){
    console.error('Error loading pending teams:', error);
  }
}

function renderPendingTeams(teams){
  const container=document.getElementById('pendingTeams');
  if(!container)return;

  if(teams.length===0){
    container.innerHTML='<div class="empty">Нет заявок на команды</div>';
    return;
  }

  container.innerHTML=teams.map(team=>`
    <div class="admin-item">
      <div class="admin-item-header">
        <strong>${team.team_name}</strong>
        <span class="tag">${team.status}</span>
      </div>
      <div class="admin-item-body">
        <p><strong>Описание:</strong> ${team.description}</p>
        <p><strong>Контакт:</strong> ${team.organizer_contact}</p>
        ${team.player_steam_ids&&team.player_steam_ids.length>0?`<p><strong>Участники:</strong> ${team.player_steam_ids.join(', ')}</p>`:''}
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-dark" onclick="approveTeam(${team.id})">Одобрить</button>
        <button class="btn btn-light" onclick="rejectTeam(${team.id})">Отклонить</button>
      </div>
    </div>
  `).join('');
}

async function approveTeam(teamId){
  try{
    const response=await fetch(`/api/admin/teams/${teamId}/status`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({status:'APPROVED'})
    });
    if(response.ok){
      showNotification('Команда одобрена', 'success');
      loadPendingTeams();
    }else{
      showNotification('Ошибка при одобрении', 'error');
    }
  }catch(error){
    console.error('Error approving team:', error);
    showNotification('Ошибка при одобрении', 'error');
  }
}

async function rejectTeam(teamId){
  try{
    const response=await fetch(`/api/admin/teams/${teamId}/status`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({status:'REJECTED'})
    });
    if(response.ok){
      showNotification('Команда отклонена', 'success');
      loadPendingTeams();
    }else{
      showNotification('Ошибка при отклонении', 'error');
    }
  }catch(error){
    console.error('Error rejecting team:', error);
    showNotification('Ошибка при отклонении', 'error');
  }
}

async function loadPendingTournaments(){
  try{
    const response=await fetch('/api/admin/tournaments/pending');
    if(response.ok){
      const tournaments=await response.json();
      renderPendingTournaments(tournaments);
    }
  }catch(error){
    console.error('Error loading pending tournaments:', error);
  }
}

function renderPendingTournaments(tournaments){
  const container=document.getElementById('pendingTournaments');
  if(!container)return;

  if(tournaments.length===0){
    container.innerHTML='<div class="empty">Нет заявок на турниры</div>';
    return;
  }

  container.innerHTML=tournaments.map(tournament=>`
    <div class="admin-item">
      <div class="admin-item-header">
        <strong>${tournament.title}</strong>
        <span class="tag">${tournament.status}</span>
      </div>
      <div class="admin-item-body">
        <p><strong>Описание:</strong> ${tournament.description}</p>
        <p><strong>Формат:</strong> ${tournament.format}</p>
        <p><strong>Призовой фонд:</strong> ${tournament.prize}</p>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn-dark" onclick="approveTournament(${tournament.id})">Одобрить</button>
        <button class="btn btn-light" onclick="rejectTournament(${tournament.id})">Отклонить</button>
      </div>
    </div>
  `).join('');
}

async function approveTournament(tournamentId){
  try{
    const response=await fetch(`/api/admin/tournaments/${tournamentId}/status`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({status:'APPROVED'})
    });
    if(response.ok){
      showNotification('Турнир одобрен', 'success');
      loadPendingTournaments();
    }else{
      showNotification('Ошибка при одобрении', 'error');
    }
  }catch(error){
    console.error('Error approving tournament:', error);
    showNotification('Ошибка при одобрении', 'error');
  }
}

async function rejectTournament(tournamentId){
  try{
    const response=await fetch(`/api/admin/tournaments/${tournamentId}/status`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({status:'REJECTED'})
    });
    if(response.ok){
      showNotification('Турнир отклонен', 'success');
      loadPendingTournaments();
    }else{
      showNotification('Ошибка при отклонении', 'error');
    }
  }catch(error){
    console.error('Error rejecting tournament:', error);
    showNotification('Ошибка при отклонении', 'error');
  }
}

async function loadUsers(){
  try{
    const response=await fetch('/api/admin/users');
    if(response.ok){
      const users=await response.json();
      renderUsers(users);
    }
  }catch(error){
    console.error('Error loading users:', error);
  }
}

function renderUsers(users){
  const container=document.getElementById('usersList');
  if(!container)return;

  container.innerHTML=users.map(user=>`
    <div class="admin-item">
      <div class="admin-item-header">
        <strong>${user.steam_username}</strong>
        <span class="tag">${user.roles.length>0?user.roles.join(', '):'user'}</span>
      </div>
      <div class="admin-item-body">
        <p><strong>Steam ID:</strong> ${user.steam_id}</p>
        <p><strong>Регион:</strong> ${user.region}</p>
      </div>
      <div class="admin-item-actions">
        ${!user.roles.includes('organizer')?`<button class="btn btn-light" onclick="grantRole(${user.id}, 'organizer')">Назначить организатором</button>`:''}
        ${!user.roles.includes('admin')?`<button class="btn btn-light" onclick="grantRole(${user.id}, 'admin')">Назначить админом</button>`:''}
      </div>
    </div>
  `).join('');
}

async function grantRole(userId, role){
  try{
    const response=await fetch(`/api/admin/users/${userId}/role`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({role})
    });
    if(response.ok){
      showNotification(`Роль ${role} назначена`, 'success');
      loadUsers();
    }else{
      showNotification('Ошибка при назначении роли', 'error');
    }
  }catch(error){
    console.error('Error granting role:', error);
    showNotification('Ошибка при назначении роли', 'error');
  }
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
  `;
  document.body.appendChild(notification);
  setTimeout(()=>notification.remove(), 3000);
}

// Load admin data on page load
document.addEventListener('DOMContentLoaded', loadAdminData);
