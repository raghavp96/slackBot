const lib = require('lib')({token: process.env.STDLIB_TOKEN});

/**
* /flight - simply processes text for what information to look for.
					= TODO needs be robust for communicating with Google QPX API
*
*   Basic text process command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/

module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
	var resp = processText(text);
	
  callback(null, {
    response_type: 'in_channel',
    text: `${resp}`
  });
};

function processText(text) {
	if (text == undefined) {
		return '';
	} else {
		if (typeof text === 'string' || text instanceof String) {
			var when = find('on', text);
			var origin = find('from', text);
			var destination = find('to', text);
			var passengers = find1('for', text);
			return 	'{' +
									'"when" : "' + when + '",' +
									'"origin" : "' + origin + '",' +
									'"destination" : "' + destination + '",' +
									'"passengers" : "' + passengers + '"' +
							'}';
		} else {
			return '';
		}
	}
}

function find(what, text) {
	if (what == undefined) {
		return '';
	} else {
		if (typeof what === 'string' || what instanceof String) {
			for (var i = 0; i < text.length; i++) {
				var ind = text.indexOf(what);
				if (ind == -1) {
					return '';
				} else {
					var restText = text.substring(ind + what.length + 1);
					var spaceInd = restText.indexOf(' ');
					if (spaceInd == -1) {
						return restText;
					} else {
						return restText.substring(0, spaceInd);
					}
				}
			}
		} else {
			return '';
		}
	}
}

function find1(what, text) {
	if (what == undefined) {
		return '';
	} else {
		if (typeof what === 'string' || what instanceof String) {
			for (var i = 0; i < text.length; i++) {
				var ind = text.indexOf(what);
				if (ind == -1) {
					return '';
				} else {
					var restText = text.substring(ind + what.length + 1);
					var spaceInd = restText.indexOf(' ');
					return restText;
				}
			}
		} else {
			return '';
		}
	}
}
