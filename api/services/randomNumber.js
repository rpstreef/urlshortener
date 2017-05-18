import shortid from 'short-duid-js';

const shard_id = 99;
const salt = 323424234;
const epoch_start = 1433116800000;
const duid = shortid.init(shard_id,salt,epoch_start);

module.exports = {
    get: function () {
		  return parseInt(duid.getDUIDInt(1)[0]);
    }
}