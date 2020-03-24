import React, {useState} from 'react'
import { Container, Grid, Drawer } from '@material-ui/core';
import OutfitDrawer from '../components/OutfitDrawer';

export default function ClosetContainer(){
    const [open, setOpen] = useState(true)


    return (
    <Container>
        <OutfitDrawer />
        <Grid>

        </Grid>
    </Container>
    )
} 

