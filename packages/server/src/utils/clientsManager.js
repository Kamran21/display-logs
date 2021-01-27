// simple in memory clients manager

// state representing a connected clients
let state = {
  ids: [],
  entities: {},
};

const addNewClient = (uuid) => {
  if (uuid && !state.entities[uuid]) {
    state.entities[uuid] = uuid;
    state.ids.push(uuid);
  }
};

const loadClientWithLogFile = (socket, data) => {
  socket.emit("load file", data);
};

const getState = () => state;

export default { getState, addNewClient, loadClientWithLogFile };
