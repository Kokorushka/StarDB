import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-details.css';
const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{field}</span>
    </li>
  );
};

export {
  Record
};
export default class ItemDetails2 extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    loading: false,
    image: null
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevprops) {
    if(this.props.itemId !== prevprops.itemId) {
      this.setState({
        loading: true
      });
      this.updateItem();
    }
  }

onError = (err) => {
  this.setState({
    error: true
  })
}

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

   getData(itemId)
        .then((item) => {
          this.setState({ item,
          loading: false,
          image: getImageUrl(item)
        });
      });
  }
  render() {

    const { item, loading, image } = this.state;
    const spinner = loading ? <Spinner /> : <ItemView item={ item } image={image}/>

    if (!item) {
      return <span>Select a person from the list</span>
    }

    
    
    return (
      <div className="item-details card">
        {spinner}
      </div>
    )
  }
}

const ItemView = ({ item, image }) => {
  const {
    id,
    name,
    gender,
    birthYear,
    eyeColor
  } = item;
  return(
    <React.Fragment>
            <img className="item-image" alt=''
          src={image} />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {ItemDetails.props.children}
            {/* <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li> */}
          </ul>
        </div>
  </React.Fragment>
  )
}