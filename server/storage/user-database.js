// simple in-memory db to map username with user info

class UserInfo {
  username = undefined;
  password = undefined;
  online = undefined;
  name = undefined;
  date = undefined;
  note = undefined;

  constructor() {}
}
class UserDb {
  database = {};
  constructor() {}

  find(username, option) {
    // clone into variable
    const userInfo = { ...this.database[username] };

    if (userInfo) {
      delete userInfo.password;

      if (option.showAll || option.exist) {
        return userInfo;
      }

      if (!option.showDate) delete userInfo.date;
      if (!option.showName) delete userInfo.name;
      if (!option.online) delete userInfo.online;
      if (!option.showNote) delete userInfo.note;

      return userInfo;
    } else {
      return undefined;
    }
  }

  create(username, userInfo) {
    this.database[username] = userInfo;
  }
}

class CheckUserOption {
  constructor() {
    this.exist = false;
    this.online = false;
    this.showDate = false;
    this.showName = false;
    this.showNote = false;
    this.showAll = true;
  }
}
