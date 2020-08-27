const test = require('ava');
const {statement} = require('../src/statement');
const {statementHtml} = require('../src/statement');
test('Sample test', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 55,
            },
            {
                'playID': 'as-like',
                'audience': 35,
            },
            {
                'playID': 'othello',
                'audience': 40,
            },
        ],
    };

    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statement(invoice, plays);
    //then
    t.is(result, 'Statement for BigCo\n'
        + " Hamlet: $650.00 (55 seats)\n"
        + " As You Like It: $580.00 (35 seats)\n"
        + " Othello: $500.00 (40 seats)\n"
        + "Amount owed is $1,730.00\n"
        + "You earned 47 credits \n"
    );
});

test('Jenkin test', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };

    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statement(invoice, plays);
    //then
    t.is(result, 'Statement for Jenkin\n'
        + ' Hamlet: $410.00 (31 seats)\n'
        + 'Amount owed is $410.00\n'
        + 'You earned 1 credits \n'
    );
});

test('tragedy hamlet with 30 audience test', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };

    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statement(invoice, plays);
    //then
    t.is(result, 'Statement for Jenkin\n'
        + ' Hamlet: $400.00 (30 seats)\n'
        + 'Amount owed is $400.00\n'
        + 'You earned 0 credits \n'
    );
});

test('comedy as-like with 20 audience test', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }
        ],
    };

    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statement(invoice, plays);
    //then
    t.is(result, 'Statement for Jenkin\n'
        + ' As You Like It: $360.00 (20 seats)\n'
        + 'Amount owed is $360.00\n'
        + 'You earned 4 credits \n'
    );
});

test('comedy as-like with 21 audience test', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 21,
            }
        ],
    };

    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statement(invoice, plays);
    //then
    t.is(result, 'Statement for Jenkin\n'
        + ' As You Like It: $468.00 (21 seats)\n'
        + 'Amount owed is $468.00\n'
        + 'You earned 4 credits \n'
    );
});

test('unkonwn type test', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [
            {
                'playID': 'test',
                'audience': 21,
            }
        ],
    };

    const plays = {
        'test': {
            'name': 'Test',
            'type': 'unknownType',
        },
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    try {
        const result = statement(invoice, plays);
        t.fail();
    }
    //then
    catch (e) {
        t.is(e.message, "unknown type: unknownType")
    }
});

test('empty performances test', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [],
    };
    const plays = {
        'test': {
            'name': 'Test',
            'type': 'unknownType',
        }
    };
    //when
    const result = statement(invoice, plays);
    //then
    t.is(result, 'Statement for Jenkin\n'
        + 'Amount owed is $0.00\n'
        + 'You earned 0 credits \n'
    );
});

test('Integration Boundary value test', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            },
            {
                'playID': 'as-like',
                'audience': 20,
            },
            {
                'playID': 'othello',
                'audience': 32,
            },
            {
                'playID': 'test',
                'audience': 22,
            },
        ],
    };

    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'test': {
            'name': 'Test',
            'type': 'comedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statement(invoice, plays);
    //then
    t.is(result, 'Statement for Jenkin\n'
        + " Hamlet: $400.00 (30 seats)\n"
        + " As You Like It: $360.00 (20 seats)\n"
        + " Othello: $420.00 (32 seats)\n"
        + " Test: $476.00 (22 seats)\n"
        + "Amount owed is $1,656.00\n"
        + "You earned 10 credits \n"
    );
});

test('Integration Boundary value test for statementHtml', t => {
    //given
    const invoice = {
        'customer': 'Jenkin',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            },
            {
                'playID': 'as-like',
                'audience': 20,
            },
            {
                'playID': 'othello',
                'audience': 32,
            },
            {
                'playID': 'test',
                'audience': 22,
            },
        ],
    };

    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'test': {
            'name': 'Test',
            'type': 'comedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    //when
    const result = statementHtml(invoice, plays);
    //then
    t.is(result, '<h1>Statement for Jenkin</h1>\n'
        + "<table>\n"
        + "<tr><th>play</th><th>seats</th><th>cost</th></tr>\n"
        + " <tr><td>Hamlet</td><td>30</td><td>$400.00</td></tr>\n"
        + " <tr><td>As You Like It</td><td>20</td><td>$360.00</td></tr>\n"
        + " <tr><td>Othello</td><td>32</td><td>$420.00</td></tr>\n"
        + " <tr><td>Test</td><td>22</td><td>$476.00</td></tr>\n"
        + "</table>\n"
        + "<p>Amount owed is <em>$1,656.00</em></p>\n"
        + "<p>You earned <em>10</em> credits</p>\n"
    );
});