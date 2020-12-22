import React from 'react';
import PropTypes from "prop-types";

export default class Card extends React.Component {
  state = {

  };



  render() {
    const { item, showModal, loading } = this.props;
    return (
      <>
        {
          (!loading) &&
          <div className="background__forcard">
            {
              item.map((collect, index) =>
              (
                <div onClick={(e) => showModal(e, collect)} className="grid" key={index}>
                  <img src={collect.urls.thumb} />
                  <div className="grid__body">
                    <div className="relative">
                      <div className="grid__link"></div>
                    </div>
                    <div className="mt-auto">
                      <p className="grid__tag">{collect.user.first_name}</p>
                      <p className="grid__tag">{collect.user.last_name}</p>
                    </div>
                  </div>
                </div>
              )
              )
            }

          </div>
        }
      </>
    );


  }
}

Card.propTypes = {
  showModal: PropTypes.func.isRequired,
  item: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};