import { useState, useEffect, useCallback } from "react";
import { BsWrench } from "react-icons/bs";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";
import ConfigInfo from "./components/ConfigInfo";
import MessageInfo from "./components/MessageInfo";
import FileUpload from "./components/FileUpload";
// import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  // let [appointmentList, setAppointmentList] = useState([]);
  let [config, setConfig] = useState([]);
  let [messages, setMessages] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("name");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredMessages = messages
    .filter((item) => {
      return (
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.data.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  // const fetchNDCxData = useCallback(() => {
  //   fetch("./ndcx/ndcx-config.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       prepareData(data)
  //     });
  // }, []);

  // useEffect(() => {
  //   fetchNDCxData();
  // }, [fetchNDCxData]);

  const prepareData = (data) => {
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
    setMessages(distinctValues);
  };

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <BsWrench className="inline-block text-green-500 align-top mr-3" />
        NDCx config
      </h1>
      <AddAppointment />
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(myOrder) => setOrderBy(myOrder)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />
      <ul className="divide-y divide-gray-200">
        <FileUpload
          onFileChange={(data) => {
            data = JSON.parse(data);
            prepareData(data);
          }}
        />
        <ConfigInfo config={config} />
        <MessageInfo
          messages={filteredMessages}
          onDeleteMessage={(name) => {
            messages = messages.filter((message) => message.name !== name);
            setMessages(messages);
          }}
          onMessageChange={(name, value) => {
            messages = messages.map((elem) => {
              if (elem.name === name) {
                return { name: elem.name, data: value };
              } else return elem;
            });
            setMessages(messages);
          }}
        />
      </ul>
    </div>
  );
}

export default App;
