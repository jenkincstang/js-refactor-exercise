function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = generateCustomerInfo(invoice, "plain");
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  function generateCustomerInfo(invoice, type) {
    if (type==="plain")return `Statement for ${invoice.customer}\n`;
    if (type==="plain")return `<h1>Statement for ${invoice.customer}</h1>\n`;
    return null;
  }

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
    return volumeCredits;
  }

  function generateOrderInfo(play, thisAmount, perf, type) {
    if (type==="plain")return ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    if (type==="html")return ` <tr><td>${play.name}</td><td>${perf.audience}</td><td>${format(thisAmount / 100)}</td></tr>\n`;
    return null;
  }

  function generateCreditsInfo(volumeCredits, type) {
    if (type==="plain")return `You earned ${volumeCredits} credits \n`;
    if (type==="html")return `<p>You earned <em>${volumeCredits}</em> credits</p>\n`;
    return null;
  }

  function generateAmountOwedInfo(totalAmount, type) {
    if (type==="plain")return `Amount owed is ${format(totalAmount / 100)}\n`;
    if (type==="html")return `<p>Amount owed is <em>${format(totalAmount / 100)}</em></p>\n`;
    return null;
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
    volumeCredits = calculateVolumeCredits(perf, play);
    //print line for this order
    result += generateOrderInfo(play, thisAmount, perf, "plain");
    totalAmount += thisAmount;
  }
  result += generateAmountOwedInfo(totalAmount, "plain");
  result += generateCreditsInfo(volumeCredits, "plain");
  return result;
}

module.exports = {
  statement,
};
