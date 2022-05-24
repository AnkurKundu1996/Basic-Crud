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
    return db.addColumn('users','v_code',
      {
        type: 'int'
      }
    ).then(
      function(result) {
        db.addColumn('users','v_timestamp',
          {
            type: 'int'
          }
        )
      }
    )
};

exports.down = function(db) {
  return db.removeColumn('users', 'v_code')
  .then(
    function(result) {
      db.removeColumn('users', 'v_timestamp')
    }
  )
};

exports._meta = {
  "version": 1
};
