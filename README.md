# Azure Billing

This sample shows how to query for billing information in Azure.

## Configuration

* Create a Log Analytics resource in Azure and point it to your OMS instance (or create a new OMS instance).
* Create a Azure AD Web App and grant it READER rights on the subscription.
* Rename the config/sample.default.json to config/default.json.
* Put all the connectivity information into the config/default.json file.

## Execution

* node index.js