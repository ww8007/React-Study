import './App.css';
import TOC from './components/TOC';
import Article from './components/Article';
import Subject from './components/Subject';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'read',
      welcom: { title: 'Welcome', desc: 'Hello, React!' },
      subject: { title: 'WEB', sub: 'world wide web!' },
      contents: [
        { id: 1, titles: 'HTML', des: 'HTML is for information' },
        { id: 2, titles: 'CSS', des: 'CSS is for desing' },
        { id: 3, titles: 'JavaScript', des: 'JavaScript is for interactive' },
      ],
    };
  }
  render() {
    console.log('App render');
    var _title,
      _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcom.title;
      _desc = this.state.welcom.desc;
    } else if (this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].des;
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        ></Subject>

        <TOC
          onChangePage={function () {
            this.setState({ mode: 'read' });
          }.bind(this)}
          data={this.state.contents}
        >
          {' '}
        </TOC>
        <Article title={_title} desc={_desc}></Article>
      </div>
    );
  }
}

export default App;
