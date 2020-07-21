'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "messages", deps: []
 *
 **/

var info = {
    "revision": 2,
    "name": "initial_migration",
    "created": "2020-07-21T04:14:02.734Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "messages",
        {
            "UserId": {
                "type": Sequelize.INTEGER,
                "field": "UserId",
                "primaryKey": true,
                "autoIncrement": true,
                "allowNull": false
            },
            "Sender": {
                "type": Sequelize.STRING,
                "field": "Sender"
            },
            "Recipient": {
                "type": Sequelize.STRING,
                "field": "Recipient"
            },
            "MessagePrivate": {
                "type": Sequelize.STRING,
                "field": "MessagePrivate"
            },
            "MessagePublic": {
                "type": Sequelize.STRING,
                "field": "MessagePublic"
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "field": "createdAt",
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "field": "updatedAt",
                "allowNull": false
            }
        },
        {}
    ]
}];

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
