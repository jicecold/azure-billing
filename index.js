// import
var config = require("config");
var adal = require("adal-node");
var request = require("request");

// set global variables
var authority = config.get("authority");
var directory = config.get("directory");
var subscription = config.get("subscription");
var clientId = config.get("clientId");
var username = config.get("username");
var password = config.get("password");

// authenticate
var context = new adal.AuthenticationContext(authority + directory);
context.acquireTokenWithUsernamePassword("https://management.core.windows.net/", username, password, clientId, function(error, tokenResponse) {
    if (!error) {
        
        // get the rate card
        var offer = "MS-AZR-0062P";
        var currency = "USD";
        var locale = "en-US";
        var region = "US";
        request.get({
            "uri": "https://management.azure.com/subscriptions/" + subscription + "/providers/Microsoft.Commerce/RateCard?api-version=2015-06-01-preview&$filter=OfferDurableId eq '" + offer + "' and Currency eq '" + currency + "' and Locale eq '" + locale + "' and RegionInfo eq '" + region + "'",
            "headers": {
                "Authorization": "bearer " + tokenResponse.accessToken
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                if (error) { console.log("error(101): " + error) } else { console.log("error(102)"); console.log(body); };
            }
        });
        
        // get the usage
        var start = "2016-05-01";
        var stop = "2016-05-30";
        request.get({
            "uri": "https://management.azure.com/subscriptions/" + subscription + "/providers/Microsoft.Commerce/UsageAggregates?api-version=2015-06-01-preview&reportedStartTime=" + start + "T00%3a00%3a00%2b00%3a00&reportedEndTime=" + stop + "T00%3a00%3a00%2b00%3a00&aggregationGranularity=Daily&showDetails=false",
            "headers": {
                "Authorization": "bearer " + tokenResponse.accessToken
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                if (error) { console.log("error(103): " + error) } else { console.log("error(104)"); console.log(body); };
            }
        });
        
    } else {
        console.log("error(100): " + error);
    }
});