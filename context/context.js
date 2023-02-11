import { createContext, useState, useEffect, useContext } from 'react'
import Web3 from 'web3'
import { Network, Alchemy } from 'alchemy-sdk';
import lotteryContract from '../utils/lottery'
export const appContext = createContext()

export const AppProvider = ({ children }) => {
  const [web3, setWeb3] = useState()
  const [address, setAddress] = useState('')
  const [lcContract, setLcContract] = useState()
  const [lotteryPot, setLotteryPot] = useState()
  const [winnings, setWinnings] = useState()
  const [commission, setCommission] = useState()
  const [lotteryPlayers, setPlayers] = useState([])
  const [lastWinner, setLastWinner] = useState([])
  const [lotteryId, setLotteryId] = useState()
  const [etherscanUrl, setEtherscanUrl] = useState()
  const [playerCount, setPlayerCount] = useState()
  const [lottoStatus, setLottoStatus] = useState()

  useEffect(() => {
    updateLottery()
  }, [lcContract])

  const updateLottery = async () => {
    if (lcContract) {
      try {        
        const pot = await lcContract.methods.getPot().call()
        const lottoId = await lcContract.methods.getlotteryId().call()
        const lcwinnings = await lcContract.methods.winnings(address).call()
        const lccomission = await lcContract.methods.operatorTotalCommission().call()
        const lcPlayerCount = await lcContract.methods.getPlayers().call()

        setLottoStatus(true)

        setPlayerCount(lcPlayerCount.length)

        setWinnings(web3.utils.fromWei(lcwinnings, 'ether'))

        setCommission(web3.utils.fromWei(lccomission, 'ether'))

        setLotteryPot(web3.utils.fromWei(pot, 'ether'))

        setPlayers(await lcContract.methods.getPlayers().call())

        setLotteryId(await lcContract.methods.getlotteryId().call())

        setLastWinner(await lcContract.methods.getWinnerByLottery(lottoId - 1).call())

        console.log([...lastWinner], 'Last Winners')
        console.log(winnings)
        console.log(lcPlayerCount.length)
      } catch (error) {
        console.log(error, 'updateLottery')
      }
    }
  }

  const enterLottery = async () => {
    try {
      console.log('entering lottery')
      await lcContract.methods.enter().send({
        from: address,
        // 0.1 ETH in Wei, 
        value: '1000000000000000000',
        // 0.0003 ETH in Gwei, 3000000
        gas: 300000,
        gasPrice: 70000000000,
      })
      updateLottery()
    } catch (err) {
      console.log(err, 'enter')
    }
  }

  const withdrawWinnings = async () => {
    try {
      console.log('claiming winnings')
      await lcContract.methods.withdrawWinnings().send({
        from: address,
        // 0.015 ETH in Wei, 
        value: '0',
        // 0.0003 ETH in Gwei, 3000000
        gas: 300000,
        gasPrice: 70000000000,
      })
      updateLottery()
    } catch (err) {
      console.log(err, 'claim winnings')
    }
  }

  const withdrawCommission = async () => {
    try {
      console.log('claiming winnings')
      await lcContract.methods.withdrawCommission().send({
        from: address,
        // 0.015 ETH in Wei, 
        value: '0',
        // 0.0003 ETH in Gwei, 3000000
        gas: 300000,
        gasPrice: 70000000000,
      })
      updateLottery()
    } catch (err) {
      console.log(err, 'claim commission')
    }
  }


  const getRandom = async () => {
    try {
      let tx = await lcContract.methods.getRandomNumber().send({
        from: address,
        gas: 400000,
        gasPrice: 70000000000,
      })

      console.log(tx)
      updateLottery()
    } catch (err) {
      console.log(err, 'Get Random')
    }
  }

  const pickWinner = async () => {
    try {
      let tx = await lcContract.methods.pickWinner().send({
        from: address,
        gas: 400000,
        gasPrice: 70000000000,
      })

      console.log(tx)
      updateLottery()
    } catch (err) {
      console.log(err, 'pick Winner')
    }
  }

  const closeLottery = async () => {

    setLottoStatus(false)

    try {
      let random = await lcContract.methods.getRandomNumber().send({
        from: address,
        gas: 400000,
        gasPrice: 70000000000,
      })

      let pick = await lcContract.methods.pickWinner().send({
        from: address,
        gas: 400000,
        gasPrice: 70000000000,
      })

      console.log(random)
      console.log(pick)

      setLottoStatus(true)
      updateLottery()
    } catch (err) {
      console.log(err, 'Pick and Pay Winner')
    }
  }

  const connectWallet = async () => {
  /* check if MetaMask is installed */
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      /* request wallet connection */
      await window.ethereum.request({ method: "eth_requestAccounts"})
      /* create web3 instance & set to state */
      const web3 = new Web3(window.ethereum)
      /* set web3 instance in React state */
      setWeb3(web3)
      /* get list of accounts */
      const accounts = await web3.eth.getAccounts()
      /* set account 1 to React state */
      setAddress(accounts[0])

      /* create local contract copy */
      const lc = lotteryContract(web3)
      setLcContract(lc)

      window.ethereum.on('accountsChanged', async () => {
        const accounts = await web3.eth.getAccounts()
        console.log(accounts[0])
        /* set account 1 to React state */
        setAddress(accounts[0])
      })
    } catch(err) {
      console.log(err.message)
    }
  } else {
    /* MetaMask is not installed */
    console.log("Please install MetaMask")
  }
}
const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
};

const alchemy = new Alchemy(settings);

// Get the latest block
const latestBlock = alchemy.core.getBlockNumber();

// Get all outbound transfers for a provided address
alchemy.core
  .getTokenBalances('0x96C8eDA0813D75ab442cc7107A3964390986a77C')
  .then(console.log);

// Get all the NFTs owned by an address
// const nfts = alchemy.nft.getNftsForOwner("0xshah.eth");

// // Listen to all new pending transactions
// alchemy.ws.on(
//   { method: "alchemy_pendingTransactions",
//   fromAddress: "0xshah.eth" },
//   (res) => console.log(res)
// );

  return (
    <appContext.Provider
      value={{
        address,
        connectWallet,
        lotteryPot,
        winnings,
        withdrawWinnings,
        lotteryPlayers,
        enterLottery,
        pickWinner,
        getRandom,
        lotteryId,
        commission,
        withdrawCommission,
        lastWinner,
        etherscanUrl,
        playerCount,
        closeLottery,
        lottoStatus,
        settings,
        latestBlock
      }}
    >
      {children}
    </appContext.Provider>
  )  

}

export const useAppContext = () => {
  return useContext(appContext)
}


