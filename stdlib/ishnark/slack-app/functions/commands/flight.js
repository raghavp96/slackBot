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
	var resp = queryQpxApi(text, callback);
  callback(null, {
    response_type: 'in_channel',
    //text: `${JSON.stringify(resp)}`
    text: resp
  });
};

function queryQpxApi(text) {
	if (text == undefined) {
		return '';
	} else {
		if (typeof text === 'string' || text instanceof String) {
			return httpPOST(createRequestObject(text));	
		} else {
			return '';
		}
	}
}

function httpPOST(requestObject)
{
	var postRequest = require('request');
	postRequest.post(
		'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyDezFY0C4JTk_UvN4EbYdvrcsrivKbRZ3I',
		requestObject,
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				return body;
			} else {
				console.log('I MADE THIS LOG' + body);
			}
		}
	);
}

function createRequestObject(text) {
	var request = 
		{
			request : {
			slice : [],
			passengers: {},
			solutions : 5,
			refundable : false
		},
	};
	
	var trip = {
		origin : find('from', text),
		destination : find('to', text),
		date : find('on', text)
	};
	request.request.slice[0] = trip;
	request.request.passengers.adultCount = findNumberPreceding('adult', text);
	request.request.passengers.childCount = findNumberPreceding('child', text);
	request.request.passengers.infantLapCount = findNumberPreceding('infant on lap', text) + findNumberPreceding('infants on lap', text);
	request.request.passengers.infantSeatCount = findNumberPreceding('infant', text);
	request.request.passengers.seniorCount = findNumberPreceding('senior', text);
	
	return request;
}

function find(what, text) {
	if (what == undefined) {
		return '';
	} else {
		if (typeof what === 'string' || what instanceof String) {
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
		} else {
			return '';
		}
	}
}

function findNumberPreceding(passengerType, text) {	
	if (passengerType == undefined) {
		return 0;
	} else {
		if (typeof passengerType === 'string' || passengerType instanceof String) {
			var ind = text.indexOf(passengerType);
			if (ind == -1) {
				return 0;
			} else {
				var firstText = text.substring(0, ind);
				var splitText = firstText.split(" ");
				if (splitText.length == 0) {
					return 0;
				} else {
					var num = Number(splitText[splitText.length - 2]);
					return num;
				}
			}
		}
	}
}

function reverse(text) {
	text.split("").reverse().join("");
}
