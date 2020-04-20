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


export default function GuideContainer() {
  const { formItemDispatch } = useContext(DispatchContext)
  const { setOpenItemModal } = useContext(MethodContext)
  const classes = useStyles();
  const items = [
    {id: 1, category: "Bottoms", sub_category: "Skinny Jeans", image: "https://di2ponv0v5otw.cloudfront.net/posts/2019/03/26/5c9abb21819e905c41c89d84/m_5cf5498aadb58d43afc7b01e.jpg", recommended: 2}, 
    {id: 2, category: "Bottoms", sub_category: "Black Pants", image: "https://slimages.macysassets.com/is/image/MCY/products/9/optimized/10024439_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$", recommended: 1},
    {id: 3, category: "Bottoms", sub_category: "Leggins", image: "https://target.scene7.com/is/image/Target/GUEST_60774d13-e124-458a-9116-f83ccdf9b7a2?wid=488&hei=488&fmt=pjpeg", recommended: 2},
    {id: 4, category: "Bottoms", sub_category: "Shorts", image: "https://www.rei.com/media/product/1477670013", recommended: 2},
    {id: 5, category: "Bottoms", sub_category: "Skirts", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRNGagze-SVbL_DPEjLe-0sTj0h-KPGJ9ZkgUXOnUe9kY-zVPVdL2HZV1MkIw3Ho97h4f8sJFqd&usqp=CAc", recommended: 1},
    {id: 6, category: "Bottoms", sub_category: "Colored/Patterned Pants", image: "https://img.ltwebstatic.com/images3_pi/2019/11/04/157285025580cbb6ab1576ec597dc21578b68e0f70_thumbnail_600x.webp", recommended: 1},
    {id: 7, category: "Tops", sub_category: "Tank Shirt", image: "https://images-na.ssl-images-amazon.com/images/I/71RsYRySFZL._UY606_.jpg", recommended: 3},
    {id: 8, category: "Tops", sub_category: "White Top", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuqJzP9U0e6_VNdXAjhBjv9J4s7J47s-4Ha-cEtls5dIuJedmY7uy5Bi7mJ0A&usqp=CAc", recommended: 2},
    {id: 9, category: "Tops", sub_category: "Patterned Shirt", image: "https://rhalyns.com/wp-content/uploads/2018/01/YUETONGME-2017-new-Couture-Black-and-white-striped-long-sleeved-T-shirt-women-slim-fit-raglan.jpg_640x640.jpg", recommended: 1},
    {id: 10, category: "Tops", sub_category: "Sweater", image: "https://images-na.ssl-images-amazon.com/images/I/614N4LWAUsL._AC_UX679_.jpg", recommended: 2},
    {id: 11, category: "Tops", sub_category: "Flannel Shirt", image: "https://i5.walmartimages.com/asr/8ee5f14f-50b5-46c0-a9d3-f9b0540c7779_1.6cb83207f0db298fb237c64a75c4c8ad.jpeg?odnWidth=450&odnHeight=450&odnBg=ffffff", recommended: 1},
    {id: 12, category: "Tops", sub_category: "Blouse", image: "https://images-na.ssl-images-amazon.com/images/I/711X%2BOJAnuL._AC_UX342_.jpg", recommended: 2},
    {id: 13, category: "Tops", sub_category: "Button-down Chambray", image: "https://images-na.ssl-images-amazon.com/images/I/71RsYRySFZL._UY606_.jpg", recommended: 1},
    {id: 14, category: "Tops", sub_category: "Cardigan", image: "https://cfcdn.zulily.com/images/cache/product/452x1000/393598/zu81256496_main_tm1568837476.jpg", recommended: 2},
    {id: 15, category: "Outerwear", sub_category: "Sweatshirt", image: "https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Zine-Matilda-Black-Zip-Up-Hoodie-_268035.jpg", recommended: 1},
    {id: 16, category: "Outerwear", sub_category: "Denim Jacket", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjoDCNKzf7piZ9MrtDGZ4_QyERpMT9VUE2KpO7ZbPz6_4cUh4KryR_ovlxLoGodMREdtT4tmIF&usqp=CAcg", recommended: 1},
    {id: 17, category: "Outerwear", sub_category: "Blazer", image: "https://images.beautifulhalo.com/images/392x588/201908/X/women-s-fashion-notched-lapel-tailored-black-blazer-coat_1566151972553.jpg", recommended: 1},
    {id: 18, category: "Outerwear", sub_category: "Trench Coat", image: "https://img-static.tradesy.com/item/8001889/black-women-s-double-breasted-wool-jacket-belted-blazer-trench-coat-size-12-l-2-1-960-960.jpg", recommended: 1},
    {id: 19, category: "Outerwear", sub_category: "Outerwear Coat", image: "https://simages.ericdress.com/Upload/Image/2017/47/watermark/5b250eaf-92f3-4a5e-ab32-e47b190219ba.jpg", recommended: 1},
    {id: 20, category: "Dresses", sub_category: "Shirt Dress", image: "https://m.media-amazon.com/images/I/61UrHKAUHIL._SR500,500_.jpg", recommended: 2},
    {id: 21, category: "Dresses", sub_category: "Sweater Dress", image: "https://www.pinkqueen.com/upload/thumb/540x540/goodsimport/2019-07/PSE2789GY_3.jpg", recommended: 1},
    {id: 22, category: "Dresses", sub_category: "Print Dress", image: "https://www.lulus.com/images/product/xlarge/3678530_721512.jpg", recommended: 1},
    {id: 23, category: "Shoes", sub_category: "Tall Boots", image: "https://images.timberland.com/is/image/timberland/A1ATF636-HERO?$PDP-FULL-IMAGE$", recommended: 1},
    {id: 24, category: "Shoes", sub_category: "Short Boots", image: "https://i.pinimg.com/originals/ff/a9/83/ffa98312d51b34c64b2ceeadb941261e.jpg", recommended: 1},
    {id: 25, category: "Shoes", sub_category: "Wedges", image: "https://cdn-img.prettylittlething.com/a/b/4/a/ab4ae07995ac1979f42b2515b0c7622678158ef7_cma7420_1.jpg", recommended: 1},
    {id: 26, category: "Shoes", sub_category: "Flats", image: "https://i.frg.im/Qzz3o6f/122904211703-0_600.jpg?v=1515409422.027", recommended: 1},
    {id: 27, category: "Shoes", sub_category: "Sandals", image: "https://cdn.shopify.com/s/files/1/1117/9124/files/Screenshot_8.jpg?14168670541966121986", recommended: 1},
    {id: 28, category: "Shoes", sub_category: "Sneakers", image: "https://www.depthlog.com/images/large/womens%20nike%20sneakers-827opg.jpg", recommended: 1},
    {id: 29, category: "Accessories", sub_category: "Neutral Purse", image: "https://images-na.ssl-images-amazon.com/images/I/81yR367%2BfuL._AC_UX395_.jpg", recommended: 1},
    {id: 30, category: "Accessories", sub_category: "Sunhat", image: "https://ae01.alicdn.com/kf/HTB1HLhMa5zxK1RkSnaVq6xn9VXaC/2019-simple-Foldable-Wide-Brim-Floppy-Girls-Straw-Hat-Sun-Hat-Beach-Women-Summer-Hat-UV.jpg", recommended: 1},
    {id: 31, category: "Accessories", sub_category: "Winter Hat", image: "https://m.media-amazon.com/images/I/71Te6C2YDsL._SR700,525_.jpg", recommended: 1},
    {id: 32, category: "Accessories", sub_category: "Sunglasses", image: "https://www.dhresource.com/600x600/f2/albu/g7/M01/C1/21/rBVaSVvtiFmAPpetAADbs5UnPmA683.jpg", recommended: 1},
    {id: 33, category: "Accessories", sub_category: "Scarves", image: "https://i.etsystatic.com/10585666/r/il/9df449/1913983629/il_794xN.1913983629_a7cj.jpg", recommended: 2},
    {id: 34, category: "Accessories", sub_category: "Choice of Jewelry", image: "https://i.pinimg.com/originals/b9/da/5f/b9da5f7972f8d1eea6bb7c872c2c7f56.jpg", recommended: 2},
  ]

  const categories = ["Tops", "Bottoms", "Outerwear", "Dresses", "Shoes", "Accessories"]

  const renderItems = (category) => {
    return items.map(item => {
      if (item.category === category) {       
      return <GridListTile ><div className='guide-image-div'><ItemCard item={item} handleClick={addToCloset} buttonText={'Add to Closet'} recommendedText={'Recommended: '}/></div></GridListTile>
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
      return <Container>
        <div style={{textAlign: 'left'}}><h2>{category}</h2></div>
        <GridList className={classes.gridList} cellHeight={450} cols={2.5}>
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

