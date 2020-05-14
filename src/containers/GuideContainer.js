import React, {useState, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
import {Container, GridList, GridListTile} from '@material-ui/core'
import { DispatchContext, MethodContext } from '../App'
import ItemCard from '../components/ItemCard';
import AddItemModal from '../components/AddItemModal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '30px',
    textAlign: "center"
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
  guideCard: {
    width: "30%!important"
  },
  catBlock: {
    marginBottom: "20px"
  },
  catTitle: {
    textAlign: "center"
  },
  // recText: {
  //   textAlign: "center"
  // }
}));


export default function GuideContainer() {
  const { formItemDispatch } = useContext(DispatchContext)
  const { setOpenItemModal } = useContext(MethodContext)
  const classes = useStyles();
  const items = [

    //bottoms needed id's: none
    {id: 1, category: "Bottoms", sub_category: "Skinny Jeans", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/c45c14860f0f5508ee57d45f4ccd4f4cf1a41942.jpg", recommended: 2}, 
    {id: 2, category: "Bottoms", sub_category: "Black Pants", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/d400a3e79f00e1b82b38b12a51a2848ac8b5aacd.jpg", recommended: 1},
    {id: 3, category: "Bottoms", sub_category: "Leggings", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1543261934/bghovmmboe1wpje4nrg6.jpg", recommended: 2},
    {id: 4, category: "Bottoms", sub_category: "Shorts", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1516835637/k4fzci7rzkinzkyr2emv.jpg", recommended: 2},
    {id: 5, category: "Bottoms", sub_category: "Skirts", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1552002877/lv6rxinmxin1ucqxm88s.jpg", recommended: 1},
    {id: 6, category: "Bottoms", sub_category: "Colored/Patterned Pants", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1539907057/gytxovkfgcgk5fcmows0.jpg", recommended: 1},


    //tops needed: none
    {id: 7, category: "Tops", sub_category: "Tank Shirt", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/curatedquestion/1712660113m61q2n8vhu1futgij0iq.jpg", recommended: 3},
    {id: 8, category: "Tops", sub_category: "White Top", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1522277051/wfw5mj3mgogy3mrgmrnk.jpg", recommended: 2},
    {id: 9, category: "Tops", sub_category: "Patterned Shirt", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1562023879/s2fpir9reuakaq0jhwj7.jpg", recommended: 1},
    {id: 10, category: "Tops", sub_category: "Sweater", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1536876127/ul7mjeehwocxbt7mcpvs.jpg", recommended: 2},
    {id: 11, category: "Tops", sub_category: "Flannel Shirt", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1513801349/x7pbaa9fzotsbo0q8w4q.jpg", recommended: 1},
    {id: 12, category: "Tops", sub_category: "Blouse", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1532648921/lbnfftnw6q3slbhmajgk.jpg", recommended: 2},
    {id: 13, category: "Tops", sub_category: "Button-down Chambray", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1554318000/nbuslqyzsmvrljmrpuv8.jpg", recommended: 1},
    {id: 14, category: "Tops", sub_category: "Cardigan", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1570469575/bixnkrjctrnjzqrb2jrh.jpg", recommended: 2},

    //outerwear 16, 19
    {id: 15, category: "Outerwear", sub_category: "Sweatshirt", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1569009885/sqx8lpwa6rk6jbynwpht.jpg", recommended: 1},
    {id: 16, category: "Outerwear", sub_category: "Denim Jacket", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/curatedquestion/2026577856fyjwv5v0rtvxurxopngr.jpg", recommended: 1},
    {id: 17, category: "Outerwear", sub_category: "Blazer", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1552955674/yoyycjsfsol6xeexuzly.jpg", recommended: 1},
    {id: 18, category: "Outerwear", sub_category: "Trench Coat", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1573683624/oi7wplabpsptrauh7b0a.jpg", recommended: 1},
    {id: 19, category: "Outerwear", sub_category: "Outerwear Coat", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1575329752/atby6qeop4ocgvh1smg5.jpg", recommended: 1},

    //dresses 21
    {id: 20, category: "Dresses", sub_category: "Shirt Dress", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/curatedquestion/1784618648bfs6b8pzwd4mtx0m3ow5.jpg", recommended: 2},
    {id: 21, category: "Dresses", sub_category: "Sweater Dress", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/curatedquestion/1893015359y9l8zt3ulfsphlx3oltt.jpg", recommended: 1},
    {id: 22, category: "Dresses", sub_category: "Print Dress", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/5083f825ec3e093939eba6bb651fdca66b50446b.jpg", recommended: 1},

    //shoes 23,25
    {id: 23, category: "Shoes", sub_category: "Tall Boots", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1575671949/sbdvagkfup5n1ucpobum.jpg", recommended: 1},
    {id: 24, category: "Shoes", sub_category: "Short Boots", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1563315888/roaw8eljgrkldldckrwc.jpg", recommended: 1},
    {id: 25, category: "Shoes", sub_category: "Wedges", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/bc7a12d318b6e562bea00b899c0bd62567c7f108.jpg", recommended: 1},
    {id: 26, category: "Shoes", sub_category: "Flats", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/curatedquestion/2050236294vqswojygm1wcxzkfc9bj.jpg", recommended: 1},
    {id: 27, category: "Shoes", sub_category: "Sandals", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/v1579294632/lwmzhwz3gqunstzquagh.jpg", recommended: 1},
    {id: 28, category: "Shoes", sub_category: "Sneakers", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/1c7f98b03dcf60c8c01e3b3916b3fbca7d8192a2.jpg", recommended: 1},

    //accessories 29,30,31,32
    {id: 29, category: "Accessories", sub_category: "Neutral Purse", image: "https://images-na.ssl-images-amazon.com/images/I/81yR367%2BfuL._AC_UX395_.jpg", recommended: 1},
    {id: 30, category: "Accessories", sub_category: "Sunhat", image: "https://ae01.alicdn.com/kf/HTB1HLhMa5zxK1RkSnaVq6xn9VXaC/2019-simple-Foldable-Wide-Brim-Floppy-Girls-Straw-Hat-Sun-Hat-Beach-Women-Summer-Hat-UV.jpg", recommended: 1},
    {id: 31, category: "Accessories", sub_category: "Winter Hat", image: "https://m.media-amazon.com/images/I/71Te6C2YDsL._SR700,525_.jpg", recommended: 1},
    {id: 32, category: "Accessories", sub_category: "Sunglasses", image: "https://www.dhresource.com/600x600/f2/albu/g7/M01/C1/21/rBVaSVvtiFmAPpetAADbs5UnPmA683.jpg", recommended: 1},
    {id: 33, category: "Accessories", sub_category: "Scarves", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/6eb57b561cf6cecda355ab4c587efed8a9457c91.jpg", recommended: 2},
    {id: 34, category: "Accessories", sub_category: "Choice of Jewelry", image: "https://res.cloudinary.com/stitch-fix-mobile/image/fetch/e_trim/b_white,c_pad,h_500,q_auto,w_500/bo_10px_solid_white/https://d1t26lkqdk7zjd.cloudfront.net/curatedquestion/2116427742owftzpluhunyo9jbekzn.jpg", recommended: 2},
  ]

  const categories = ["Tops", "Bottoms", "Outerwear", "Dresses", "Shoes", "Accessories"]

  const renderItems = (category) => {
    return items.map(item => {
      if (item.category === category) {       
      return <GridListTile className={classes.guideCard}><ItemCard item={item} handleClick={addToCloset} buttonText={'Add to Closet'} recommendedText={'Recommended: '} className={classes.recText}/></GridListTile>
      }
    })
  }

  const addToCloset = (id) => {
    let item = items[id-1]
    formItemDispatch({type: 'SET_ITEM', payload: item})
    setOpenItemModal(true)
  }

  const renderCategoriesBlock = () => {
    return categories.map(category => {
      return <Container className={classes.catBlock}>
        <div style={{textAlign: 'left'}}><h2 className={classes.catTitle}>{category}</h2></div>
        <GridList className={classes.gridList} cellHeight={360} cols={2.5}>
          {renderItems(category)}
        </GridList>
      </Container>
    })
  }

  return (
    
    <div className={classes.root}>
      {renderCategoriesBlock()}
      <AddItemModal />
      </div>
  );
}

