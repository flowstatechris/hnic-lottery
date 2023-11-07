import { getRandomResult, percentage,getlotteryId, getPlayerBalance, getWinnerByLottery, getPot, getPlayers, getLink, enter, checkWinningsAmount, checkCommissionAmount } from './AdminFunctions';
import TableRow from './TableRow';

const [result, setResult] = useState(0.75);
const [percentage, setPercentage] = useState((result * 100).toFixed(2));


const randomResult = getRandomResult();
export function getRandomResult() {
    return randomResult;
  }
  
  export function getlotteryId() {
    return lotteryId;
  }
  
  export function getWinnerByLottery(lottery) {
    return lotteryHistory[lottery];
  }
  
  export function getPot() {
    return lottoPot;
  }
  
  export function getPlayers() {
    return players;
  }
  
  export function getLink() {
    return link.balanceOf(address(this));
  }
  
  export function enter() {
    require(msg.value > .01 ether);
  
    players.push(payable(msg.sender));
    lottoPot += msg.value;
  }
  
  export function checkWinningsAmount() {
    return winnings[msg.sender];
  }
  
  export function checkCommissionAmount() {
    return operatorTotalCommission;
  }

   //**************************************** 
   //Add function for Player Balance Function added to Lottery.sol
    export function getPlayerBalance() {
        return getPlayerBalance[_msgSender()].balance;
    }

  
  
  
  // Newer export block
  
  function AdminFunctions() {
    const [result, setResult] = useState(0.75);
    const [percentage, setPercentage] = useState((result * 100).toFixed(2) + '%');
    const players = getPlayers();
  
    return (
      <ul className={styles.list}>
      <li>Random Result: {getRandomResult()}</li>
      <li>Lottery ID: {getlotteryId()}</li>
      <li>Winner By Lottery: {getWinnerByLottery(1)}</li>
      <li>Pot: {getPot()}</li>
      <li>Random Result: {getRandomResult()}</li>
      <li>Lottery ID: {getlotteryId()}</li>
      <li>Winner By Lottery: {getWinnerByLottery(1)}</li>
      <li>Pot: {getPot()}</li>
      <li>Players: {getPlayers().join(', ')}</li>
      <li>Link Balance: {getLink()}</li>
      <li>Commission Amount: {checkCommissionAmount()}</li>
      <li>
        Result: {result}<br />
        Percentage: {percentage}<br />
        <input type="number" value={result} onChange={(e) => {
          setResult(e.target.value);
          setPercentage((e.target.value * 100).toFixed(2) + '%');
        }} />
      </li>
      <li>Players:</li>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            <div className={styles.player}>
              <TableRow player={player} />
              <span>{checkWinningsAmount()}</span>
            </div>
          </li>
        ))}
      </ul>
      <li>Link Balance: {getLink()}</li>
      <li>Commission Amount: {checkCommissionAmount()}</li>
      <li>
        Result: {result}<br />
        Percentage: {percentage}<br />
        <input type="number" value={result} onChange={(e) => {
          setResult(e.target.value);
          setPercentage((e.target.value * 100).toFixed(2) + '%');
        }} />
      </li>
    </ul>
    );
  }
  