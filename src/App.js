import React, {Component} from 'react';
import CardList from './components/CardList';
import SearchBox from './components/SearchBox'
import Scroll from './components/Scroll'
import './App.css'

export class App extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             robots: [],
             searchField: ''
        }
    }

    onSearchChange = (event) => {

        this.setState({
            searchField: event.target.value
        })
  
        // console.log(filteredRobots)
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}))

    }

    render() {
        const { robots, searchField } = this.state
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        if(!robots.length){
            return <h1>Loading ...</h1>
        }else{
            return (
                <div className = 'tc'>
                    <h1 className = 'f2'>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <CardList robots = {filteredRobots}/>
                    </Scroll>
                </div>
            )
        }
    }
}

export default App
