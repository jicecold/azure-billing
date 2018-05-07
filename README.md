# Azure Billing

This pulls a rate card and the usage data from a subscription for a specified period of time. Note that not all subscription types (most notably enterprise subscriptions) are not supported by this API.

## Usage

1. Install Node.js and install dependencies (ie. npm install).
2. Install the Azure CLI 2.0.
3. Login using the Azure CLI.
4. Select the appropriate subscription using the Azure CLI.
5. Look in the Azure portal under "Subscriptions" to get the offer type of the subscription (this is not currently exposed by API).
6. Run the application.

Example:

```bash
az login
az account set --subscription 1111111-2222-3333-4444-555555555555
node billing --offer MS-AZR-0036P --from 2018-04-30 --to 2018-05-02
```

## Notes

* The parameters "offer", "from", and "to" are all required.
* A rate card can take several minutes to download so it is saved as "<offer>.rates" and then that saved file is used. You must delete it to pull new rates.
* The API queries the data set by when entries are reported but aggregates the data by when they were used. Due to this discrepency, this tool fetches data 1 day before and 2 days after you requested by report date and then filters to the usage dates.