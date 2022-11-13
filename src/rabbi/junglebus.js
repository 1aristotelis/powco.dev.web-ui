import {
  JungleBusClient,
  ControlMessageStatusCode,
} from "@gorillapool/js-junglebus";

const client = new JungleBusClient("junglebus.gorillapool.io", {
  useSSL: true,
  onConnected(ctx) {
    console.log("CONNECTED", ctx);
  },
  onConnecting(ctx) {
    console.log("CONNECTING", ctx);
  },
  onDisconnected(ctx) {
    console.log("DISCONNECTED", ctx);
  },
  onError(ctx) {
    console.error(ctx);
  },
});

const onPublish = function (tx) {
  console.log("TRANSACTION", tx);
};
const onStatus = function (message) {
  if (message.statusCode === ControlMessageStatusCode.BLOCK_DONE) {
    console.log("BLOCK DONE", message.block);
  } else if (message.statusCode === ControlMessageStatusCode.WAITING) {
    console.log("WAITING FOR NEW BLOCK...", message);
  } else if (message.statusCode === ControlMessageStatusCode.REORG) {
    console.log("REORG TRIGGERED", message);
  } else if (message.statusCode === ControlMessageStatusCode.ERROR) {
    console.error(message);
  }
};
const onError = function (err) {
  console.error(err);
};
const onMempool = function (tx) {
  console.log("TRANSACTION", tx);
};

export async function startJungleBus() {
  await client.Subscribe(
    "a60f41e30acdb17bb7a601cad47e98542fc0d482036fa10fe7bcd56846d31428",
    760000,
    onPublish,
    onStatus,
    onError,
    onMempool
  );
}
