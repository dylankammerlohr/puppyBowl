// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2206-FTB-ET-WEB-FT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;


export const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.players;
      } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

export const fetchSinglePlayer = async (playerId) => {
    try{
        const response = await fetch(`${APIURL}/players/${playerId}`);
        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.player;
    } catch (err) {
        console.error('Uh oh, trouble fetching player!', err);
    }
    
};

export const addNewPlayer = async (name, breed) => {
    try{
        const response = await fetch(`${APIURL}/players/`, 
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${name}`,
                    breed: `${breed}`,
                }
                )
            }
        );

        const result = await response.json();
        if (result.error) throw result.error;
        return result.data.player;
    } catch (err) {
        console.error('Uh oh, trouble fetching player!', err);
    }
}
;

export const removePlayer = async (playerId) => {
    fetch(`${APIURL}/players/`, {
    method: 'DELETE',
  });
  try {
    const response = await fetch(
        `${APIURL}/players/${playerId}`,
      {
        method: 'DELETE',
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
