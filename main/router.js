import {main} from 'ioa';

const { nrouter } = main;

nrouter.get('/user', 'token', 'test', 'user.find');

nrouter.get('/user/:id', 'token', 'test', 'user.findPk');

nrouter.post('/user', 'token', 'user.create');

nrouter.put('/user/:id', 'token', 'user.update');

nrouter.delete('/user/:id', 'token', 'user.delete');

nrouter.get('/test', 'token', 'test.find');
