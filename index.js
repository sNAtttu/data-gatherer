const { CosmosClient } = require("@azure/cosmos");

const config = require("./config");
const { createDatabase } = require("./context/actions-database-context");
const { execute } = require("./actions/wifi-speed-test");
const { endpoint, key, databaseId, containerId } = config;
const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

// Make sure Tasks database is already setup. If not, create it.
createDatabase(client, databaseId, containerId)
    .then(() => {
        execute()
            .then(async result => {
                // Store the test result to the cosmos db
                await container.items.create(result);
            });
    });


