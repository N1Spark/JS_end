document.addEventListener('DOMContentLoaded', () => {
  window.users = [
    { name: 'Name', surname: 'Surname' },
    { name: '------', surname: '-----------' },
    { name: 'User', surname: 'Experienced' },
    { name: 'Admin', surname: 'Networker' },
    { name: 'Moder', surname: 'Designer' }
  ]
  updateRegisteredUsers();
})

function updateRegisteredUsers() {
  const user_table = document.getElementById("registered-users");
  if (!user_table) throw "Element #registered-users not found";
  user_table.innerHTML = "";
  for (let user of window.users) {
    let row_table = user_table.insertRow();
    let user_name = row_table.insertCell();
    let user_surname = row_table.insertCell();
    user_name.innerHTML = `${user.name}`;
    user_surname.innerHTML = `| ${user.surname}`;
  }
  userContainer.appendChild(ul);
}