/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "share-tool",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "share-tool",
          region: "eu-west-2",
        },
      },
    };
  }, 
  async run() {
    const domain =
      {
        production: "share.joshmc.dev",
      }[$app.stage] || $app.stage + ".share.joshmc.dev";

    const OpenRouterApiKey = new sst.Secret("OpenRouterApiKey")

    const table = new sst.aws.Dynamo("ShareTable", {
      fields: {
        shareId: "string",
      },
      primaryIndex: { hashKey: "shareId" }
    });

    const ShareApp = new sst.aws.TanStackStart('ShareApp', { link: [table,OpenRouterApiKey], domain, dev: {url: "http://localhost:3000"} })

    return {
      ShareApp: ShareApp.url,
      ShareTable: table.name,
    };
  },
});
