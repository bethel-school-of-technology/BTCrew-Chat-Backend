'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "MessagePublic" from table "users"
 * removeColumn "MessagePrivate" from table "users"
 * removeColumn "Recipient" from table "users"
 * removeColumn "Sender" from table "users"
 *
 **/

var info = {
    "revision": 3,
    "name": "init3",
    "created": "2020-08-09T04:17:31.071Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["users", "MessagePublic"]
    },
    {
        fn: "removeColumn",
        params: ["users", "MessagePrivate"]
    },
    {
        fn: "removeColumn",
        params: ["users", "Recipient"]
    },
    {
        fn: "removeColumn",
        params: ["users", "Sender"]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
