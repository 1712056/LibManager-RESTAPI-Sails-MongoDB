/* eslint-disable prefer-arrow-callback */
/*eslint linebreak-style: ["error", "windows"]*/

module.exports = {
  /**
   * 
   * @param {string} bookId 
   * @returns all chapters in a book
   */

  async getAllChapters(bookId) {
      
    try {
      const chapters = await Chapter.find({book:bookId});
      return {
        status: 200,
        data: chapters,
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
   * @param {string} bookId 
   * @param {number} numOfChap 
   * @returns a chapter in a book
   */
  async getChapter(bookId, numOfChap) {
    try {
        
      const chapter = await Chapter.findOne({ book: bookId, number: numOfChap });
      if (chapter) {
        return {
          status: 200,
          data: chapter,
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
   * @param {string} bookId 
   * @param {object} newChapter 
   * @returns a new chapter in a book
   */
  async addNewChapter(bookId,newChapter) {
    try {
      const { title, page} = newChapter;
      const chapters = await Chapter.find({book:bookId});
      const chapter = await Chapter.create({
        title: title,
        page: page,
        book:bookId,
        number: chapters.length+1,
      }).fetch();
      if (chapter) {
        return {
          status: 201,
          data: chapter,
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
   * @param {Object} unUpdateChapter
   * @param {Object} newUpdateChapter
   * @returns a updated chapter
   */
  async updateChapter(unUpdateChapter, newUpdateChapter) {
    try {
      const updatedChapter = await Chapter.updateOne({ _id: unUpdateChapter.id }).set({
        title: newUpdateChapter.title,
        number: newUpdateChapter.number,
        page: newUpdateChapter.page,
      });

      return { updatedChapter };
    } catch (error) {
      return error;
    }
  },

  /**
   *
   * @param {string} id
   * @returns
   */
  async deleteChapter(bookId,numOfChap) {
    try {
      const destroyedChapter = await Chapter.destroyOne({ book:bookId, number:numOfChap });

      if (destroyedChapter) {
        return {
          status: 204,
          message: "delete successfully",
        };
      }
      return {
        status: 400,
        message: "Invalid book or chapter",
      };
    } catch (e) {
      return {
        status: 500,
        error: e,
      };
    }
  },
};
