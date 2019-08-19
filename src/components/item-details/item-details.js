import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button';

import './item-details.css';

const Record = ({selectedItem, label, field}) => {
  if(selectedItem[field]) {
    return (
      <li className="list-group-item">
        <span className="term">{ label }</span>
        <span>{ selectedItem[field] }</span>
      </li>
    );
  }
  return null;
};

export {
  Record
};

export default class ItemDetails extends Component {

  SwapiService = new SwapiService();

  state = {
    selectedItem: null,
    loading: true,
    imageUrl: null
  }

  updateItem = () => {
    const { id, getData, getImageUrl } = this.props;

    if(!id) {
      return;
    }

        getData(id)
        .then((selectedItem) => {
          this.setState({ selectedItem,
                          loading: false,
                          imageUrl: getImageUrl })
        });
  }

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.id !== prevProps.id ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) {
      this.setState({ loading: true });
      this.updateItem();
    }
  }

  render() {

    const { selectedItem, loading} = this.state

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <ItemView selectedItem={this.state.selectedItem}
                                         imageUrl={this.state.imageUrl}
                                         listItem={React.Children.map(this.props.children , (child) => React.cloneElement(child, { selectedItem }))}/> : null;

    return (
      <div className="item-details jumbotron rounded">
      { spinner }
      { content }
    </div>
    );
  }
}

const ItemView = ({ selectedItem: { id, name }, imageUrl, listItem }) => {
  return (
    <React.Fragment>
      <img className="item-image"
          src={ imageUrl(id) }
          alt="item"></img>
      <div className="card-body">
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          { listItem }
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
}