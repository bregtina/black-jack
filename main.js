const getRandomCard = () => {
  const facesArray = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
    'Ace',
  ];
  const suitsArray = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
  const setOfCards = new Set();

  const randomFace = Math.floor(Math.random() * facesArray.length);
  const randomSuit = Math.floor(Math.random() * suitsArray.length);

  const face = facesArray[randomFace];
  const suit = suitsArray[randomSuit];

  const str = face + suit;

  if (setOfCards.has(str)) {
    return getRandomCard();
  } else {
    setOfCards.add(str);

    const obj = { card: face, suit: suit };
    return obj;
  }
};

const logStart = (playerHand, playerScore, dealerHand, dealerScore) => {
  log('Starting Player Hand: ', playerHand);
  log('Starting Player Score: ', playerScore);
  log('Starting Dealer Hand: ', dealerHand);
  log('Starting Dealer Score', dealerScore);
};

const logEnd = (playerHand, playerScore, dealerHand, dealerScore) => {
  log('Ending Player Hand: ', playerHand);
  log('Ending Player Score: ', playerScore);
  log('Ending Dealer Hand: ', dealerHand);
  log('Ending Dealer Score: ', dealerScore);
};

const playerWins = (playerScore, dealerScore) => {
  log(
    `YOU WIN! Your final score was: ${playerScore} while the dealer had ${dealerScore}`
  );
};

const dealerWins = (playerScore, dealerScore) => {
  log(
    `YOU LOSE! Your final score was: ${playerScore} while the dealer had ${dealerScore}`
  );
};

const getScore = (handsArray) => {
  let total = handsArray.reduce((total, { card }) => {
    if (card === 'Jack' || card === 'Queen' || card === 'King') {
      card = '10';
    }
    if (card === 'Ace') {
      card = '11';
    }
    return total + Number(card);
  }, 0);

  if (total > 21 && handsArray.find(({ card }) => card === 'Ace')) {
    total -= 10;
  }

  return total;
};
const log = (message, func = '') => {
  return console.log(message, func);
};

function startGame() {
  const playerHand = [getRandomCard(), getRandomCard()];
  const dealerHand = [getRandomCard(), getRandomCard()];

  let playerScore = getScore(playerHand);
  let dealerScore = getScore(dealerHand);

  //////////////////////////////////////////////////////////

  logStart(playerHand, playerScore, dealerHand, dealerScore);

  do {
    if (playerScore === 21) {
      playerWins(playerScore, dealerScore);
      break;
    }

    if (playerScore > 21 || dealerScore === 21) {
      dealerWins(playerScore, dealerScore);
      break;
    }

    playerHand.push(getRandomCard());
    playerScore = getScore(playerHand);

    if (playerScore === 21) {
      playerWins(playerScore, dealerScore);
      break;
    }

    if (playerScore > 21 || dealerScore === 21) {
      dealerWins(playerScore, dealerScore);
      break;
    }

    dealerHand.push(getRandomCard());
    dealerScore = getScore(dealerHand);

    if (dealerScore === 21) {
      dealerWins(playerScore, dealerScore);
      break;
    }

    if (dealerScore > 21) {
      playerWins(playerScore, dealerScore);
      break;
    }
  } while (playerScore < 21);

  logEnd(playerHand, playerScore, dealerHand, dealerScore);

  ////////////////////////////////////////////////////////////
}

startGame();
