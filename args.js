testing('a_val');
testing('a_val', 'e_val');
testing('a_val', 'b_val', 'e_val');
testing('a_val', 'b_val', 'c_val', 'e_val');

function Args(args, rules) {
    var args_name = ['a', 'b', 'c', 'd', 'e'];

    var res = {};

    var rule = rules[args.length];

    if(!rule) {
        return false;
    }

    for(var i = 0; i < rule.length; i++) {
        res[rule[i]] = args[i];
    }

    console.log(res);

    return res;
}

function testing(a, b, c, d, e) {
    Args(arguments, {
        2: ['a', 'e'],
        3: ['a', 'b', 'e'],
        4: ['a', 'b', 'c', 'e']
    });
}