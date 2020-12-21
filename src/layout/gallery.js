import React from 'react';
import Card from '../components/card';
import Modal from '../components/modal/modal';
import './gallery.css'

export default class Gallery extends React.Component {
  state = {
    searchQuery: "",
    data: [],
    show: false,
    loading: true,
    modalData: null
  };

  showModal = (event, data) => {
    this.setState({ show: true });
    this.state.modalData = data;
  };

  hideModal = () => {
    this.setState({ show: false, modalData: null });
  };

  async getName() {
    this.loading = true;
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${"EA22GMifBMCMBA8T4qzuiA8yOjWChZrVq8zi4ZRto58"}`
    );
    const data = await res.json();
    this.setState({ data: data });
    setTimeout(() => (this.setState({ loading: false })), 2000);

  }

  componentDidMount() {
    this.getName()
  }

  handleSearch() {
    this.data = this.data.filter((item) => {
      let searchString = this.searchQuery.trim().toLowerCase();
      const result =
        item.user.first_name.toLowerCase().indexOf(searchString) !== -1
          ? item
          : this.data;
      return result;
    });
    return this.data;
  }


  render() {
    return (
      <>
        <div className="layout-parent col-lg">
          <div className="layout-main-component-wrapper">
            <div className="layout-child-first">
              <div className="search__container">
                <div className="searchbar">
                  <input
                    type="text"
                    onChange={this.handleSearch}
                    value={this.state.searchQuery}
                    placeholder="Type your keyword"
                    className="input_catalog_search"
                  />
                </div>
              </div>
            </div>
            <div className="layout-child-secound">

              <div className="grid-container">
                {/* the loader here */}
                {
                  (this.state.loading) &&
                  <div className="container">
                    <div className="item" style={{ height: "140px" }}>
                      <div className="card__header">
                        <p className="up"></p>
                        <p className="down"></p>
                      </div>
                    </div>
                    <div className="item" style={{ height: "190px" }}>
                      <div className="card__header">
                        <p className="up"></p>
                        <p className="down"></p>
                      </div>
                    </div>
                    <div className="item" style={{ height: "200px" }}>
                      <div className="card__header">
                        <p className="up"></p>
                        <p className="down"></p>
                      </div>
                    </div>
                    <div className="item" style={{ height: "120px" }}>
                      <div className="card__header">
                        <p className="up"></p>
                        <p className="down"></p>
                      </div>
                    </div>
                    <div className="item" style={{ height: "160px" }}>
                      <div className="card__header">
                        <p className="up"></p>
                        <p className="down"></p>
                      </div>
                    </div>
                    <div className="item" style={{ height: "180px" }}>
                      <div className="card__header">
                        <p className="up"></p>
                        <p className="down"></p>
                      </div>
                    </div>
                  </div>
                }

                {/* loader ends here */}
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  <div className="image__holder" style={{
                    backgroundImage: `url(${(this.state.modalData?.urls.small)})`
                  }}>

                  </div>
                  <div className="modal__body__inner">
                    <section className="title">{this.state.modalData?.user.name}</section>
                    <section className="title tags">
                      <span>{this.state.modalData?.user.location}</span>
                    </section>
                  </div>

                </Modal>
                <div className="masonry">

                  <Card
                    item={this.state.data}
                    showModal={this.showModal}
                    loading={this.state.loading} />

                </div>
              </div>
            </div>
          </div>
        </div >
      </>
    );
  }

}