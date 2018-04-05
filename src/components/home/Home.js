import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './Home.css';
const url = process.env.REACT_APP_SERVICE_URL;

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {

  static propTypes = {
    title: PropTypes.string,
    numTests: PropTypes.number,
    numStudents: PropTypes.number,
    averageStudents: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
  }

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
    const response = await fetch(`${url}stats`);
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
      <Helmet title=""/>
        <section>
          <h2>Tölfræði</h2>
          <p>Fjöldi prófa {data.stats.numTests}</p>
          <p>Fjöldi nemenda í öllum prófum {data.stats.numStudents}</p>
          <p>Meðalfjöldi nemenda í prófi {data.stats.averageStudents}</p>
          <p>Minnsti fjöldi nemenda í prófi {data.stats.min}</p>
          <p>Mesti fjöldi nemenda í prófi {data.stats.max}</p>
        </section>
      </div>
        );
  }
}
