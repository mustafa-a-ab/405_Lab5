const players = [
  { name:"LeBron James", team:"Lakers", points:27.8, rebounds:8.2, assists:8.6 },
  { name:"Stephen Curry", team:"Warriors", points:30.1, rebounds:5.4, assists:6.3 },
  { name:"Kevin Durant", team:"Suns", points:28.4, rebounds:7.2, assists:5.6 },
  { name:"Luka Dončić", team:"Mavericks", points:32.2, rebounds:8.5, assists:9.1 },
  { name:"Giannis Antetokounmpo", team:"Bucks", points:31.5, rebounds:11.9, assists:5.7 },
];

const tbody = document.getElementById("player-rows");
const search = document.getElementById("search");
const teamFilter = document.getElementById("team-filter");
const darkBtn = document.getElementById("dark-mode-toggle");

function render(data){
  tbody.innerHTML = "";
  data.forEach(p=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.team}</td>
      <td>${p.points}</td>
      <td>${p.rebounds}</td>
      <td>${p.assists}</td>
    `;
    tbody.appendChild(tr);
  })
}

function populateTeams(){
  const teams = [...new Set(players.map(p=>p.team))]
  teams.forEach(t=>{
    const opt = document.createElement("option")
    opt.value = t
    opt.textContent = t
    teamFilter.appendChild(opt)
  })
}

function apply(){
  let r = [...players];
  const q = search.value.toLowerCase();
  r = r.filter(p=>p.name.toLowerCase().includes(q));

  if(teamFilter.value!=="all"){
    r = r.filter(p=>p.team===teamFilter.value)
  }
  render(r);
}

search.addEventListener("input",apply);
teamFilter.addEventListener("change",apply);

darkBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark-mode");
})

document.querySelectorAll("th").forEach(th=>{
  th.addEventListener("click",()=>{
    const key = th.dataset.sort;
    players.sort((a,b)=>{
      if(typeof a[key] === "string"){
        return a[key].localeCompare(b[key])
      }
      return b[key] - a[key];
    })
    apply();
  })
})

populateTeams();
apply();
