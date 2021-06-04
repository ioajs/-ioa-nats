import ioa from 'ioa';
import consoln from 'consoln';
import { connect } from 'nats';

const { config } = ioa.app;

const nats = await connect(config).catch(e => {
   throw Error(`nats连接失败，${e.message}`);
});

nats.closed().then(e => {
   consoln.error(`nats disconnect, ${e.message}`);
});

consoln.success(`nats connection success`);

export default nats;
