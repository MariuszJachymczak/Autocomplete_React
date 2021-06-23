import React, { useState, useEffect } from "react";
import "./AutoComplete.css";

function Autocomplete() {
  const URL = "https://jsonplaceholder.typicode.com/users";

  const [input, setInput] = useState();
  const [fetchedData, setFetchedData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [onClick, setOnClick] = useState();

  const fetchData = async () => {
    const results = await fetch(URL);
    const data = await results.json();
    setFetchedData(data);

    console.log(data);
  };
  const handleChange = (text) => {
    setInput(text);
    if (text === "") {
      setFilteredData([]);
    } else {
      const fData = fetchedData.filter((element) => {
        return element.username.startsWith(text);
      });

      setFilteredData(fData);
      console.log(fData);
    }
  };

  const handleChangeBtn = (username) => {
    setInput(username);
    setFilteredData([]);
    console.log(username);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form autoComplete="off">
      <div className="autocomplete" style={{ width: "200px" }}>
        <input
          key="input"
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          value={input}
        />
        <div className="autocomplete-items">
          {filteredData.map((filterData) => {
            return (
              <div
                onClick={() => {
                  handleChangeBtn(filterData.username);
                }}
              >
                <strong>{filterData.username}</strong>
              </div>
            );
          })}
        </div>
      </div>
      <input type="submit" />
    </form>
  );
}

export default Autocomplete;
