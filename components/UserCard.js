import style from '../styles/PotCard.module.css'
import { useAppContext } from '../context/context'
import truncateEthAddress from 'truncate-eth-address'

const UserCard = () => {
  const { address, winnings, withdrawWinnings, commission, withdrawCommission} =
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
      {(address == "0x96C8eDA0813D75ab442cc7107A3964390986a77C") ? (
        <><div className={style.pot}>
        Commission Amount: <span className={style.goldAccent}> {commission} MATIC </span>
      </div>
          <div className={style.btn} onClick={withdrawCommission}>
            Withdraw Commission
          </div></>
      ) : (
        (address != "0x96C8eDA0813D75ab442cc7107A3964390986a77C")
      )}  
    </div>
  )
}
export default UserCard

