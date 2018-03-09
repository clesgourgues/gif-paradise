import { connect } from 'react-redux'
import { toggleGif, fetchGifsWithRedux } from '../actions'
import Trending from '../Components/Trending'

const getTrendings = (gifs) => gifs.filter(g => g.favourite)


const mapStateToProps = (state) => ({
  gifs: getTrendings(state.gifs)
})

const mapDispatchToProps =  ({
  onGifClick: toggleGif,
  fetchGifsWithRedux
})

const FavouriteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending)

export default FavouriteList