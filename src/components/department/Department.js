import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';
import Fetch from '../../Fetch';



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
    visible: PropTypes.bool,
    onHeaderClick: PropTypes.func,
  }

  static defaultProps = {
  visible: true,
  onHeaderClick: () => {},
}

  render() {

    return (
      <section className="svid">
        <div>
        <table>
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
              <tr>
              <td>{item.course}</td>
              <td>{item.name}</td>
              <td>{item.students}</td>
              <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
        </div>
      </section>
    );
  }
  }
