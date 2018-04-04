import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './Home.css';
import Fetch from '../../Fetch';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {

  static propTypes = {
    title: PropTypes.string,
    numTests: PropTypes.num,
    numStudents: PropTypes.num,
    averageStudents: PropTypes.num,
    min: PropTypes.num,
    max: PropTypes.num,
  }

  render() {

    return (
      <div>
        <Fetch
          url="https://vefforritun2-2018-v4-synilausn.herokuapp.com/stats"
          render={({ loading, error, data}) => {
            if (loading) {
              return (<div>Sæki gögn...</div>);
            }

            if (error) {
              return (<div>Villa við að sækja gögn</div>);
            }
            console.log(data);
            return (

              <section>
                <h2>Tölfræði</h2>
                <p>Fjöldi prófa {data.stats.numTests}</p>
                <p>Fjöldi nemenda í öllum prófum {data.stats.numStudents}</p>
                <p>Meðalfjöldi nemenda í prófi {data.stats.averageStudents}</p>
                <p>Minnsti fjöldi nemenda í prófi {data.stats.min}</p>
                <p>Mesti fjöldi nemenda í prófi {data.stats.max}</p>
              </section>
            );
          }}
          />
        </div>
        );
  }
}
