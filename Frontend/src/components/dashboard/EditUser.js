//import { Fragment } from "react"
import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types';
//import { register } from "../../actions/auth";
import './Profile.css'
//import UserNav from "../layout/UserNav";


export const EditUser= ({setAlert,auth:{user}}) => {
    var e=localStorage.getItem('email');
    useEffect(() => {
        async function fetchData() {
          const req = await axios.post('http://localhost:5000/api/profile/me',{email:e});
          var string=JSON.stringify(req.data);
          var json =  JSON.parse(string);
          //console.log(json[0].uname);
          //console.log(json[0].mobile);
          setFormData(json[0])
        }
  
        fetchData();
      }, [])
    const [formData, setFormData] = useState(
        {
        email:e,
        uname: '',
        password: '',
        confpassword:'',
        city: '',
        mobile: '',
        dateofbirth:'',
        address:'',
        country:'',
        picture:'',
        gender:''
    });
   
    const {email,uname,password,confpassword,city,mobile,address,dateofbirth,country,picture,gender} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});

    

    const onSubmit = async e => {
        if(password !== confpassword){
            alert('Passwords not matched!');
        }
        else{
        e.preventDefault();
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({email,uname,password,city,mobile,address,dateofbirth,country,picture,gender});
            console.log(body);
            const req = await axios.put('http://localhost:5000/api/profile/changeprofile',body,config);
      
            console.log(req.data); 
            if(req.data!=='failure'){
                alert("Data Updated successfully")
            }
        }
    }

    return (
//className="signup-form" onSubmit={e => onSubmit(e)}
<body>
<br></br>
           
<div class="col-xl-8 order-xl-1 main">
<br></br>
<div class="card bg-secondary shadow">
  <div class="card-header bg-white border-0">
    <div class="row align-items-center">
      <div class="col-8">
        <h3 class="mb-0">Edit details</h3>
      </div>
      
    </div>
  </div>
  <div class="card-body">
    <form className="signup-form" onSubmit={e => onSubmit(e)}>
      <h6 class="heading-small text-muted mb-4">User information</h6>
      <div class="pl-lg-4">
        <div class="row">
          <div class="col-lg-6">
          <h3>Profile Picture</h3>
          <label htmlFor="photo-upload" className="custom-file-upload fas">
        <div className="img-wrap img-upload" >
      <img for="photo-upload" src='https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true' height='80' weight ='80' alt=''/>
    </div>
    <input id="photo-upload" type="file" value={picture} onChange={e => onChange(e)}/>
  </label>
  </div>
  <div class="row">
          <div class="col-lg-6">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="uname"><b>Username</b></label>
             <input class="form-control form-control-alternative" 
             type="text" 
             placeholder="Enter Username"
             name='uname'
             value={uname}
             onChange={e => onChange(e)}
          required
       />  
            </div>
            </div>
          <div class="col-lg-6">
            <div class="form-group">
            <label class="form-control-label" htmlFor="email"><b>Email</b></label>
           <input  class="form-control form-control-alternative" 
              type="email" 
              placeholder="user@gmail.com" 
              value={email}
              name="email"
              onChange={e => onChange(e)}
              required
     />   
            </div>
          </div>
        </div>
       
        <div class="row">
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label  class="form-control-label" for="Gender"><b>Gender</b></label>
  <input type="radio" id="male" name="gender" value="male" onChange={e => onChange(e)}/>
  <label for="male">Male</label>
  <input type="radio" id="female" name="gender" value="female" onChange={e => onChange(e)}/>
  <label for="female">Female</label>
</div>
</div>
<div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="city"><b>City</b></label>
             
             <input class="form-control form-control-alternative"
             type="text" 
             placeholder="enter city"
             value={city} 
             name='city'
             onChange={e => onChange(e)}/>
            </div>
          </div>
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="mobile"><b>Mobile</b></label>
    <input class="form-control form-control-alternative" 
              type="text" 
              placeholder="Enter mobile number" 
              value={mobile}
              name='mobile'
              onChange={e => onChange(e)}
              required
     />   
            </div>
          </div>
        </div>
      </div>
        <div class="row">
        <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="dateofbirth"><b>Date of Birth</b></label>
 
      <input class="form-control form-control-alternative"
             type="date" 
             value={dateofbirth}
             name='dateofbirth'
             onChange={e => onChange(e)}
             //required
    />   
            </div>
          </div>
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
            <label class="form-control-label" htmlFor="Address"><b>Address</b></label>
           <input  class="form-control form-control-alternative"  
              type="text" 
              placeholder="Enter Address" 
              value={address}
              name='address'
              onChange={e => onChange(e)}
              //required
     />  
            </div>
          </div>
          <div class="col-lg-6" className="form-group">
            <div class="form-group focused">
          <label class="form-control-label" htmlFor="country"><b>Country</b></label>
             
             <select class="form-control form-control-alternative" 
             value={country} 
             name='country'
             onChange={e => onChange(e)}>
            <option value="usa">Unitedstatesofamerica</option>
             <option value="india">India</option>
             <option value="pakistan">Pakistan</option>
             <option value="china">China</option>
             <option value="russia">Russia</option>
             <option value="japan">Japan</option>
             <option value="brazil">Brazil</option>
           </select>
           </div>
           </div>
        </div>
        <div className="form-group">
            <label htmlFor="password"><b>Password</b></label>
            <input  className='form-control' 
                        type="password" 
                        placeholder="min8chars@6" 
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        //required 
            />   
            </div>

            <div className="form-group">
            <label htmlFor="confpassword"><b>Confirm Password</b></label>
            <input  className='form-control' 
                        type="password" 
                        placeholder="min8chars@6" 
                        name="confpassword"
                        value={confpassword}
                        onChange={e => onChange(e)}
                       // required 
            />   
            </div>
      
      <div className="form-group" >
          <input type="submit"  className="form-submit"  />
  </div>
  </div>
    </form>
  </div>
  </div>
  </div>
  </body>
    )
}

EditUser.propTypes = {
    setAlert: PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
};


const mapStateToProps = state =>({
    auth: state.auth,
});

export default connect(mapStateToProps, {setAlert})(EditUser);
