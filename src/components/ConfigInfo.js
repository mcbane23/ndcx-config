import { BiTrash } from "react-icons/bi";

const ConfigInfo = ({ config, onDeleteMessage }) => {
  if (!config.terminal) {
    return null;
  } else
    return (
      <div>
        <h2>Terminal Config ID: {config.terminal.configId}</h2>
        <h2>Product Class: {config.terminal.productClass}</h2>
      </div>
    );
};

export default ConfigInfo;
