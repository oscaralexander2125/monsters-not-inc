import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

// think of functional components as functions and side-effects
//functional components don't go through lifecycle methods like class components
const App = () => {
  //state value change causes rerender; not setsearchfield
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [title, setTitle] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  //renders only when certain values change
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => setMonsters(users));
    console.log("fetch effect firing");
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
    console.log("effect is firing");
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  console.log(monsters);

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="Search monsters"
        className="monsters-search-box"
      />
      <br />
      <SearchBox
        onChangeHandler={onTitleChange}
        placeholder="Set Title"
        className="title-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

/*class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  //runs when component mounts.
  //mounting is the first time a component gets placed onto the DOM; only happens once throughout a components life
  //might remount if unmounted
  //needed the moment component is placed onto DOM is when you need to make api request.
  //need data the minute component is placed on the dom
  // use this method when your component need api data as soon as components is placed (rendered) on the DOM
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((response) =>
        this.setState(() => {
          return { monsters: response };
        })
      );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredList = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Not Inc</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search monsters"
          className="monsters-search-box"
        />
        <CardList monsters={filteredList} />
      </div>
    );
  }
}*/

export default App;