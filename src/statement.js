function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  function calculateTragedyAmount(thisAmount, perf) {
    thisAmount = 40000;
    if (perf.audience > 30) {
      thisAmount += 1000 * (perf.audience - 30);
    }
    return thisAmount;
  }

  function calculateComedyAmount(thisAmount, perf) {
    thisAmount = 30000;
    if (perf.audience > 20) {
      thisAmount += 10000 + 500 * (perf.audience - 20);
    }
    thisAmount += 300 * perf.audience;
    return thisAmount;
  }

  function calculateVolumeCredits(perf, play) {
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);
  }

  function generateOrder(play, thisAmount, perf) {
    return ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
  }

  function generateCreditsInfo(volumeCredits) {
    return `You earned ${volumeCredits} credits \n`;
  }

  function generateAmountOwedInfo(totalAmount) {
    return `Amount owed is ${format(totalAmount / 100)}\n`;
  }

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
      case 'tragedy':
        thisAmount = calculateTragedyAmount(thisAmount, perf);
        break;
      case 'comedy':
        thisAmount = calculateComedyAmount(thisAmount, perf);
        break;
      default:
        throw new Error(`unknown type: ${play.type}`);
    }
    calculateVolumeCredits(perf, play);
    //print line for this order
    result += generateOrder(play, thisAmount, perf);
    totalAmount += thisAmount;
  }
  result += generateAmountOwedInfo(totalAmount);
  result += generateCreditsInfo(volumeCredits);
  return result;
}

module.exports = {
  statement,
};
