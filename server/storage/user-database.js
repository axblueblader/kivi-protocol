// simple in-memory db to map username with user info

class UserInfo {
  constructor() {
    this.username = undefined;
    this.password = undefined;
    this.online = false;
    this.name = undefined;
    // date of birth
    this.date = undefined;
    this.note = undefined;
  }
}
class UserDb {
  constructor() {
    this.database = {};
    this.testAccs();
  }

  testAccs() {
    let tmp = new UserInfo();
    tmp.username = "123";
    tmp.password = "123";
    this.create(tmp.username, tmp);
    tmp = new UserInfo();
    tmp.username = "qwe";
    tmp.password = "qwe";
    this.create(tmp.username, tmp);
    tmp = new UserInfo();
    tmp.username = "abc";
    tmp.password = "abc";
    this.create(tmp.username, tmp);
  }

  find(username, option) {
    // clone into variable
    if (this.database[username]) {
      const userInfo = { ...this.database[username] };
      if (!option || option.showAll || option.exist) {
        return userInfo;
      }

      if (!option.showPassword) delete userInfo.password;
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

  update(username, userInfo) {
    if (this.database[username]) {
      Object.keys(userInfo).map(key => {
        this.database[username][key] = userInfo[key];
      });
    }
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

module.exports = {
  UserDb: new UserDb(),
  UserInfo: UserInfo,
  CheckUserOption: CheckUserOption
};
