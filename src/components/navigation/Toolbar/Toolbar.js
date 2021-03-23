import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../navigation/NavigationItems/NavigationItems';
import MenuBar from '../SideDrawer/Menu/Menu';
const Toolbar = (props) =>{
    return (
               <header className = {classes.Toolbar}>
                   <MenuBar clicked = {props.ToggleDrawer}/>
                   <div className = {classes.Logo}>
                   <Logo/>
                   </div>
                   <div className = {classes.DesktopOnly}>
                   <NavigationItems isAuth = {props.isAuth}/>
                   </div>

               </header>
    )
}
export default Toolbar;