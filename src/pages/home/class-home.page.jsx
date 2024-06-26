// const HomePage = () => {
    // function => var 
//     return (
//         <div>
//             <h1>Home Page</h1>
//             <h4>Content</h4>
//         </div>
//     )
// }

import React from "react";

class HomePage extends React.Component{
    constructor(props) {
        super(props)
        // State create 
        this.state = {
            title: "Default Title", 
            content: "Default Content"
        };
        console.log("I am on constructor")
    }

    componentDidMount = () => {
        // API Call 
        setTimeout(() => {
            this.setState({
                ...this.state,
                title: "Home Page",
                content: "I am a dummy content"
            })
        }, 3000)
        console.log("I am on ComponentDidMount")
    }


    componentDidUpdate = () => {
        // state change 
        console.log("I am on ComponentDidUpdate")
    }

    increaseValue = () => {
        // state change
    }

    componentWillUnmount = () => {
        console.log("I am on componentWillUnmount")
    }

    render = () => {
        console.log("I am on render")
        return (<div>
            <h1>{this.state.title}</h1>
            <div>
                {this.state.content}
            </div>
            <button> Click Me</button>
        </div>)
    }
}

export default HomePage;