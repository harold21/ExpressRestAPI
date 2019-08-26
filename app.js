const EventEmitter = require('events');
const emitter = EventEmitter();

// Register a Listerner
emitter.on('logging', (e) => {
    console.log('Logging event called', e);
});

// Raise the event
emitter.emit('logging', { data: 'Logger data...', form: 'Originator' });