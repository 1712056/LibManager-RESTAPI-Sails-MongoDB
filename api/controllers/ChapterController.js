/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable semi */
/* eslint-disable eqeqeq */
/**
 * ChapterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   *
   * @param {Object} req request object
   * @param {Object} res response
   * @returns all chapters in a book
   */
  getAllChapters: async (req, res) => {
    const bookId = req.params.id;
    const { status, data, error } = await ChapterService.getAllChapters(bookId);
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");
    }
    return HttpResponseService.json(res, 200, "Request success", data);
  },

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns a chapter in a book
   */
  getChapter: async (req, res) => {
    const numOfChap = req.params.number;
    const bookId = req.params.id;
    const { status, data, error } = await ChapterService.getChapter(
      bookId,numOfChap
    );
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");

    }
    switch (status) {
      case 200:
        return HttpResponseService.json(res, 200, "Request success", data);
      case 400:
        return HttpResponseService.json(res, 400, "Invalid book or chapter");
    }
  },

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns add new chapter into a book
   */
  addChapter: async (req, res) => {
    const bookId = req.params.id;
    const chapter = req.body
    const { status, data, error } = await ChapterService.addNewChapter(bookId, chapter);
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");
    }
    switch (status) {
      case 201:
        return HttpResponseService.json(res, 201, "Create successfully", data);
      case 400:
        return HttpResponseService.json(res, 400, "Invalid book or chapter");
    }
  },

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns update a chapter in a book
   */
  updateChapter: async (req, res) => {
    const numOfChap = req.params.number;
    const bookId = req.params.id;
    const { data } = await ChapterService.getChapter(bookId,numOfChap);

    if (data == null) {
      return HttpResponseService.json(res, 400, "Invalid book or chapter");

    }
    const newData = req.body;
    const { error } = await ChapterService.updateChapter(data, newData);
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");

    }
    return HttpResponseService.json(
      res,
      200,
      `Chapter ${newData.title} is updated`
    );

  },

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns delete a chapter in a book
   */
  deleteChapter: async (req, res) => {
    const numOfChap = req.params.number;
    const bookId = req.params.id;
    const { status, message, error } = await ChapterService.deleteChapter(
      bookId,numOfChap
    );
    if (error) {
      return HttpResponseService.json(res, 500, "Database error");

    }
    switch (status) {
      case 204:
        return HttpResponseService.json(res, 204);

      case 400:
        return HttpResponseService.json(res, 400, message);
    }
  },
};
