import { connect } from 'react-redux'
import { toggleGif, fetchGifsWithRedux } from '../actions'
import Favourites from '../Components/Favourites'

const getFavourites = (gifs) => gifs.filter(g => g.favourite)

const mapStateToProps = (state) => ({
  gifs: getFavourites(state.gifs)
})

const mapDispatchToProps =  ({
  onGifClick: toggleGif,
  fetchGifsWithRedux 
})

const FavouriteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites)

export default FavouriteList
