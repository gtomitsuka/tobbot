// reaction controller - at the moment only non-intelligent answers.

/**
 * @returns {String} - with simple answers.
 */
function basicReply(message) {
    if (message.text == "How are you doing?")
        return "Fine, what about you?"

    return "Hi!";
}

module.exports = basicReply