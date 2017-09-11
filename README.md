# Project and Purpose

The main purpose of this project is to provide a bot that a user can use to find flights
and potentially make travel plans. Users should be able to provide the necessary 
information in normal English, and the bot should make inferences of its own to find flight 
info. This entails that the bot should somehow be able to understand text, and that the bot 
should have access to flight data. For the latter, the we will access Google's QPX Express 
API, which is a RESTful API that provides real time flight data. It's possible that for the
understanding of text, NLP algorithms may be utilized.

This "Serverless" Slack bot is built with nodejs and StdLib. Some of the functions
and utilities were provided via StdLib (through a `npm install lib.cli -g` on cmd line,
followed by `$ mkdir stdlib`, `$ cd stdlib`, and `$ lib init`.

# Current State [09/09/17]

As of right now, the bot currently has a Slash command '/flight' which can understand
"/flight from BOS to LAX on 2017-09-12 for 1 adult" and return a JSON that looks like
the request JSON that will be understood by the QPX API (something like the following):

{
"request":
    {
        "slice":
            \[
                {
                    "origin":"BOS",
                    "destination":"LAX",
                    "date":"2017-09-12"
                }
            ],
        "passengers":      
            {
                "adultCount":"1",
                "childCount":0,
                "infantLapCount":0,
                "infantSeatCount":0,
                "seniorCount":0
            },
        "solutions":20,
        "refundable":false
    }
}

This was achieved by simple string searching in JS and is very much hard coded to look for
keywords like "from", "to", "on", "for", to understand origin, destination, date, and passenger
info, respectively. (Still facing some issues regarding making the actual POST request to the API)


# Functions

There are several functions in this Slack Bot. See the `/functions/` directory
your StdLib function directory which maps directly to HTTP endpoints.

- `__main__.js` 

    -- main endpoint     
    -- can be reached via `https://ishnark.lib.id/slack-app@dev/main`     
    -- provides "Add to Slack" button, so app can be distributed
    
- `auth.js`

    -- OAuth endpoint    
    -- This endpoint processes an OAuth request and returns the contents of
       `slack/pages/auth.ejs`
       
- `commands/__main__.js`

    -- **Command Handler** function for Slack Slash Commands    
    -- triggered by slack at: `https://ishnark.lib.id/slack-app@dev>/commands/:bg`
    
- `events/__main__.js`

    -- **Event Handler** function for Slack Event API    
    -- triggered by slack at: `https://ishnark.lib.id/slack-app@dev>/events/:bg`
    
- `actions/__main__.js`

    -- **Action Handler** function for handling Slack Actions from messages    
    -- triggered by slack at: `https://ishnark.lib.id/slack-app@dev>/actions/:bg`.

# Utilities

This Slack App template comes with some utility function in `slack/utils`.

- message.js          - send messages to users or channels
- update_message.js   - update messages in channels
- respond.js          - like message, but does HTTP POST message to webhook endpoint
- upload.js           - upload files to a channel

