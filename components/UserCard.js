import style from '../styles/PotCard.module.css'
import { useAppContext } from '../context/context'
import truncateEthAddress from 'truncate-eth-address'

const UserCard = () => {
  const { address, winnings, withdrawWinnings, checkWinnings} =
    useAppContext()

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        User: {' '}
        <span className={style.textAccent}>{truncateEthAddress(address)}</span>
      </div>
      <div className={style.pot}>
        Current Winnings: <span className={style.goldAccent}> {winnings} MATIC </span>
      </div>
        {winnings != 0 ? (
       (
        <div className={style.btn} onClick={withdrawWinnings}>
            Claim Winnings
        </div>
      )
      ) : (
        <div className={style.btn}> No winnings to claim </div>
      )}  
    </div>
  )
}
export default UserCard

