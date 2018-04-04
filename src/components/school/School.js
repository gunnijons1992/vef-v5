import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './School.css';
import Department from '../department/Department.js'
import Fetch from '../../Fetch';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {

  state = {
    visibleSvid: null,
  }

  onHeaderClick = (svidId) => {
    return (e) => {
      const visibleSvid = this.state.visibleSvid === svidId ? null : svidId;
      this.setState({ visibleSvid });
    }
  }

  render() {
    const { match } = this.props;
    const svid = match.params.name;
    return (

    <div>
      <Fetch
        url={`https://vefforritun2-2018-v4-synilausn.herokuapp.com/${svid}`}
        render={({ loading, error, data}) => {
          if (loading) {
            return (<div>Sæki lista...</div>);
          }

          if (error) {
            return (<div>Villa við að sækja gengi</div>);
          }
          return (
            <section>
              <h2>{data.school.heading}</h2>
              <ul>
              {data.school.departments.map((item, i) => {
                return  (
                <li key={i}>
                <h3>{item.heading}</h3>
                {data.school.departments.tests.map((item, i) =>  {
                  return  (
                  <Department
              course={item.tests[i].course}
              name={item.tests[i].name}
              students={item.tests[i].students}
              date={item.tests[i].date}
              visible={this.state.visibleNote === svid.id}
              onHeaderClick={(this.onHeaderClick(svid.id))}
              />
            );
            })}
            </li>
          );
        })}
      </ul>
            </section>
          );
        }}
        />
      </div>
    );
  }
}
