import React, { useState, Fragment,useEffect } from "react";
import MetaData from "../layout/MetaData";
//import "./Search.css";
import { useParams, Redirect} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {getShopDetails} from "../../actions/shopAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import ShopProduct from './ShopProduct';
import { Modal, Button } from "react-bootstrap";
import { createProduct } from "../../actions/shopAction"
import { Image } from 'cloudinary-react'
import axios from 'axios';
//import "./Profile.css";


const ShopDetails = ({ history }) => {

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const alert = useAlert();
      let { shopname } = useParams();
      const{loading,shopdetails,shopsalesrevenue} = useSelector((state)=>state.shopdetail);
      const{user} =useSelector((state) =>state.auth);
      const shopimage1 =user && user.length && user[0].shopimage;
      console.log(shopimage1);
      useEffect(() => {
        dispatch(getShopDetails(shopname));
        console.log("shop",shopsalesrevenue);
      }, [])

      const uploadImage = async (e) => {
        e.preventDefault()
        // console.log('image',image);
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('cloud_name', 'dj3in4dua')
        formData.append('upload_preset', 'hbhuqhw2')
        // console.log('image',image);
        await axios.post(
          'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
          formData
        ).then((res) => {
          console.log(res.data.secure_url)
          setImage(res.data.secure_url)
        })
      }
      
      const uploadShopImage = async (e) => {
        e.preventDefault()
        // console.log('image',image);
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('cloud_name', 'dj3in4dua')
        formData.append('upload_preset', 'hbhuqhw2')
        // console.log('image',image);
        await axios.post(
          'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
          formData
        ).then((res) => {
          console.log(res.data.secure_url)
          setShopImage(res.data.secure_url)
        })
      }
     
  const { error, isUpdated } = useSelector((state) => state.createproduct);
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");
  const [image_URL, setImage] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");
  const [shopimage,setShopImage] = useState('');
  //const shopname = user && user.length && user[0].shopname;
  console.log(shopname);    
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productname,description,price,stock,currency,category,image_URL,shopname)).then(()=>dispatch(getShopDetails(shopname)));
  };
    return (
    

          <><Fragment>
        {shopdetails && shopdetails.length && user && user.length &&
          <div className="profileContainer">

            <div>
              <h2>{shopname}</h2>
              <div>
                {shopname === user[0].shopname ?

                  <><Image
                    style={{ height: 80, width: 100, marginBottom: 20 }}
                    cloudName='dj3in4dua'
                    public_id={shopimage} /><input
                      type='file'
                      className='form-control'
                      name='userName'
                      onChange={(e) => uploadShopImage(e)}
                    ></input></> : ''}
              </div>
              {shopname === user[0].shopname ?
                <Button variant="primary" onClick={handleShow}>
                  Create product
                </Button> : ''}
            </div>
            <div>
              <div>
                <h4> ownerName</h4>
                <p>{shopdetails[0].uname}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{shopdetails[0].email}</p>
              </div>
              <div>

                {shopname === user[0].shopname ? <h4>Total Sales Revenue</h4> : ''}
                {shopsalesrevenue
                  && shopsalesrevenue.length && shopname === user[0].shopname ? <h4>{shopsalesrevenue[0].totalsalesrevenue}</h4> : ''}

              </div>
              <div>
                <Link to="/viewshopProducts">view Shop Products</Link>
              </div>
            </div>

          </div>}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Fragment>
              <MetaData title="Create a product" />
              <div className="updateProfileContainer">
                <div className="updateProfileBox">

                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                  >
                    <div className="updateProfileName">

                      <input
                        type="text"
                        placeholder="ProductName"
                        required
                        name="productname"
                        value={productname}
                        onChange={(e) => setProductName(e.target.value)} />
                    </div>
                    <div className="updateProfileEmail">

                      <input
                        type="text"
                        placeholder="Product Description"
                        required
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="updatedateofbirth">
                      <input
                        type="number"
                        value={price}
                        name='price'
                        placeholder="Product Price"
                        required
                        onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="stock">
                      <input
                        type="number"
                        placeholder="Product Quantity"
                        value={stock}
                        name='stock'
                        onChange={(e) => setStock(e.target.value)}
                        required />
                    </div>
                    <div className="currency">

                      <select
                        value={currency}
                        name='currency'
                        onChange={e => setCurrency(e.target.value)}>
                        <option value="null">SelectCurrency</option>
                        <option value="USD">USD DOLLAR</option>
                        <option value="INR">INDIAN RUPEE</option>
                        <option value="CAD">CANADIAN DOLLAR</option>
                        <option value="euro">EUROS</option>
                      </select>
                    </div>


                    <div className="category">

                      <select
                        value={category}
                        name='category'
                        onChange={e => setCategory(e.target.value)}>
                        <option value="null">SelectCategory</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Art">Art</option>
                      </select>
                    </div>
                    <div id="updateProfileImage">
                      <input
                        type='file'
                        className='form-control'
                        name='userName'
                        onChange={(e) => uploadImage(e)}
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
            </Fragment>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateProfileSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      <div className="container" id="container">
          {shopdetails &&
            shopdetails.map((shopproduct) => (
              <ShopProduct shopproduct={shopproduct} history={history} shopname={shopname} />
            ))}
        </div>
          </Fragment></>
      
    );
          }


export default ShopDetails;