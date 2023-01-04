import { useAppContext } from '../context/context'
import style from '../styles/Header.module.css'
import WalletCard from './WalletCard'
import WalletConnectBtn from './WalletConnectBtn'
const Header = () => {
  const { address, connectWallet } = useAppContext()
  return (
    <div className={style.wrapper}>
      <div className={style.title}>H.N.I.C. Lottery </div>
      {!address ? (
        <WalletConnectBtn connectWallet={connectWallet} />
      ) : (
        <WalletCard address={address} />
      )}
    </div>
  )
}
export default Header
