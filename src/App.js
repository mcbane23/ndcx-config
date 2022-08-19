import { useState, useEffect, useCallback } from "react";
import { BsWrench } from "react-icons/bs";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import ConfigInfo from "./components/ConfigInfo";
import MessageInfo from "./components/MessageInfo";
// import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  // let [appointmentList, setAppointmentList] = useState([]);
  let [config, setConfig] = useState([]);

  // const fetchData = useCallback(() => {
  //   fetch("./ndcx/data.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAppointmentList(data);
  //     });
  // }, []);

  const fetchNDCxData = useCallback(() => {
    fetch("./ndcx/ndcx-config.json")
      .then((response) => response.json())
      .then((data) => {
        // remove duplicate messages
        const distinctValues = Array.from(
          new Set(data.messages.map((elem) => `${elem.name}`))
        ).map((distinctVal) => {
          return {
            name: data.messages.find((elem) => elem.name === distinctVal).name,
            data: data.messages.find((elem) => elem.name === distinctVal).data,
          };
        });
        data.messages = distinctValues;
        setConfig(data);
      });
  }, []);

  useEffect(() => {
    fetchNDCxData();
  }, [fetchNDCxData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BsWrench className="inline-block text-green-500 align-top mr-3" />
        NDCx config
      </h1>
      <AddAppointment />
      <Search />
      <ul className="divide-y divide-gray-200">
        <ConfigInfo config={config} />
        <MessageInfo
          config={config}
          onDeleteMessage={(name) => {
            config.messages = config.messages.filter(
              (message) => message.name !== name
            );
            debugger;
            setConfig(config);
          }}
        />
      </ul>
    </div>
  );
}

export default App;
