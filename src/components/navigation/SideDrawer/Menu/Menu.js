import React from 'react';
import classes from './Menu.module.css';
const Menu = (props) =>{
    return(
        <div onClick = {props.clicked} className = {classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
export default Menu;