import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import CreateIcon from '@mui/icons-material/Create';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useRouteMatch, Link, Route, Switch } from 'react-router-dom';
import CreateOrder from './CreateOrder/CreateOrder';
import PeopleIcon from '@mui/icons-material/People';
import { Button } from '@mui/material';
import OrderHistory from './OrderHistory/OrderHistory';
import Inventory from './Inventory/Inventory';
import AllOrder from './AllOrder/AllOrder';
import SalesExecutives from './SalesExecutives/SalesExecutives';
import { addToDb } from '../fakedb/fakedb';


const drawerWidth = 200;

function Home(props) {
    const { window, admin, userName, setUser, setUserName, setAdmin } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    let { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogOut = () => {
        setUser(false)
        setUserName('');
        setAdmin(false)
        addToDb('')
    }
    const drawer = (
        <div style={{ textAlign: 'left' }}>

            <h1 style={{ textAlign: 'center' }}>MI</h1>
            {/* <Toolbar /> */}
            <Divider />


            <Link to={`${url}/createorder`} style={{ textDecoration: 'none' }}><Button style={{ width: '100%', color: 'black' }} color="inherit"
                startIcon={<CreateIcon />}  >  Create Order</Button></Link>
            <br />

            {!admin &&
                <div>
                    <Link to={`${url}/orderHistory`} style={{ textDecoration: 'none' }}><Button style={{ width: '100%', color: 'black' }} color="inherit"
                        startIcon={<LocalMallIcon />}  >  Order History</Button></Link>
                    <br />
                </div>
            }
            {/* for admin */}
            {admin && <div>
                <Link to={`${url}/inventory`} style={{ textDecoration: 'none' }}><Button color="inherit" style={{ width: '100%', color: 'black' }}
                    startIcon={<LocalMallIcon />}  >  Inventory</Button></Link>
                <br />
                <Link to={`${url}/salesExecutives`} style={{ textDecoration: 'none' }}><Button color="inherit" style={{ width: '100%', color: 'black' }}
                    startIcon={<PeopleIcon />}  > Sales Executives</Button></Link>
                <br />
                <Link to={`${url}/allorder`} style={{ textDecoration: 'none' }}><Button color="inherit" style={{ width: '100%', color: 'black' }}
                    startIcon={<LocalMallIcon />}  > All Order</Button></Link>
                <br />
            </div>
            }
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                style={{ background: '#2E3B55' }}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }, height: '80px'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'right', marginTop: '10px' }}>
                        <button
                            onClick={handleLogOut}
                            style={{ padding: '10px', fontSize: '25px', cursor: 'pointer', background: '#feeaeb', borderRadius: '40px', color: 'red' }}>Logout</button>
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    <Route exact path={`${path}`}>
                        <CreateOrder />


                    </Route>
                    <Route path={`${path}/createorder`}>
                        <CreateOrder
                            userName={userName}
                        />

                    </Route>
                    <Route path={`${path}/orderHistory`}>
                        <OrderHistory
                            userName={userName}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />

                    </Route>
                    <Route path={`${path}/inventory`}>
                        <Inventory
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    </Route>
                    <Route path={`${path}/allOrder`}>
                        <AllOrder
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    </Route>
                    <Route path={`${path}/salesExecutives`}>
                        <SalesExecutives
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                        />
                    </Route>

                </Switch>

            </Box>
        </Box>
    );
}

Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Home;
