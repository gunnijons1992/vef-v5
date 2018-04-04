import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './School.css';
import Department from '../department/Department.js'
const url = process.env.REACT_APP_SERVICE_URL;

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  state = { data: null, loading: true, error: false, visibleSvid:false }

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
    const { match } = this.props;
    const datas = match.params.name;
    const response = await fetch((`${url}${datas}`));
    const data = await response.json();
    return data;
    }

  onHeaderClick = (svidId) => {
    return (e) => {
      const visibleSvid = this.state.visibleSvid === svidId ? null : svidId;
      this.setState({ visibleSvid });
    }
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return (<div>Sæki lista...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gengi</div>);
    }
        return (
          <section className="school">
            <h2>{data.heading}</h2>
            {data.school.departments.map((item, i) => {
              console.log(item.tests);
              return  (
              <div key={i}>
              <h3>{item.heading}</h3>
              <Department
                tests={item.tests}
                onHeaderClick={(this.onHeaderClick(item.heading))}
                visible={this.state.visibleNote === item.heading} />
              </div>
            )
          })}
          </section>
        );
  }
}
