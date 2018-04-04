import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Fetch from '../../Fetch';
import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {

  render() {

    return (
    <div>
      <Fetch
        url="https://vefforritun2-2018-v4-synilausn.herokuapp.com/"
        render={({ loading, error, data}) => {
          if (loading) {
            return (<div>Sæki lista...</div>);
          }

          if (error) {
            return (<div>Villa við að sækja gengi</div>);
          }

          return (
            <section>
              <h1>Próftöflur</h1>
              <nav>
                <ul>
                  {data.schools.map((item, i) => (
                  <li key={i}>
                    <NavLink to={`/svid/${item.slug}`}>{item.name}</NavLink>
                  </li>
                  ))}
                </ul>
              </nav>
            </section>
          );
        }}
        />
      </div>
);
  }
}
