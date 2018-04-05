import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';



/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Exams extends Component {
  static propTypes = {
    title: PropTypes.string,
    course: PropTypes.string,
    name: PropTypes.string,
    students: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    visibleSvid: PropTypes.bool,
    onHeaderClick: PropTypes.func,
  }

  static defaultProps = {
  visibleSvid: false,
  onHeaderClick: () => {
    },
  }

  render() {
    const sign = this.props.visibleSvid ? '+' : '-';
    const display = this.props.visibleSvid ? 'none' : 'block';
    return (
      <section className="svid">
      <h3 onClick={this.props.onHeaderClick} className="note__header"><span className="plus">{sign}</span>{this.props.name}</h3>
        <div style={{display}}>
          <table className="table-striped">
            <thead>
              <tr>
                <th>Auðkenni</th>
                <th>Námskeið</th>
                <th>Fjöldi</th>
                <th>Dagsetning</th>
              </tr>
            </thead>
            <tbody>
              {this.props.tests.map((item) => (
                <tr key={item.name}>
                  <td>{item.course}</td>
                  <td>{item.name}</td>
                  <td>{item.students}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
  }
