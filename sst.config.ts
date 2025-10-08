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
          region: "eu-west-2",
        }, 
      },
    };
  },
  async run() {
    const table = new sst.aws.Dynamo("ShareTable", {
      fields: {
        shareId: "string",
      },
      primaryIndex: { hashKey: "shareId" }
    }); 
    const ShareApp = new sst.aws.TanStackStart('ShareApp', { link: [table] })
    return { 
      ShareApp: ShareApp.url,
      ShareTable: table,
    };
  },
});
