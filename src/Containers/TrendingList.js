import { connect } from 'react-redux'
import { toggleGif, fetchGifsWithRedux } from '../actions'
import Trending from '../Components/Trending'


const mapStateToProps = (state) => {
  return {
    gifs: state.gifs,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGifClick: toggleGif,
    fetchData: (search) => dispatch(fetchGifsWithRedux(search))
  }
}


const TrendingList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending)

export default TrendingList