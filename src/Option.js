import React, {Component} from 'react';


class Option extends Component {
    //renders option element to browswer - value comes from "CategoryList" component
    render() {        
    return (    
        <option>{this.props.label}</option>    
    )}
}

export default Option;