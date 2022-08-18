const ConfigInfo = ({ config }) => {
  if (!config.terminal) {
    return null;
  } else
    return (
      <div>
        <h2>Terminal Config ID: {config.terminal.configId}</h2>
        <h2>Product Class: {config.terminal.productClass}</h2>
        <h2>NDC messages</h2>
        {config.messages.map((message) => (
          <Messages message={message} />
        ))}
      </div>
    );
};

const Messages = ({ message }) => {
  return (
    <li className="px-3 py-3 flex items-start">
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="flex-none font-medium text-1xl text-blue-500">Name: {message.name}</span>
        </div>
        <div>
          <b className="text-blue-500">Data: </b> {message.data}
        </div>
      </div>
    </li>
  );
};

export default ConfigInfo;
