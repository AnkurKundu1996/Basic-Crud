'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('auth_tokens',{
    id: {
      type: 'bigint',
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: 'bigint',
      notNull: true
    },
    token: {
      type: 'string',
      notNull: true
    },
    created_at: {
      type: 'datetime',
      notNull: true,
      defaultValue: new String('now()')
    },
    updated_at: {
      type: 'datetime',
      notNull: true,
      defaultValue: new String('now()')
    },
    deleted_at: {
      type: 'datetime'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('auth_tokens');
};

exports._meta = {
  "version": 1
};
