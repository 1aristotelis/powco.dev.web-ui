import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorage } from "../utils/storage";
import { useRelay } from "./RelayContext";
import { useTwetch } from "./TwetchContext";
import { Script } from "bsv";

const BitcoinContext = createContext(undefined);

const BitcoinProvider = (props) => {
  const [wallet, setWallet] = useLocalStorage(walletStorageKey);
  const [paymail, setPaymail] = useState("");
  const [avatar, setAvatar] = useState("");
  const {
    twetchAuthenticate,
    tokenTwetchAuth,
    twetchSend,
    twetchPaymail,
    twetchLogout,
  } = useTwetch();
  const { relayAuthenticate, relaySend, relayPaymail, relayLogout } =
    useRelay();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    switch (wallet) {
      case "twetch":
        if (tokenTwetchAuth) {
          setPaymail(twetchPaymail);
          setAvatar(
            `https://img.rarecandy.io/resize/width=500,quality=100/https://auth.twetch.app/api/v2/users/${
              twetchPaymail.split("@")[0]
            }/icon`
          );
          setAuthenticated(true);
        } else {
          authenticate();
        }
        break;
      case "relayx":
        if (relayPaymail) {
          setPaymail(relayPaymail);
          setAvatar(`https://bitpic.network/u/${relayPaymail}`);
          setAuthenticated(true);
        }
        break;
      default:
        console.log("no wallet selected");
    }
  }, [tokenTwetchAuth, twetchPaymail, relayPaymail, wallet]);

  const authenticate = async () => {
    switch (wallet) {
      case "twetch":
        twetchAuthenticate();
        break;
      case "relayx":
        relayAuthenticate();
        break;
      default:
        console.log("no wallet selected");
    }
  };

  const send = useCallback(
    async (content, tag, reply_tx) => {
      let resp, outputs;
      let opReturn = [
        "onchain",
        "1HWaEAD5TXC2fWHDiua9Vue3Mf8V1ZmakN",
        tag,
        JSON.stringify({
          reply_tx_id: reply_tx,
          content,
        }),
      ];
      switch (wallet) {
        case "twetch":
          outputs = [
            {
              args: opReturn,
              to: "powco@relayx.io",
              sats: 2180,
            },
          ];
          resp = await twetchSend(outputs);
          break;
        case "relayx":
          outputs = [
            {
              opReturn,
              currency: "BSV",
              amount: 2180 * 1e-8,
              to: "powco@relayx.io",
            },
          ];
          resp = await relaySend(outputs);
          break;
        default:
          console.log("no wallet selected");
          return null;
      }
      return resp;
    },
    [wallet]
  );

  const boost = useCallback(async (txid, value, currency) => {
    let resp, outputs;
    const url = `https://askbitcoin.ai/api/v1/boostpow/${txid}/new?value=${value}&currency=${currency}`;

    console.log("boostpow.job.build", { url });

    let { data } = await axios.get(url);

    console.log("boostpow.payment_request", data);

    const script = new Script(data.outputs[0].script);

    const amount = data.outputs[0].amount; // 100000000;

    console.log(script, amount);
    switch (wallet) {
      case "twetch":
        outputs = [
          {
            args: [
              "onchain",
              "18pPQigu7j69ioDcUG9dACE1iAN9nCfowr",
              "job",
              JSON.stringify({
                index: 0,
              }),
            ],
            to: script.toASM(),
            sats: amount,
          },
          /* {
            to: "powco@relayx.io",
            sats: 2180,
          }, */
        ];
        resp = await twetchSend(outputs);
        break;
      case "relayx":
        outputs = {
          opReturn: [
            "onchain",
            "18pPQigu7j69ioDcUG9dACE1iAN9nCfowr",
            "job",
            JSON.stringify({
              index: 0,
            }),
          ],
          amount: amount / 100000000,
          to: script.toASM(),
          currency: "BSV",
        };
        /* {
            to: "powco@relayx.io",
            amount: 2180 / 100000000,
            currency: "BSV",
          }, */
        resp = await relaySend(outputs);
        break;
      default:
        console.log("no wallet selected");
        return null;
    }
    return resp;
  });

  const logout = () => {
    switch (wallet) {
      case "twetch":
        twetchLogout();
        break;
      case "relayx":
        relayLogout();
        break;
      default:
        console.log("no wallet selected");
    }
    setWallet("");
    localStorage.clear(walletStorageKey);
    setAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      wallet,
      setWallet,
      authenticate,
      send,
      boost,
      authenticated,
      paymail,
      avatar,
      logout,
    }),
    [
      wallet,
      setWallet,
      authenticate,
      send,
      boost,
      authenticated,
      avatar,
      paymail,
      logout,
    ]
  );

  return <BitcoinContext.Provider value={value} {...props} />;
};

const useBitcoin = () => {
  const context = useContext(BitcoinContext);
  if (context === undefined) {
    throw new Error("useBitcoin must be used within a BitcoinProvider");
  }
  return context;
};

export { BitcoinProvider, useBitcoin };

//
// Utils
//

const walletStorageKey = "powdao__BitcoinProvider_wallet";
