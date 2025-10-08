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
    const ShareApp = new sst.aws.TanStackStart('ShareApp')
    return { 
      ShareApp: ShareApp.url,
    };
  },
});
