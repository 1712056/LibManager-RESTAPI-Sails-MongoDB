/* eslint-disable prefer-arrow-callback */
/*eslint linebreak-style: ["error", "windows"]*/

module.exports = {
  /**
   *
   * @returns a new user
   */

  async addUser(user) {
    try {
      const newUser = await User.create({
        username: user.username,
        password: user.password,
        name: user.name,
      }).fetch();
      if (newUser) {
        return {
          status: 201,
          newUser: newUser,
        };
      }
      return {
        status: 400,
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },

  /**
   *
   * @param {String} username
   * @returns a user
   */
  async getUser(username) {
    try {
      const user = await User.findOne({ username: username });
      
      if (user) {
        return {
          status: 200,
          user,
        };
      }
      return {
        user:null,
        status: 401,
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },

  /**
   *
   * @param {String} id
   * @param {String} rftoken
   * @returns update user with refreshtoken
   */
  async patchRFToken(id, rftoken) {
    try {
      const user = await User.updateOne({ _id: id }).set({ rfToken: rftoken });
      return user;
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },

  /**
   *
   * @param {String} id
   * @param {String} rftoken
   * @returns true if exist refreshtoken
   */
  async isRFToken(id, rftoken) {
    try {
      const user = await User.findOne({ _id: id, rfToken: rftoken });
      if (user) {
        return true;
      }
      return false;
    } catch (e) {
      return {
        error: e,
      };
    }
  },
};
