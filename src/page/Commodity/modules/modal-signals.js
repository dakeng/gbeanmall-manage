import signals from 'signals';

const Signal = signals.Signal;
const modalSignals = {
    showAddCommodity: new Signal(),
    showModifyModal: new Signal(),
};

export default modalSignals;