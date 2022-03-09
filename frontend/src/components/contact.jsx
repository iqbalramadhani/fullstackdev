import { useState,useEffect } from 'react'
import axios from 'axios';


const initialState = {
  name: '',
  email: '',
  message: '',
}
export const Contact = (props) => {
  const [state, setState] = useState(initialState)

  const [data,setData] = useState([]);

  const [proces,setProces] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }
  const clearState = () => setState({ ...initialState })

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(name, email, message)
    
    const pesan = {
      nama_user : state.name,
      pesan : state.message,
      email : state.email
    }
    
    axios.post(`http://localhost:8000/pengguna`, { ...pesan },{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers" : '*'
      }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      setProces(!proces)
      setState(initialState)
    })
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/pengguna`,{
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers" : '*'
      }
    })
    .then(res => {
      setData(res.data);
    }).catch(err => {
      console.log(err);
    })
  },[proces])

  return (
    <div>
      <div id='contact'>
        <div className='container'>
          <div className='col-md-8'>
            <div className='row'>
              <div className='section-title'>
                <h2>Kirim Pesan</h2>
                
              </div>
              <form name='sentMessage' validate onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        value={state.name}
                        className='form-control'
                        placeholder='Name'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={state.email}
                        className='form-control'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                      />
                      <p className='help-block text-danger'></p>
                    </div>
                  </div>
                </div>
                <div className='form-group'>
                  <textarea
                    name='message'
                    id='message'
                    value={state.message}
                    className='form-control'
                    rows='4'
                    placeholder='Message'
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className='help-block text-danger'></p>
                </div>
                <div id='success'></div>
                <button type='submit' className='btn btn-custom btn-lg'>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className='col-md-3 col-md-offset-1 contact-info'>
            <div className='contact-item'>
              <h3>Kontak Info</h3>
              <p>
                <span>
                  <i className='fa fa-map-marker'></i> Alamat
                </span>
                {props.data ? props.data.address : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-phone'></i> Phone
                </span>{' '}
                {props.data ? props.data.phone : 'loading'}
              </p>
            </div>
            <div className='contact-item'>
              <p>
                <span>
                  <i className='fa fa-envelope-o'></i> Email
                </span>{' '}
                {props.data ? props.data.email : 'loading'}
              </p>
            </div>
          </div>
          {
            data.map((val,i) => (
              <div className="col-md-12">
                <span>{val.nama_user} - <b>{val.email}</b></span>
                  <div className="panel panel-default">
                    <div className="panel-body text-primary">
                       {val.pesan}
                    </div>
                  </div>
              </div>
            ))
          }
          <div className='col-md-12'>
            <div className='row'>
              <div className='social'>
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : '/'}>
                      <i className='fa fa-facebook'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.instagram : '/'}>
                      <i className='fa fa-instagram'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.github : '/'}>
                      <i className='fa fa-github'></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.linkedin : '/'}>
                      <i className='fa fa-linkedin'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2022 Iqbal Ramadhani
          </p>
        </div>
      </div>
    </div>
  )
}
