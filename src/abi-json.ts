const schema = {
    "name": "Sapience",
    "hostname": "sapience.space",
    "endpoint": "api.twetch.app/v1/publish",
    "actions": {
      "sapience/post@0.0.1": {
        "type": "post",
        "contentIndex": 1,
        "contentTypeIndex": 2,
        "encodingIndex": 3,
        "filenameIndex": 4,
        "args": [
          {
            "name": "bNamespace",
            "type": "Address",
            "value": "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut"
          },
          {
            "name": "bContent",
            "encodingIndex": 3
          },
          {
            "name": "bContentType",
            "type": "String",
            "defaultValue": "text/plain"
          },
          {
            "name": "bEncoding",
            "type": "String",
            "defaultValue": "text"
          },
          {
            "name": "bFilename",
            "type": "String",
            "defaultValue": "sapience.txt"
          },
          {
            "name": "pipe",
            "type": "String",
            "value": "|"
          },
          {
            "name": "mapNamespace",
            "type": "Address",
            "value": "1PuQa7K62MiKCtssSLKy1kh56WWU7MtUR5"
          },
          {
            "name": "mapAction",
            "type": "String",
            "value": "SET"
          },
          {
            "name": "mapTwdataKey",
            "type": "String",
            "value": "twdata_json"
          },
          {
            "name": "mapTwdata",
            "type": "String",
            "defaultValue": "null"
          },
          {
            "name": "mapUrlKey",
            "type": "String",
            "value": "url"
          },
          {
            "name": "mapUrl",
            "type": "String",
            "defaultValue": "null"
          },
          {
            "name": "mapCommentKey",
            "type": "String",
            "value": "comment"
          },
          {
            "name": "mapComment",
            "type": "String",
            "defaultValue": "null"
          },
          {
            "name": "mapPaymailKey",
            "type": "String",
            "value": "paymail"
          },
          {
            "name": "mapPaymail",
            "type": "paymail",
            "replaceValue": "#{myPaymail}"
          },
          {
            "name": "mapReplyKey",
            "type": "String",
            "value": "reply"
          },
          {
            "name": "mapReply",
            "type": "String",
            "defaultValue": "null"
          },
          {
            "name": "mapTypeKey",
            "type": "String",
            "value": "type"
          },
          {
            "name": "mapType",
            "type": "String",
            "defaultValue": "post"
          },
          {
            "name": "mapTimestampKey",
            "type": "String",
            "value": "timestamp"
          },
          {
            "name": "mapTimestamp",
            "type": "String",
            "defaultValue": "null"
          },
          {
            "name": "mapAppKey",
            "type": "String",
            "value": "app"
          },
          {
            "name": "mapApp",
            "type": "String",
            "value": "sapience"
          },
          {
            "name": "mapCmdSeparator",
            "type: ": "string",
            "value": ":::"
          },
          {
            "name": "mapAction2",
            "type": "string",
            "value": "ADD"
          },
          {
            "name": "mapTagsKey",
            "type": "String",
            "value": "tag"
          },
          {
            "name": "mapTag",
            "type": "String",
            "defaultValue": "null"
          },
          {
            "name": "pipe2",
            "type": "String",
            "value": "|"
          },
          {
            "name": "aipNamespace",
            "type": "Address",
            "value": "15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva"
          },
          {
            "name": "aipSigningAlgorithm",
            "type": "String",
            "value": "BITCOIN_ECDSA"
          },
          {
            "name": "aipSigningAddress",
            "type": "Address",
            "replaceValue": "#{myAddress}"
          },
          {
            "name": "aipSignature",
            "type": "Signature",
            "replaceValue": "#{mySignature}",
            "messageStartIndex": 0,
            "messageEndIndex": 27,
            "addressIndex": 31
          }
        ]
      },
      "sapience/like@0.0.1": {
        "type": "like",
        "args": [
          {
            "name": "namespace",
            "type": "Address",
            "value": "1LoveF7qQijpjascPytHor2uSEEjHHH8YB"
          },
          {
            "name": "postTransaction",
            "type": "String"
          },
          {
            "name": "app",
            "type": "String",
            "value": "sapience"
          },
          {
            "name": "invoice",
            "type": "String",
            "replaceValue": "#{invoice}"
          },
          {
            "name": "pipe",
            "type": "String",
            "value": "|"
          },
          {
            "name": "aipNamespace",
            "type": "Address",
            "value": "15PciHG22SNLQJXMoSUaWVi7WSqc7hCfva"
          },
          {
            "name": "aipSigningAlgorithm",
            "type": "String",
            "value": "BITCOIN_ECDSA"
          },
          {
            "name": "aipSigningAddress",
            "type": "Address",
            "replaceValue": "#{myAddress}"
          },
          {
            "name": "aipSignature",
            "type": "Signature",
            "replaceValue": "#{mySignature}",
            "messageStartIndex": 0,
            "messageEndIndex": 3,
            "addressIndex": 7
          }
        ]
      }
    }
  }

export default schema