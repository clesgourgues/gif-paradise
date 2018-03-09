import React from "react";
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';
import { Tooltip, Grid, Block, Button, Inline } from 'reas';
import FaHeart from 'react-icons/lib/fa/heart'
import FaBookmark from 'react-icons/lib/fa/bookmark'

const GifItem = ({ gif, toggleGif }) => {
    const iconColor = gif.favourite ? '#e12D53' : '#333';
    return (
        <li className="card" key={gif.id}>
            <img className="loading" src={gif.url} alt={gif.title} />
            <Block className="card-body">
                <Grid columns="60% 1fr" rows="30px 30px" gap="10px 20px">
                    <Grid.Item column='1 / span 2'>
                        <Inline>{gif.title}</Inline>
                    </Grid.Item>
                    <Grid.Item columnStart={2}>
                        <Block className='card-actions'>
                            <Button backgroundColor="transparent" border="none">
                                <FaHeart color={iconColor} onClick={() => { toggleGif(gif) }} />
                                <Tooltip>Add or remove to your favourites</Tooltip>
                            </Button>
                            <Clipboard data-clipboard-text={gif.url}>
                                <Button backgroundColor="transparent" border="none">
                                    <FaBookmark size={16} />
                                </Button>
                            </Clipboard>
                            <Tooltip>Copy the gif url</Tooltip>
                        </Block>
                    </Grid.Item>
                </Grid>
            </Block>
        </li>
    );
}

GifItem.propTypes = {
    gif: PropTypes.object,
    toggleGif: PropTypes.func
}

export default GifItem;
