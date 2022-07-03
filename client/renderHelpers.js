import { fetchAllPlayers, fetchSinglePlayer, addNewPlayer, removePlayer} from './ajaxHelpers';

const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

export const renderAllPlayers = (playerList) => {
  // First check if we have any data before trying to render it!
  if (!playerList || !playerList.length) {
    playerContainer.innerHTML = '<h3>No players to display!</h3>';
    return;
  }

  // Loop through the list of players, and construct some HTML to display each one
  let playerContainerHTML = '';
  for (let i = 0; i < playerList.length; i++) {
    const pup = playerList[i];
    let pupHTML = `
      <div class="single-player-card">
        <div class="header-info">
          <p class="pup-title">${pup.name}</p>
          <p class="pup-number">#${pup.id}</p>
        </div>
        <img src="${pup.imageUrl}" alt="photo of ${pup.name} the puppy">
        <button class="detail-button" data-id=${pup.id}>See details</button>
        <button class="remove-button" data-id=${pup.id}>Remove Player</button>
      </div>
    `;
    playerContainerHTML += pupHTML;
  }

  // After looping, fill the `playerContainer` div with the HTML we constructed above
  playerContainer.innerHTML = playerContainerHTML;

  // Now that the HTML for all players has been added to the DOM,
  // we want to grab those "See details" buttons on each player
  // and attach a click handler to each one
  let detailButtons = [...document.getElementsByClassName('detail-button')];
  for (let i = 0; i < detailButtons.length; i++) {
    const button = detailButtons[i];
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      const player = await fetchSinglePlayer(id);
      await renderSinglePlayer(player);
      const button2 = document.getElementById('see-all');
      button2.addEventListener('click', async () => {
        const players =await fetchAllPlayers();
        renderAllPlayers(players);
      })
      
    });
  }

    let removeButtons = [...document.getElementsByClassName('remove-button')];
  for (let i = 0; i < removeButtons.length; i++) {
    const button = removeButtons[i];
    button.addEventListener('click', async () => {
      const id = button.dataset.id;
      await removePlayer(id);
      const players = await fetchAllPlayers();
      renderAllPlayers(players);

      
      
    });
  }
  
  
      
};

export const renderSinglePlayer = (playerObj) => {
  console.log(playerObj);
  if (!playerObj || !playerObj.id) {

    playerContainer.innerHTML = `${playerObj}`;
    return;
  }
  let teammates = ''
  if (playerObj.team !== null) {
    for(let i = 0; i < playerObj.team.players.length; i++) {
      if (playerObj.name !== playerObj.team.players[i].name) {
        teammates = teammates + `<p>${playerObj.team.players[i].name}</p>`
      }
    
    }
  }
  


  let pupHTML =`
    <div class="single-player-view">
      <div class="header-info">
        <p class="pup-title">${playerObj.name}</p>
        <p class="pup-number">#${playerObj.id}</p>
      </div>
      <p>Team: ${playerObj.team ? playerObj.team.name : 'Unassigned'}</p>
      <p>Teammates:</p>
      ${teammates}
      <p>Breed: ${playerObj.breed}</p>
      <div id="changeplayer">
      <form>
      <label for="team">Choose a team:</label>
      <select name="team"> id="teamselect">
      <option value="277">Ruff</option>

      </select>
     
      
      </form>
      <button id="changeteam">Change Team</button>
      </div>
      <img src="${playerObj.imageUrl}" alt="photo of ${
    playerObj.name
  } the puppy">
  
      <button id="see-all">Back to all players</button>
      
    </div>
    
    
  `;

  playerContainer.innerHTML = pupHTML;
  
  
      
};

const valueGet = () => {
  // let form = document.querySelector('#changeteam');
  // let button = document.getElementById('changeteam');
  // let value = form.value;
  // button.addEventListener('click', async (event) => {
  //  event.preventDefault();
  //  console.log(value);

   //const player = await fetchSinglePlayer(playerObj.id);
   // await renderSinglePlayer(player);
  // })
}

//export const changeTeam = (id, teamid) => {
//  let playerData = {
 //   teamId: teamid
 // }
//}



export const renderNewPlayerForm = () => {
  let formHTML = `
    <form>
      <label for="name">Name:</label>
      <input type="text" name="name" />
      <label for="breed">Breed:</label>
      <input type="text" name="breed" />
      <button type="submit">Submit</button>
    </form>
  `;
  newPlayerFormContainer.innerHTML = formHTML;

  let form = document.querySelector('#new-player-form > form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let playerData = {
      name: form.elements.name.value,
      breed: form.elements.breed.value
    }
    await addNewPlayer(playerData.name, playerData.breed);
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
  });
};
