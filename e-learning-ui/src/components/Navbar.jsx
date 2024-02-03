import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from "../assets/logoslog.png"
import { Link ,useHistory} from "react-router-dom"
import { Avatar } from '@material-ui/core';
import Axios from "axios"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

//css
const useStyles = makeStyles((theme) => ({

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    // width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: 300
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavigationBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory()   // instance pour naviger dans l'application

  const isMenuOpen = Boolean(anchorEl);   // pour ouvrir et fermer le menu du profile
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const user = JSON.parse(localStorage.getItem("user"))   // objet de user a partir du localStorage
  const teacher = JSON.parse(localStorage.getItem("teacher"))  // objet de teacher a partir du localStorage


  const MySwal = withReactContent(Swal);
const MySwal2 = withReactContent(Swal);
const MySwal3 = withReactContent(Swal);


/**********************************************************/

  const [formdata, setformdata] = useState();
    

  const HandleclickUser = () => {   // pop up du changement des information de l'utilisateur
    let userPopup ={
      title: 'Edit user profile',
      html:
          '<span>Username</span>'+
          '<input id="username" class="swal2-input" value="'+user.username+'" placeholder="Username" >' +
          '<span>Email</span>'+
          '<input id="email" class="swal2-input" value="'+user.email+'" placeholder="Email" >' +
          // "<p style='color:red' >PS: Leave the password fields empty if you don't want to change it</p>" +
          '<span>Password</span>'+
          '<input id="password1" class="swal2-input" placeholder="Password" type="password" >' +
          '<span>Retype password</span>'+
          '<input id="password2" class="swal2-input" placeholder="Repeat password" type="password">',
      inputAttributes: {
          autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: () => ({
          
            username : document.getElementById('username').value,
            email : document.getElementById('email').value,
            password1 : document.getElementById('password1').value,
            password2 : document.getElementById('password2').value,
          
    })
  }
  const Popup = async () => {
    const swalval = await MySwal.fire(userPopup);
    let v = swalval && swalval.value || swalval.dismiss;
    if (v && v.email && v.username && v.password1 && v.password2 || v === 'cancel') {   // tester l'exitance des champs
      if (v.password1 !== v.password2) {
        await MySwal.fire({ type: 'error', title: 'Passwords do not match!' });  // erreur au cas ou les mdp ne sont pas identiques 
        Popup();
      } else if (v !== 'cancel')  {

        setformdata(swalval);

        await fetch("http://localhost:5555/users/"+ user._id, {   // faire la mise a jour
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username : v.username,
              email : v.email,
              password : v.password1
            })
        })

        fetch("http://localhost:5555/users/"+ user._id )
        .then(resp=> resp.json())    
        .then(resp => localStorage.setItem("user",JSON.stringify(resp)))   // metre a jour le user dans le localStorage
            

      }
    } else {
      await MySwal.fire({ type: 'error', title: 'All fields are required!!' });  // erreur au cas les champs sont vide
      Popup();
    }
  }
  Popup();
  }
  /************************************************************************** */


  const [formdata2, setformdata2] = useState();


  

  const HandleclickTeacher = () => {  //pop up du changement des informations du tutor
    let teacherPopup1 ={
      title: 'Edit teacher profile',
      html:
        '<span>Occupation</span>'+
          '<input id="occupation" class="swal2-input" value="'+teacher.occupation+'" placeholder="Current Occupation">' +
          '<span>Skills</span>'+
          '<input id="skills" class="swal2-input" value="'+teacher.skills+'" placeholder="Skills">' +
          '<span>Description</span>'+
          '<textarea id="description" class="swal2-input" style="height:100px" placeholder="Small Profile Description">'+teacher.description+'</textarea>',
      inputAttributes: {
          autocapitalize: 'off'
      },
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      preConfirm: () => ({
            occupation : document.getElementById('occupation').value,
            skills: document.getElementById('skills').value,
            description :  document.getElementById('description').value,
     })
}

let teacherPopup2 ={
      title: 'Edit teacher profile',
      html:
          '<input id="image" type="file" class="swal2-input" placeholder="Put your image">',
      inputAttributes: {
          autocapitalize: 'off'
      },
      confirmButtonText: 'Save',
      preConfirm: () => ({
            image : document.getElementById('image').files,
     })
}
       let data = new FormData() 

      const Popup3 = async (t) => {
      const swalval3 = await MySwal3.fire(teacherPopup2);

      let v = swalval3 && swalval3.value || swalval3.dismiss;

      if(v!='cancel'){    // uploader le photo de profile du teacher dans le cloud et dans la db ainsi que ses informations
          if (v && v.image ) {
            data.append("cloud_name", "firas1230")
            data.append("upload_preset", "e-learning")
            data.append("file", v.image[0])
            Axios.post("https://api.cloudinary.com/v1_1/firas1230/image/upload",data)
                .then((data) => {
                    fetch("http://localhost:5555/teachers/"+teacher._id, {
                        headers: {
                            "content-type": "application/json"
                        },
                        method: "PATCH",
                        body: JSON.stringify({
                            skills : t.skills,
                            description : t.description,
                            profileImage: data.data.url,
                            fullName:t.fullName,
                            birthday:t.birthday,
                            cv:t.cv,
                            occupation:t.occupation,
                            skills:t.skills,
                            description:t.description,
                            courses:t.courses
                        })
                    })
                        .then( ()=>{
                          fetch("http://localhost:5555/teachers/getTeacher/"+ t._id )
                          .then(resp=> resp.json())    
                          .then(resp => localStorage.setItem("teacher",JSON.stringify(resp)))  // mettre a jour le localStorage de teacher
                          
                        }
                        )
                })
             
            }
        else {
        await MySwal3.fire({ type: 'error', title: 'All fields are required!!' });
        Popup3();
        }
      }
    }



  const Popup2 = async () => {   // fonction qui met a jour les infos du tutor 
    const swalval1 = await MySwal2.fire(teacherPopup1);
    let v = swalval1 && swalval1.value || swalval1.dismiss;
    console.log("v",v)
    console.log("v.occupation",v.occupation)
    console.log("v.skills",v.skills)
    console.log("v.description",v.description)
    if(v!='cancel'){
        if (v && v.occupation && v.skills && v.description ) {
            setformdata2(swalval1);
            await fetch("http://localhost:5555/teachers/"+ teacher._id, {   // metre a jour les infos du teacher dans le db
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  occupation : v.occupation,
                  skills : v.skills,
                  description : v.description
                })
            }).then(()=>{
              fetch("http://localhost:5555/teachers/getTeacher/"+ teacher._id )
            .then(resp=> resp.json())
            // .then((data)=> console.log(data) )    
            // .then(data => localStorage.setItem("teacher",JSON.stringify(data)))
            .then((data)=> Popup3(data))
            })
          }
      else {
      await MySwal2.fire({ type: 'error', title: 'All fields are required!!' });
      Popup2();
      }
    }
  }
  Popup2();
  }


  /************************************************************************ */

  useEffect(()=>{
    if(user){
      fetch(" http://localhost:5555/cart/byuser/"+user._id)
      .then(resp => resp.json())
      .then(data => {
        const a = Array(data)[0]
        // props.setCartCount(a.length)
        console.log(a)
      })
      .catch(e => console.log(e))
    }
  },[user])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const logout = ()=>{  // la fonction qui fait le logout de l'utilisateur
  // effacer les données du localStorage 
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("teacher")
    // redirection vers la page login
    history.push("/login")
  }

  const search = (e)=>{   // fonction pour activer la barre de recherche lorsque l'utilisateur press la touche entrer
    if(e.key === "Enter"){
      history.push("/search")
    }
  }

 
  


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      style={{marginTop:50}}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/profile" style={{textDecoration:"none"}}>Profile</Link></MenuItem>
      {localStorage.getItem("teacher") ?
      <MenuItem onClick={handleMenuClose}><Link to="/teacher-profile" style={{textDecoration:"none"}}>Teacher Profile</Link></MenuItem> : null }
      <MenuItem onClick={()=>{HandleclickUser();handleMenuClose()}}>Edit your profile</MenuItem>
      {localStorage.getItem("token") ? 
      <MenuItem onClick={()=>{HandleclickTeacher();handleMenuClose()}}>Edit teacher profile</MenuItem> : null }
      <MenuItem onClick={()=>{handleMenuClose();logout()}} ><Link to="/login" style={{textDecoration:"none"}}>Logout</Link></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} id="nav">
      
      <AppBar position="fixed" style={{ background:props.background }} className="appbar">

        <Toolbar >


          <Link to="/"><img src={logo} alt="logo" style={{ width: 200, height: 120 }} /></Link>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              style={{width:"100%"}}
              onKeyPress={e => search(e)}
              onChange={e => props.setsearchtitle(e.currentTarget.value)}
            />
          </div>


          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/categories" className="link"><Button style={{ background: 'rgba(255, 255, 255, 0.6)', margin: "10px" }}>Categories</Button></Link>
            { user ? null : <Link to="/login" className="link"><Button style={{ background: 'rgba(255, 255, 255, 0.6)', margin: "10px" }}>Login</Button></Link>}
            { user ? null : <Link to="/signup" className="link"><Button style={{ background: 'rgba(255, 255, 255, 0.6)', margin: "10px" }}>Sign Up</Button></Link>}
            { user ? teacher? null :<Link to="/teacher-signup" className="link"><Button style={{ background: 'rgba(255, 255, 255, 0.6)', margin: "10px 30px" }}>Become a Teacher</Button></Link> : null}
            {!teacher? null :<Link to="/course-upload" className="link"><Button style={{ background: 'rgba(255, 255, 255, 0.6)', margin: "10px 30px" }}>Add a course</Button></Link>}
            {/* <Link to="/" className="link"><IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton></Link> */}
            {user ? <Link to="/cart" className="link"><IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={props.cartCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton></Link> : null }
            {!user ? null :<h3 style={{ padding: "0 10px",fontFamily:"Proxima" }}>{user ? (user.profileImage ? user.user_id.username : user.username) :"" }</h3>}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {!user ? null : (teacher ? <Avatar alt="xx xx" src={teacher.profileImage} className={classes.large}></Avatar>:  <Avatar alt="user" className={classes.large}>{user.username[0]}</Avatar>)}

            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}