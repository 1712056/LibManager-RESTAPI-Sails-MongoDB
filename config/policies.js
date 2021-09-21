/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  LivreController: {
    addBook: ["isLoggedIn", "ValidatorBook"],
    updateBook: ["isLoggedIn","ValidatorBook"],
    deleteBook: ["isLoggedIn"],
    addChapter: ["isLoggedIn"],
    updateChapter: ["isLoggedIn"],
    deleteChapter: ["isLoggedIn"],
  },
};
