import { BiTrash } from "react-icons/bi";

const MessageInfo = ({ messages, onDeleteMessage }) => {
  if (!messages) {
    return "";
  } else
    return messages.map((message, index) => {
      return (
        <li key={message.name} className="px-3 py-3 flex items-start">
          <button
            onClick={() => onDeleteMessage(message.name)}
            type="button"
            className="p-1.5 mr-1.5 mt-1 rounded text-white bg-red-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <BiTrash />
          </button>
          <div className="flex-grow">
            <div className="flex items-center">
              <span className="flex-none font-medium text-1xl text-blue-500">
                Name: {message.name}
              </span>
            </div>
            <div>
              <b className="text-blue-500">Data: </b> {message.data}
            </div>
          </div>
        </li>
      );
    });
};

export default MessageInfo;
