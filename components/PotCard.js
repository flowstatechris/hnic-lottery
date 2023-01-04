import style from '../styles/PotCard.module.css'
import truncateEthAddress from 'truncate-eth-address'
import { useAppContext } from '../context/context'
const PotCard = () => {
  const { lotteryId, lastWinner, lotteryPot, enterLottery, address, pickWinner} =
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
        Enter: 0.1 MATIC
      </div>
      {(address == "0x74D65e1D49e3d79167C2c99dAA16D154D8cB832f") ? (
        <div className={style.btn} onClick={pickWinner}>
          Pick Winner!
          </div>
      ) : (
        (address != "0x74D65e1D49e3d79167C2c99dAA16D154D8cB832f")
      )}
    </div>
  )
}
export default PotCard
