const fs = require("fs");
const yaml = require("js-yaml");

const config = {
  rinkeby: {
    address: "0xfe41cb708cd98c5b20423433309e55b53f79134a",
    startBlock: 7208800,
  },
  mainnet: {
    address: "0x0ba45a8b5d5575935b8158a88c631e9f9c95a2e5",
    startBlock: 10919653,
  },
};

const network = process.argv.slice(2)[0];

try {
  let fileContents = fs.readFileSync("./subgraph-template.yaml", "utf8");
  let data = yaml.safeLoad(fileContents);

  data.dataSources.forEach((dataSource) => {
    dataSource.network = network;
    dataSource.source.address = config[network].address;
    dataSource.source.startBlock = config[network].startBlock;

    dataSource.network = network;
    dataSource.source.address = config[network].address;
    dataSource.source.startBlock = config[network].startBlock;

    dataSource.network = network;
    dataSource.source.address = config[network].address;
    dataSource.source.startBlock = config[network].startBlock;
  });

  let yamlStr = yaml.safeDump(data);
  fs.writeFileSync("subgraph.yaml", yamlStr, "utf8");

  console.log("Generated subgraph.yaml for " + network);
} catch (e) {
  console.log(e);
}
