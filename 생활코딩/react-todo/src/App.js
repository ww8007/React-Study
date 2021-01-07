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
      selected_content_id: 2,
      welcom: { title: 'Welcome', desc: 'Hello, React!' },
      subject: { title: 'WEB', sub: 'world wide web!' },
      contents: [
        { id: 1, titles: 'HTML', desc: 'HTML is for information' },
        { id: 2, titles: 'CSS', desc: 'CSS is for desing' },
        { id: 3, titles: 'JavaScript', desc: 'JavaScript is for interactive' },
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
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.titles;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
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
          onChangePage={function (id) {
            this.setState({ mode: 'read', selected_content_id: Number(id) });
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
