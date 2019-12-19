import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { connect } from 'react-redux'
import {setSearchField} from "../actions";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      robots: [],
      searchfield: '',
    }
  }

  clickClack = message => {
   this.props.setSearchField(message);
  }


  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => {this.setState({ robots: users})});
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <button onClick={this.clickClack}>SomeButton + {this.props.val}</button>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}


const mapDispatchToProps =  {
    setSearchField,

}

const mapStateToProps = state => {
  return { val: state.reducuerField };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);