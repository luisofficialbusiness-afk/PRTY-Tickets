let tickets = [];

// MODAL HANDLING
const modal = document.getElementById("ticketModal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModal");

openBtn.onclick = ()=>{modal.style.display="flex";}
closeBtn.onclick = ()=>{modal.style.display="none";}
window.onclick = (e)=>{if(e.target===modal) modal.style.display="none";}

function closeModal(){modal.style.display="none";}

// ADD TICKET
function addTicket(){
  const type = document.getElementById('ticketType').value;
  const sev = document.getElementById('ticketSev').value;
  const title = document.getElementById('ticketTitle').value;
  const desc = document.getElementById('ticketDesc').value;

  if(!title || !desc) return alert("Title and description required!");

  tickets.push({type,sev,title,desc,status:"Open"});
  renderTickets();
  updateStats();

  document.getElementById('ticketTitle').value="";
  document.getElementById('ticketDesc').value="";
}

// RENDER TICKETS
function renderTickets(){
  const container = document.getElementById('tickets');
  container.innerHTML = "";
  tickets.forEach((t,i)=>{
    const div = document.createElement('div');
    div.className = "ticket-card "+t.sev;
    div.innerHTML = `<h3>${t.title}</h3>
                     <p>${t.desc}</p>
                     <small>${t.type} | ${t.sev} | ${t.status}</small><br>
                     <button onclick="markDone(${i})">Done</button>
                     <button onclick="deleteTicket(${i})">Delete</button>`;
    container.appendChild(div);
  });
}

// TICKET ACTIONS
function markDone(i){tickets[i].status="Done"; renderTickets();}
function deleteTicket(i){tickets.splice(i,1); renderTickets(); updateStats();}

// STATS
function updateStats(){
  const bugs = tickets.filter(t=>t.type==="Bug").length;
  const suggestions = tickets.filter(t=>t.type==="Suggestion").length;
  document.getElementById('bugCount').innerText="🐞 Bugs: "+bugs;
  document.getElementById('suggestCount').innerText="💡 Suggestions: "+suggestions;
}

// CATASTROPHIC MODE
function toggleCat(){
  const overlay = document.getElementById('catOverlay');
  if(overlay.style.display==="flex"){
    overlay.style.display="none";
  } else {
    overlay.style.display="flex";
    const counts={Low:0,Medium:0,High:0,Critical:0};
    tickets.forEach(t=>counts[t.sev]++);
    document.getElementById('catStats').innerText=
      `Low: ${counts.Low} Medium: ${counts.Medium} High: ${counts.High} Critical: ${counts.Critical}`;
  }
}

// CLOCK
function updateClock(){
  const d = new Date();
  document.getElementById('clock').innerText = d.toLocaleString();
}
setInterval(updateClock,1000);
updateClock();
