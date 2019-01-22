const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var removeUserremoveUser;
  //Run this before each test cases run
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:'123',
      name: 'Jenny',
      room: 'Node Course'
    },{
      id:'456',
      name: 'Mika',
      room: 'React Course'
    },{
      id:'789',
      name: 'Rolls',
      room: 'Node Course'
    }]
  });

  //Add New User
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Steve Martin',
      room: 'Node Course'
    }
    const resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  //Remove User in the list
  it('should remove a user', () => {
    var id = '123';
    var user = users.removeUser(id);
    expect(user.id).toBe(id);
    expect(users.users.length).toBe(2);
  });

  //Not Remove User in the list
  it('should not remove user', () => {
    var id = '111';
    var user = users.removeUser(id);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  //Get User by Id
  it('should find user', () => {
    const userId = '123';
    const user = users.getUser(userId);
    expect(user.id).toBe(userId);
  })

  //No User to get
  it('should not find user', () => {
    const userId = '0';
    const user = users.getUser(userId);
    expect(user).toNotExist();
  });

  //Return List of User in Node Course Room
  it('should return name for node course', () => {
    var userlist = users.getUserList('Node Course');
    expect(userlist).toEqual(['Jenny','Rolls']);
  });

  //Return List of User in React Course Room
  it('should return name of react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Mika']);
  });
});
