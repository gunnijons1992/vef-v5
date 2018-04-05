import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './School.css';
import Department from '../department/Department.js';
import { NavLink } from 'react-router-dom';
const url = process.env.REACT_APP_SERVICE_URL;

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  static propTypes = {
    title: PropTypes.string,
    course: PropTypes.string,
    name: PropTypes.string,
    students: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    visibleSvid: PropTypes.bool,
    onHeaderClick: PropTypes.func,
  }

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

  componentWillReceiveProps(nextProps) {
    this.props=(nextProps);
    this.componentDidMount();
  }

  async fetchData() {
    const { match } = this.props;
    const datas = match.params.name;
    const response = await fetch((`${url}${datas}`));
    const data = await response.json();
    return data;
  }

  onHeaderClick = (svidName) => {
    return (e) => {
      const visibleSvid = this.state.visibleSvid === svidName ? null : svidName;
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
            <Helmet title={data.school.heading} />

            {data.school.departments.map((item, i) => {
              return  (
              <div key={i}>
                <Department
                  name={item.heading}
                  tests={item.tests}
                  onHeaderClick={(this.onHeaderClick(item.heading))}
                  visibleSvid={this.state.visibleSvid !== item.heading} />
              </div>
            )
          })}
            <NavLink to='/'>Heim</NavLink>
          </section>
        );
  }
}
