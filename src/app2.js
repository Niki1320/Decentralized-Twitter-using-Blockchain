App = {
  loading: false,
  contracts: {},
  //sipfs: window.IpfsApi('localhost', 8080, { protocol: 'http' }),
  load: async () => {
      // Initialize IPFS with local node
      App.ipfs = window.IpfsApi('localhost', 5001, { protocol: 'http' });

      await App.loadWeb3();
      await App.loadAccount();
      await App.loadContract();
      await App.loadUserProfile();
      await App.render();
  },
    loadWeb3: async () => {

      if (window.ethereum) {
        console.log("Metamask Detected");
        window.web3 = new Web3(window.ethereum);
        try {
        $("#msg").text("Please connect your metamask")  
        var res = await ethereum.enable();
        App.network=await web3.eth.net.getNetworkType();
        console.log(App.network);
        } catch (error) {
        $("#generalMsgModal").modal("show");
        $("#generalModalMessage").text("Permission Denied, Metamask Not connected!");
        }
      }

      else {
          console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
          $("#generalMsgModal").modal("show");
          $("#generalModalMessage").html("Non-Ethereum browser detected. You should consider trying MetaMask! <br> <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'>Download Here</a>");
      }
    },

    loadAccount: async () => {
    App.account = await web3.givenProvider.selectedAddress;
    },

    loadContract: async () => {
      
        let abi = [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_user",
                "type": "address"
              }
            ],
            "name": "addMaintainer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "_decision",
                "type": "bool"
              }
            ],
            "name": "advertisementApproval",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address payable",
                "name": "_newOwner",
                "type": "address"
              }
            ],
            "name": "changeOwner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_username",
                "type": "string"
              }
            ],
            "name": "changeUsername",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "claimReportingReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "claimSuitReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_dweetid",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_comment",
                "type": "string"
              }
            ],
            "name": "createComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_hashtag",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_content",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_imghash",
                "type": "string"
              }
            ],
            "name": "createDweet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "deleteComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "deleteDweet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_commentid",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_comment",
                "type": "string"
              }
            ],
            "name": "editComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "_hashtag",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_content",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_imghash",
                "type": "string"
              }
            ],
            "name": "editDweet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "likeDweet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "maintainer",
                "type": "uint256"
              }
            ],
            "name": "logAdvertisementApproved",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "maintainer",
                "type": "uint256"
              }
            ],
            "name": "logAdvertisementRejected",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "hashtag",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "maintainer",
                "type": "uint256"
              }
            ],
            "name": "logDweetBanned",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "userid",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "dweetid",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "hashtag",
                "type": "string"
              }
            ],
            "name": "logDweetCreated",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "hashtag",
                "type": "string"
              }
            ],
            "name": "logDweetDeleted",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "hashtag",
                "type": "string"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "maintainer",
                "type": "uint256"
              }
            ],
            "name": "logDweetFreed",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "string",
                "name": "hashtag",
                "type": "string"
              }
            ],
            "name": "logDweetReported",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              }
            ],
            "name": "logRegisterUser",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              }
            ],
            "name": "logUserBanned",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_imgHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_coverHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_bio",
                "type": "string"
              }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_dweetId",
                "type": "uint256"
              }
            ],
            "name": "reportDweet",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_user",
                "type": "address"
              }
            ],
            "name": "revokeMaintainer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "startDapp",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "stopDapp",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_imgHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "_link",
                "type": "string"
              }
            ],
            "name": "submitAdvertisement",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_dweetId",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "_action",
                "type": "bool"
              }
            ],
            "name": "takeAction",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              }
            ],
            "name": "transferContractBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "stateMutability": "nonpayable",
            "type": "fallback"
          },
          {
            "inputs": [],
            "name": "advertisementCost",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "advertiserAdvertisementsList",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "fakeReportingSuitReward",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "getAd",
            "outputs": [
              {
                "internalType": "address",
                "name": "advertiser",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "imgHash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "link",
                "type": "string"
              },
              {
                "internalType": "enum Dwitter.AdApprovalStatus",
                "name": "status",
                "type": "uint8"
              },
              {
                "internalType": "uint256",
                "name": "expiry",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getAds",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "list",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "getAdvertisementStatus",
            "outputs": [
              {
                "internalType": "enum Dwitter.AdApprovalStatus",
                "name": "status",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "getComment",
            "outputs": [
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "dweetId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "content",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "likeCount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "enum Dwitter.cdStatus",
                "name": "status",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "getDweet",
            "outputs": [
              {
                "internalType": "address",
                "name": "author",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "hashtag",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "content",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "imgHash",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "likeCount",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "getDweetComments",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "list",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getReportedDweets",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "list",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_dweetId",
                "type": "uint256"
              }
            ],
            "name": "getReportedDweetStatus",
            "outputs": [
              {
                "internalType": "enum Dwitter.reportAction",
                "name": "status",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_user",
                "type": "address"
              }
            ],
            "name": "getUser",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "imghash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "coverhash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "bio",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getUser",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "username",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "imghash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "coverhash",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "bio",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_user",
                "type": "address"
              }
            ],
            "name": "getUserComments",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "commentList",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getUserComments",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "commentList",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_user",
                "type": "address"
              }
            ],
            "name": "getUserDweets",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "dweetList",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "getUserDweets",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "dweetList",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "name": "isMaintainer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "myAdvertisements",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "list",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "myReportings",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "list",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address payable",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
              }
            ],
            "name": "reportingClaimStatus",
            "outputs": [
              {
                "internalType": "enum Dwitter.userdweetReportingStatus",
                "name": "status",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "reportingRewardPrice",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "reportingstakePrice",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "stopped",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalAdvertisements",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalComments",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalDweets",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalMaintainers",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalUsers",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "_username",
                "type": "string"
              }
            ],
            "name": "usernameAvailable",
            "outputs": [
              {
                "internalType": "bool",
                "name": "status",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "userReportList",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "userStatus",
            "outputs": [
              {
                "internalType": "enum Dwitter.accountStatus",
                "name": "status",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        
        // App.Rinkeby="0x483EADa90CBBBC571879220325Ce5e487cdA8f44";
        // App.Ropsten="0xB8224485479051c4299449f3570058e3eF783C15";
        // App.Kovan="0x70Cb84cAB67Ab0E8D30A99c08a5D6DD21c585FCa";
        // App.Goerli="0x634CdABb2177491aC07517929E35fBB237086906";

        // if(App.network=="kovan") App.contracts.dwitter = new web3.eth.Contract(abi, App.Kovan);
        // else if(App.network=="rinkeby") App.contracts.dwitter = new web3.eth.Contract(abi, App.Rinkeby);
        // else if(App.network=="ropsten") App.contracts.dwitter = new web3.eth.Contract(abi, App.Ropsten);
        // else if(App.network=="goerli") App.contracts.dwitter = new web3.eth.Contract(abi, App.Goerli);
        // else App.showError("Please Connect to valid network");
        // console.log(App.contracts.dwitter);
        
        App.Deployment="0xd0B4D96cA849Cb9B5fc139474B9F41Fcc562C1E7";
        App.contracts.dwitter = new web3.eth.Contract(abi, App.Deployment);
          console.log("Contract initialized:", App.contracts.dwitter);

        

      },

      loadUserProfile : async () => {
        console.log("App.contracts.dwitter in loadUserProfile:", App.contracts.dwitter); // Add this line
        App.userStatus = await App.contracts.dwitter.methods.userStatus().call({ from: App.account });
        console.log(App.userStatus);
        if(App.userStatus==0){
          console.log("Working Here");
            App.setLoading(true);
            $('#registerModal').modal("show");
            $('#ethAddressForRegisterModal').text(App.account);
            $('#registerBtn').on("click",async ()=>{
              $("#registerModalMsg").text("Processing...");
              let img=$("#profileImg").prop('files')[0];
              let cover=$("#coverImg").prop('files')[0];
              console.log(img);
              const reader1 = new FileReader();
              const reader2 = new FileReader();
              reader1.readAsArrayBuffer(img);
              reader2.readAsArrayBuffer(cover);
              var buf1;
              var buf2;
              reader1.onloadend = async function() {
                 buf1 = buffer.Buffer(reader1.result); // Convert data into buffer
                 console.log(buf1); 
                 reader2.onloadend = async function() {
                  buf2 = await buffer.Buffer(reader2.result); // Convert data into buffer
                  console.log(buf2); 
                  var result1=await App.ipfs.files.add(buf1) // Upload buffer to IPFS
                  var result2=await  App.ipfs.files.add(buf2);
                  console.log(buf1);
                  console.log(buf2);
                  console.log(result1[0].hash);
                  console.log(result2[0].hash);
                  await App.contracts.dwitter.methods.registerUser($("#username").val(),$("#name").val(),result1[0].hash,result2[0].hash,$("#bio").val()).send({from:App.account});
                  $('#registerModal').modal("hide");
                  App.setLoading(false);
                  location.reload();
                }
              }
            });
        }else if(App.userStatus==2){
          App.showError("Your Account Has been Banned due Violations of the Platform");
        }
        else if(App.userStatus==3){
          App.showError("Your Account Has been Deleted");
        }
        else{
        App.user=await App.contracts.dwitter.methods.getUser().call({from:App.account});
        $("#account").text(App.account);
        $("#fullname").text(App.user.name);
        $("#username").text(App.user.username);
        $("#userBio").text(App.user.bio);
        $("#userProfileImage").css("background-image", "url( https://ipfs.io/ipfs/" + App.user.imghash+ ")");;
        $("#userCoverImage").css("background-image", "url( https://ipfs.io/ipfs/" + App.user.coverhash+ ")");;

        }
      },



    checkUser: async ()=>{

      let isMaintainer=await App.contracts.dwitter.methods.isMaintainer(App.account).call({from:App.account});
      console.log(isMaintainer);
      if(!isMaintainer){
        App.setLoading(true);
        $("#generalMsgModal").modal("show");
        $("#generalModalMessage").text("You are not a Maintainer or Owner, Access Denied!");
      }

    } , 
    render: async () => {
        // Prevent double render
        if (App.loading) {
          return;
        }
    
        // Update app loading state
        App.setLoading(true);
    
        // Render Tasks
        await App.renderData();
    
        // Update loading state
        App.setLoading(false);
    },

    renderData:async()=>{
      let totalDweets=await App.contracts.dwitter.methods.totalDweets().call({from:App.account});
      let totalUsers=await App.contracts.dwitter.methods.totalUsers().call({from:App.account});
      $("#totalUsers").text(totalUsers);
      $("#totalDweets").text(totalDweets);
      await App.renderReports();
      await App.renderAdvertisements();
    },
    renderReports:async()=>{
      try{
        let ReportsList=await App.contracts.dwitter.methods.getReportedDweets().call({from:App.account});
        $("#totalReports").text(ReportsList.length);
        for(var i=0;i<ReportsList.length;i++){
          let status=await App.contracts.dwitter.methods.getReportedDweetStatus(ReportsList[i]).call({from:App.account});
          if(status==0){
            let html=`<tr><td> `+ReportsList[i]+`</td>
         <td><button type="button" class="btn-warning viewdweet" id="`+ReportsList[i]+`">View</button></td>
         <td>
            <button type="button" class="btn-success ban" id="`+ReportsList[i]+`">Ban</button>
            <button type="button" class="btn-danger free" id="`+ReportsList[i]+`">Free</button>
         </td></tr>`;
            $("#reportsTbody").prepend(html);
          }else if(status==1){
            let html=`<tr><td> `+ReportsList[i]+`</td>
            <td><button type="button" class="btn-warning viewdweet" id="`+ReportsList[i]+`">View</button></td>
            <td>
               Banned
            </td></tr>`;
               $("#reportsTbody").append(html);
          }
          else{
            let html=`<tr><td> `+ReportsList[i]+`</td>
            <td><button type="button" class="btn-warning viewdweet" id="`+ReportsList[i]+`">View</button></td>
            <td>
               Free
            </td></tr>`;
               $("#reportsTbody").append(html);
          }
        }
      }catch(e){
        $("#generalMsgModal").modal("show");
        $("#generalModalMessage").text("Error! You are not a user of this Platform! Please Register to Continue");
        App.setLoading(true);
        // App.load();
      }

      $(".ban").on("click",async (e)=>{
        let dweetId=e.currentTarget.id;
        await App.contracts.dwitter.methods.takeAction(dweetId,true).send({from:App.account});
      });
  
      $(".free").on("click",async (e)=>{
        let dweetId=e.currentTarget.id;
        await App.contracts.dwitter.methods.takeAction(dweetId,false).send({from:App.account});
      });
  
      
      $(".viewdweet").on("click",async (e)=>{
        let dweetId=e.currentTarget.id;
        console.log(dweetId);
        let dweet=await App.contracts.dwitter.methods.getDweet(dweetId).call({from:App.account});
        $("#reportedDweetModal").modal("show");
        $("#dweetTag").text(dweet.hashtag);
        $("#dweetImage").attr("src","https://ipfs.io/ipfs/" + dweet.imgHash);
        $("#dweetContent").text(dweet.content);
      });
    

    },

    renderAdvertisements:async()=>{
      let advertisementsList=await App.contracts.dwitter.methods.getAds().call({from:App.account});
      $("#totalAdvertisements").text(advertisementsList.length);
      try{
      for(var i=0;i<advertisementsList.length;i++){
        let status=await App.contracts.dwitter.methods.getAdvertisementStatus(advertisementsList[i]).call({from:App.account});
        if(status==0){
          let html=`<tr><td> `+advertisementsList[i]+`</td>
       <td><button type="button" class="btn-warning viewad" id="`+advertisementsList[i]+`">View</button></td>
       <td>
          <button type="button" class="btn-success accept" id="`+advertisementsList[i]+`">Accept</button>
          <button type="button" class="btn-danger reject" id="`+advertisementsList[i]+`">Reject</button>
       </td></tr>`;
          $("#advertisementsTbody").prepend(html);
        }else if(status==1){
          let html=`<tr><td> `+advertisementsList[i]+`</td>
          <td><button type="button" class="btn-warning viewad" id="`+advertisementsList[i]+`">View</button></td>
          <td>
            Accepted
          </td></tr>`;
             $("#advertisementsTbody").append(html);
        }
        else{
          let html=`<tr><td> `+advertisementsList[i]+`</td>
          <td><button type="button" class="btn-warning viewad" id="`+advertisementsList[i]+`">View</button></td>
          <td>
             Rejected
          </td></tr>`;
             $("#advertisementsTbody").append(html);
        }
      }

      }catch(e){
        $("#generalMsgModal").modal("show");
        $("#generalModalMessage").text("Error! You are not a user of this Platform! Please Register to Continue");
        App.setLoading(true);
        // App.load();
      }

      $(".accept").on("click",async (e)=>{
        let adId=e.currentTarget.id;
        await App.contracts.dwitter.methods.advertisementApproval(adId,true).send({from:App.account});
      });

      $(".reject").on("click",async (e)=>{
        let adId=e.currentTarget.id;
        await App.contracts.dwitter.methods.advertisementApproval(adId,false).send({from:App.account});
      });

      $(".viewad").on("click",async (e)=>{
        let adId=e.currentTarget.id;
        console.log(adId);
        let ad=await App.contracts.dwitter.methods.getAd(adId).call({from:App.account});
        $("#advertisementModal").modal("show");
        $("#adLink").text(ad.link);
        $("#adImage").attr("src","https://ipfs.io/ipfs/" + ad.imgHash);
      });

    },
    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $("#loader");
        const content = $("#content");
        if (boolean) {
          loader.show();
          // content.hide();
        } else {
          loader.hide();
          // content.show();
        }
  },

  showError:async(msg)=>{
    $("#generalMsgModal").modal("show");
    $("#generalModalMessage").text(msg);
  },

  maintainerSettings:async()=>{
    let owner=await App.contracts.dwitter.methods.owner().call({from:App.account});
    if(App.account.toLowerCase()==owner.toLowerCase()){
      $("#maintainerModal").modal("show");
      $("#addMaintainerBtn").on("click",async()=>{
        let address=$("#maintainerAddress").val();
        await  App.contracts.dwitter.methods.addMaintainer(address).send({from:App.account});
        $("#MaintainerModalMsg").text("Success, Maintainer Added Successfully")
      });

      $("#removeMaintainerBtn").on("click",async()=>{
        let address=$("#maintainerAddress").val();
        await  App.contracts.dwitter.methods.revokeMaintainer(address).send({from:App.account});
        $("#MaintainerModalMsg").text("Success, Maintainer Removed Successfully")
      });
      
    }else{
      $("#generalMsgModal").modal("show");
      $("#generalModalMessage").text("Access Denied!!! You are not Owner of this Platform");
    }
  },

  withdrawContractFunds:async()=>{
    let owner=await App.contracts.dwitter.methods.owner().call({from:App.account});
    console.log(owner);
    console.log(App.account);
    if(App.account.toLowerCase()==owner.toLowerCase()){
      $("#contractBalanceModal").modal("show");
      let balance=await App.contracts.dwitter.methods.getBalance().call({from:App.account});
      $("#contractBalance").text(balance);
  
      $("#WithdrawContractBalance").on("click", async()=>{
         let amount=$("#fundsWithdrawAmount").val();
         await App.contracts.dwitter.methods.transferContractBalance(amount).send({from:App.account});
        let balance=await App.contracts.dwitter.methods.getBalance().call({from:App.account});
        $("#contractBalance").text(balance);
      });
      
    }else{
      $("#generalMsgModal").modal("show");
      $("#generalModalMessage").text("Access Denied!!! You are not Owner of this Platform");
    }
  }

 

 


};

$(() => {
  $(window).on("load",() => {
    App.load();
    $("#fundsBtn").on("click",App.withdrawContractFunds);
    $("#maintainerBtn").on("click",App.maintainerSettings);

  });
});