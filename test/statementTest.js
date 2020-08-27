const test = require('ava');
const {statement} = require('../src/statement');

test('Sample test', t => {
    t.true(true);
    t.is(1, 1);
    t.deepEqual({a: 1}, {a: 1});
});

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

    const result = statement(invoice, plays);

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
    } catch (e) {//then
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