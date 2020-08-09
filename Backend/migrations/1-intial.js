'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "users", deps: []
 * createTable "messages", deps: [users]
 *
 **/

var info = {
    "revision": 1,
    "name": "intial",
    "created": "2020-08-09T04:10:08.951Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "users",
            {
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "allowNull": false,
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "FirstName": {
                    "type": Sequelize.STRING,
                    "field": "FirstName"
                },
                "LastName": {
                    "type": Sequelize.STRING,
                    "field": "LastName"
                },
                "Username": {
                    "type": Sequelize.STRING,
                    "field": "Username",
                    "unique": true
                },
                "Password": {
                    "type": Sequelize.STRING,
                    "field": "Password"
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "messages",
            {
                "MessageId": {
                    "type": Sequelize.INTEGER,
                    "field": "MessageId",
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
                "Message": {
                    "type": Sequelize.STRING,
                    "field": "Message"
                },
                "Private": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Private"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "users",
                        "key": "UserId"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
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
