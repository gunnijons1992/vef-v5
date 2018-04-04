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
    const { key, title, course, name, students, date, visible, onHeaderClick } = this.props;

    return (
      <section className="svid">
        <h3>{}</h3>
        {visible && (
        <table>
          <tbody>
          <tr>
            <th>Auðkenni</th>
            <th>Námskeið</th>
            <th>Fjöldi</th>
            <th>Dagsetning</th>
          </tr>
          <tr>
            <th>{course}</th>
            <th>{name}</th>
            <th>{students}</th>
            <th>{date}</th>
          </tr>
          </tbody>
        </table>
        )}
      </section>
    );
  }
  }
