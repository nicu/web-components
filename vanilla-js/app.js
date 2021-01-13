const addUser = async () => {
  const data = await fetch('https://randomuser.me/api')
  const json = await data.json();
  const [user] = json.results;

  const bwsCard = document.createElement('bws-card');
  bwsCard.setAttribute('user', `${user.name.first} ${user.name.last}`);
  bwsCard.setAttribute('email', user.email);
  bwsCard.setAttribute('picture', user.picture.thumbnail);
  bwsCard.setAttribute('dynamic', true);
  
  document.querySelector('.users').appendChild(bwsCard);
};

document.querySelector('#addUser').addEventListener('click', addUser);