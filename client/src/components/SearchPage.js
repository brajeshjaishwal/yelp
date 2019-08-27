import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/searchService';
import '../styles/searchpage.css';
import styles from '../styles/searchContentStyles';


class searchPage extends React.Component {
  state = {
    city: '',
    search: []
  }

  onChange = e => {
    this.setState({city: e.target.value})
  }

  onSearch = async() => {
    if(this.state.city) {
      await this.props.requestSearch(this.state.city)
    }
  }

  render(){
    let { businesses, error, loading } = this.props
    return (
      <div style={styles.container}>
        <div style={styles.searchContainer}>
          <input type='text' 
            placeholder='enter your search string' 
            style={styles.searchText}
            onChange = {this.onChange} />
          <button style={styles.searchButton} 
            onClick={this.onSearch}>Search</button>
        </div>
        {loading && <div class='loader'></div>}
        <div style={styles.businessContainer} >
          {
            businesses ? businesses.map(b => 
              <div style={styles.business}>
                <div style={styles.name}>
                  {b.name}
                  <span style={styles.address}>
                    {`${b.location.address1}, ${b.location.city} ${b.location.state} ${b.location.country}`}
                  </span>
                </div>
                <div style={styles.reviewHeader}>Reviews</div>
                {b.reviews && b.reviews.map(review => 
                        <div style={styles.review} >
                          { review.user.name }
                          <span style={styles.reviewText}>{review.text}</span>
                        </div>
                )}
              </div>) :
              (error ?
                <div style={styles.challenge}>Not Found</div> :
                (loading ?
                  <div style={styles.challenge}>Loading ...</div> :
                  <div style={styles.challenge}>ADP coding challenge</div>
                )
              )
          }
        </div>  
      </div>
    )
  }
}

const mapActions = dispatch => {
  return {
    requestSearch: bindActionCreators(actionCreators.requestSearch, dispatch)
  }
}

const mapStates = state => {
  console.log('state ', state.search.data)
  return {
    error: state.search.data && state.search.data.Error,
    businesses: state.search.data && state.search.data.data,
    loading: state.search.loading
  }
}

export default connect(mapStates, mapActions)(searchPage)
