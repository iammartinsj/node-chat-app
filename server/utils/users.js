class Users {
  constructor() {
    this.users = [];
  }
  //Add uSER
  addUser(id, name, room) {
    var user = { id, name, room };
    this.users = this.users.concat(user);
    return user;
  }

  //Remove User by Id
  removeUser(id) {
    const user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }

  //Get User by Id
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  //Get User-Name list
  getUserList(room) {
    const users = this.users.filter((user) => user.room === room);
    const usersArray = users.map((user) => user.name);
    return usersArray;
  }
}

module.exports = { Users };