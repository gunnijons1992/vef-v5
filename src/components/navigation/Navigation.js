import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
const url = process.env.REACT_APP_SERVICE_URL;


/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {
  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (e) {
      console.error('Error fetching data', e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return (<div>Sæki gögn...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    return (
      <div>
        <section className="navigator">
          <h1 className="header">Próftöflur</h1>
          <nav>
            <ul>
              {data.schools.map((item, i) => (
                <li key={i} id={i} className="nav-li">
                  <NavLink to={`${item.slug}`}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    );
  }
}
