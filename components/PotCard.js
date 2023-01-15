import style from '../styles/PotCard.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useAppContext } from '../context/context'
const PotCard = () => {
  const { lotteryId, lastWinner, lotteryPot, enterLottery, address, pickWinner, getRandom} =
    useAppContext()

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        Lottery {' '}
        <span className={style.textAccent}>#{lotteryId ? lotteryId : '1'}</span>
      </div>
      <div className={style.pot}>
        Pot 🍯: <span className={style.goldAccent}>{lotteryPot} MATIC </span>
      </div>
      <div className={style.recentWinnerTitle}>🏆  Last Winner  🏆</div>
      {(lastWinner == "0x0000000000000000000000000000000000000000") ? (
        <div className={style.winner}>No winners yet</div>
      ) : (
        lastWinner.length > 0 && (
          <div className={style.winner}>
            {truncateEthAddress(lastWinner)}
          </div>
        )
      )}
      <div className={style.btn} onClick={enterLottery}>
        Enter: 1 MATIC
      </div>
      {(address == "0x96C8eDA0813D75ab442cc7107A3964390986a77C") ? (
        <><div className={style.btn} onClick={getRandom}>
          Get Random Number
        </div><div className={style.btn} onClick={pickWinner}>
            Pick Winner!
          </div></>
          
      ) : (
        (address != "0x96C8eDA0813D75ab442cc7107A3964390986a77C")
      )}
    </div>
  )
}
export default PotCard
