import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navigation.css';
const url = process.env.REACT_APP_SERVICE_URL;


/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {
  static propTypes = {
    title: PropTypes.string,
    course: PropTypes.string,
    name: PropTypes.string,
    students: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    visibleSvid: PropTypes.bool,
    toggleBold2: PropTypes.func,
  }

  state = { data: null, loading: true, error: false, visisbleSvid: false }

  static defaultProps = {
  visisbleSvid: false,
  toggleBold2: () => {
    },
  }

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

  toggleBold = (id) =>  {
    const element = document.getElementById('felagsvisindasvid');
    console.log(id)
    console.log(element);
    //element.style.fontWeight = "bold"
  }

  toggleBold2 = (id) => {
    return (e) => {
      const visibleSvid = this.state.visibleSvid === id ? null : id;
      this.setState({ visibleSvid });
      console.log(visibleSvid);
    }
  }

  render() {
    const { data, loading, error } = this.state;
    const display = this.props.boldOrNot ? 'font-weight: normal' : 'font-weight: bold';

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
                  <NavLink to={`${item.slug}`}
                  id={item.slug}
                  onClick={this.toggleBold(`${item.slug}`)}>
                  {item.name}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    );
  }
}
