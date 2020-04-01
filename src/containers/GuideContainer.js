import React, {useState, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
import {Container, GridList, GridListTile} from '@material-ui/core'
import { StateContext, MethodContext } from '../App'
import ItemCard from '../components/ItemCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '30px'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    margin: '15px!important'
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function GuideContainer() {
  const classes = useStyles();
  const {items} = useContext(StateContext)

  const renderItems = () => {
    return items.map(item => {       
      return <GridListTile ><ItemCard item={item} /></GridListTile>
    })
  }

  return (
    
    <div className={classes.root}>
      <Container>
      <div style={{textAlign: 'left'}}><h1>Tops</h1></div>
      <GridList className={classes.gridList} cellHeight={350} cols={2.5}>
        {/* {tileData.map((tile) => ( */}
          <GridListTile>
            <img src={'https://ae01.alicdn.com/kf/HTB1k9wiRFXXXXXvXXXXq6xXFXXX5/GOOD-Quality-5-Color-S-2XL-Plain-T-Shirt-Women-Elastic-Basic-T-shirts-Female-Casual.jpg_640x640.jpg'} />
          </GridListTile>
          <GridListTile >
            <img src={'https://ae01.alicdn.com/kf/HTB1k9wiRFXXXXXvXXXXq6xXFXXX5/GOOD-Quality-5-Color-S-2XL-Plain-T-Shirt-Women-Elastic-Basic-T-shirts-Female-Casual.jpg_640x640.jpg'} />
          </GridListTile>
          <GridListTile >
            <img src={'https://ae01.alicdn.com/kf/HTB1k9wiRFXXXXXvXXXXq6xXFXXX5/GOOD-Quality-5-Color-S-2XL-Plain-T-Shirt-Women-Elastic-Basic-T-shirts-Female-Casual.jpg_640x640.jpg'} />
          </GridListTile>
          <GridListTile >
            <img src={'https://ae01.alicdn.com/kf/HTB1k9wiRFXXXXXvXXXXq6xXFXXX5/GOOD-Quality-5-Color-S-2XL-Plain-T-Shirt-Women-Elastic-Basic-T-shirts-Female-Casual.jpg_640x640.jpg'} />
          </GridListTile>
          <GridListTile >
            <img src={'https://ae01.alicdn.com/kf/HTB1k9wiRFXXXXXvXXXXq6xXFXXX5/GOOD-Quality-5-Color-S-2XL-Plain-T-Shirt-Women-Elastic-Basic-T-shirts-Female-Casual.jpg_640x640.jpg'} />
          </GridListTile>
        {/* ))}
        Hello */}
      </GridList>
      </Container>


      <Container>
      <div style={{textAlign: 'left'}}><h1>Bottoms</h1></div>
      <GridList className={classes.gridList} cellHeight={400} cols={2.5}>
        {renderItems()}
      </GridList>
      </Container>

      </div>
  );
}


            {/* <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${tile.title}`}>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            /> */}
