This "Serverless" Slack bot is built with nodejs and StdLib. Some of the functions
and utilities were provided via StdLib.

# Functions

There are several functions in this Slack Bot. See the `/functions/` directory
your StdLib function directory which maps directly to HTTP endpoints.

- `__main__.js` 

    -- main endpoint     
    -- can be reached via `https://ishnark.lib.id/slack-app@dev/main`     
    -- provudes "Add to Slack" button, so app can be distributed
    
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

