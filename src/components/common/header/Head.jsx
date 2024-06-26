import React, { useEffect, useState } from "react"
import logo from '../../../ults/image/logo.png'
import { Button, Link } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Login from "../../../page/login/Login"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import VillaIcon from '@mui/icons-material/Villa';
import FavoriteIcon from '@mui/icons-material/Favorite';
import newRequest from "../../../ults/newRequest";
const Head = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('currentUser')))
  },[])
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/profile')
  };
  const handleRoomBook = () => {
    setAnchorEl(null);
    navigate('/admin/timeTable')
  };
  const handleHotel = () => {
    setAnchorEl(null);
    navigate('/hotelFavourite')
  };
  const handleLogout = () =>{
    setIsLoading(true)
    newRequest.post('/auth/logout').then((res)=>{
      localStorage.removeItem('currentUser')
      setIsLoading(false);
      setError(null);
      console.log(res.data)
      setUser(null)
      navigate('/')
    }).catch((error)=>{
      setError(error)
      console.log(error)
    })
    setAnchorEl(null);
  }
  return (
    <>
      <section className='head'>
        <div className='container flexSB1'>
          <Link to = '/' sx={{textDecoration : 'none', color : 'white'}}>
            <div className='logo'>
              <img src={logo} alt="" srcset="" height={55} />
              <span className="text-black">Trường THPT Tam Giang</span>
            </div>
          </Link>
          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-youtube icon'></i>
            {
              user ? (
                <div>
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Tooltip title="Tài khoản">
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? 'account-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                        >
                        <Avatar style={{textAlign: 'center'}} alt="Remy Sharp" src={user.avatar ? user.avatar : "https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={handleProfile}>
                        <Avatar /> Tài khoản của tôi
                      </MenuItem>
                      <MenuItem onClick={handleRoomBook}>
                        <Avatar><VillaIcon/></Avatar> Thời khoá biểu
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Đăng xuất
                      </MenuItem>
                    </Menu>
                  </React.Fragment> 
                </div>
              ) : (
              <Link to = '/login'>
                <Button variant="outlined" sx={{marginLeft : '10px', color : '#1eb2a6', backgroundColor : '#d2e7ec', border : 'none'}}><Login setUser = {setUser}/></Button>
              </Link>
              )
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
