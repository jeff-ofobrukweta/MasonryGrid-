import React from 'react';
import Card from '../components/card';
import Modal from '../components/modal/modal';
import './gallery.css'

export default class Gallery extends React.Component {
  state = {
    searchQuery: "",
    searchedList: [],
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

  handleSearch = (event) => {

    this.setState({ searchQuery: event.target.value })
    const { data, searchQuery, searchedList } = this.state;

    const filteredList = data?.filter(job => job.user?.first_name.toLowerCase().includes(searchQuery.toLowerCase()));
    this.setState({ searchedList: filteredList })
    return;
  }

  getName = async () => {
    this.loading = true;
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_CLIENTID}`
    );
    const data = await res.json();
    this.setState({ data: data });
    setTimeout(() => (this.setState({ loading: false })), 2000);

  }

  componentDidMount() {
    this.getName()
  }




  render() {
    const { searchQuery, searchedList, data, modalData, loading, show } = this.state;
    return (
      <>
        <div className="layout-parent col-lg">
          <div className="layout-main-component-wrapper">
            <div className="layout-child-first">
              <div className="search__container">
                <div className="searchbar">
                  <div>
                    {
                      (searchQuery)&&
                      <>
                        <span className="searchbar__title">Search Result For</span>
                        <span className="search__result">{`"` + searchQuery + `"`}</span>
                      </>
                    }
                    <input
                      type="text"
                      onChange={(e) => this.handleSearch(e)}
                      value={searchQuery}
                      placeholder="Search for photo"
                      className="input_catalog_search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="layout-child-secound">

              <div className="grid-container">
                {/* the loader here */}
                {
                  (loading) &&
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
                <Modal show={show} handleClose={this.hideModal}>
                  <div className="image__holder" style={{
                    backgroundImage: `url(${(modalData?.urls.small)})`
                  }}>

                  </div>
                  <div className="modal__body__inner">
                    <section className="title">{modalData?.user.name}</section>
                    <section className="title tags">
                      <span>{modalData?.user.location}</span>
                    </section>
                  </div>

                </Modal>
                <div className="masonry">

                  <Card
                    item={searchQuery ? searchedList : data}
                    showModal={this.showModal}
                    loading={loading} />

                </div>
              </div>
            </div>
          </div>
        </div >
      </>
    );
  }

}