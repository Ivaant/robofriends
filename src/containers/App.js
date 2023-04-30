import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Header from '../components/Header';
import Scroll from '../components/Scroll';
import './App.css';
import { connect } from 'react-redux'
import { setSearchField, requestRobots } from "../actions";

class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
	}

	render() {
		const { robots, searchField, onSearchChange, isPending } = this.props;
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ?
			<h1>Loading</h1> :
			(
				<div className='tc'>
					<Header />
					<SearchBox searchChange={onSearchChange} />
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				</div>
			);
	}
}


const mapDispatchToProps = dispatch => {
	return {
		onSearchChange: e => dispatch(setSearchField(e.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
};

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);