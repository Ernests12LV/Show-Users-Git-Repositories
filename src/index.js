import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';

class Repo extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      repoName: [],
      userName: ''
    };
  }

  componentDidMount() {
    let repoNames = [];
    axios.get(`https://api.github.com/users/${this.state.userName}/repos`)
      .then(({ data }) => {
        for (let index = 0; index < data.length; index++) {
          repoNames[index] = data[index].name;
        }
        this.setState({
          repoName: repoNames
        });
      })
      .catch(error => console.log(error.message));
    // console.log(this.state);

  }

  orderNames(repoNames) {
    let ordered = [];
    for (let index = 0; index < repoNames.length; index++) {
      ordered[index] = <li>{repoNames[index]}</li>
    }
    return ordered;
  }

  handleChange(event){
    this.setState({userName: event.target.value});
    console.log(this.state.userName);
    
  }

  render() {
    const names = this.orderNames(this.state.repoName);
    this.componentDidMount();
    return (
      <div>
        <form>
        <label>
          UserName
          <input type="text" value={this.state.userName} onChange={(event) => {this.handleChange(event);}} />
        </label>
      </form>
        <ol>
          {names}
        </ol>
      </div>
    );
  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Repo />);