import React from "react";
import PropTypes from 'prop-types';
import GifView from './GifView';
// import Message from './Message';


export default class Trending extends React.Component {
    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        return (
            <div>
                {/* <Message message={message} /> */}
                <GifView gifs={this.props.gifs} toggleGif={this.props.toggleGif} />
            </div>
        )
    }
}

Trending.propTypes = {
    gifs: PropTypes.array,
    toggleGif: PropTypes.func,
    message: PropTypes.string
}
