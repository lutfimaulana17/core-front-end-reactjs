import React, {useState, useEffect} from 'react'
import Page from './../../components/Page'
import axios from 'axios'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import {toast} from 'react-toastify'
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Button,
    Input,
    Label,
    Row
} from 'reactstrap';

const Edit = props => {
    const [userData, setUserData] = useState(
        JSON.parse(window.localStorage.getItem('userData'))
    )
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [postal_code, setPostal_code] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [phone, setPhone] = useState('')
    const [about, setAbout] = useState('')
    const [visi, setVisi] = useState('')
    const [misi, setMisi] = useState('')
    const [image, setImage] = useState([])
    const [previmage, setPrevImage] = useState('')
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        let data = {
            name: name,
            email: email,
            address: address,
            postal_code: postal_code,
            city: city,
            province: province,
            phone: phone,
            about: about,
            visi: visi,
            misi: misi
        }
        axios
            .put(
                process.env.REACT_APP_API_URL + '/company/' + props.match.params.id,
                data
            )
            .then(res => {
                // upload image
                if (image != '') {
                    const config = {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    }
                    let fileData = new FormData();
                    fileData.append('image', image);
                    axios
                        .post(
                            process.env.REACT_APP_API_URL + '/company/upload/' + res.data.id,
                            fileData,
                            config
                        )
                        .then(res => {
                            setLoading(false)
                            toast.success('Succes Updated, redirect..', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 2000
                            });
                            setTimeout(function () {
                                props
                                    .history
                                    .push('/company')
                            }, 3000)
                        })
                        .catch((error) => {
                            setLoading(false)
                            toast.error(error.response.data.message, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 2000
                            })
                        })
                } else {
                    setLoading(false)
                    toast.success('Succes Updated, redirect..', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000
                    });
                    setTimeout(function () {
                        props
                            .history
                            .push('/company')
                    }, 3000)
                }
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            })
        }
    const setFormData = async () => {
        axios
            .get(process.env.REACT_APP_API_URL + '/company/' + props.match.params.id)
            .then(res => {
                setName(res.data.name)
                setEmail(res.data.email)
                setAddress(res.data.address)
                setPostal_code(res.data.postal_code)
                setCity(res.data.city)
                setProvince(res.data.province)
                setPhone(res.data.phone)
                setAbout(res.data.about)
                setVisi(res.data.visi)
                setMisi(res.data.misi)
                setPrevImage(res.data.file_name ? process.env.REACT_APP_BACKEND_URL+'/images/company/'+res.data.file_name : "https://www.freeiconspng.com/uploads/no-image-icon-11.PNG")
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            })
        }
    useEffect(() => {
        setFormData()
    }, [])
    return (
        <Page
            breadcrumbs={[
                {
                    name: 'company'
                }, {
                    name: 'edit',
                    active: true
                }
            ]}>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>Update Company</CardHeader>
                        <CardBody>
                            <BlockUi tag="div" blocking={loading}>
                                <Form>
                                <FormGroup>
                                        <Label>Company Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="input name"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="text"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="input email"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Address</Label>
                                        <Input
                                            type="textarea"
                                            name="address"
                                            rows={5}
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                            placeholder="input adrress"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Postal Code</Label>
                                        <Input
                                            type="text"
                                            name="postal_code"
                                            value={postal_code}
                                            onChange={e => setPostal_code(e.target.value)}
                                            placeholder="input Postal Code"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>City</Label>
                                        <Input
                                            type="text"
                                            name="city"
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
                                            placeholder="input city"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Province</Label>
                                        <Input
                                            type="text"
                                            name="province"
                                            value={province}
                                            onChange={e => setProvince(e.target.value)}
                                            placeholder="input province"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Phone</Label>
                                        <Input
                                            type="text"
                                            name="phone"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                            placeholder="input phone"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>About</Label>
                                        <Input
                                            type="textarea"
                                            name="about"
                                            rows={5}
                                            value={about}
                                            onChange={e => setAbout(e.target.value)}
                                            placeholder="input about"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Visi</Label>
                                        <Input
                                            type="textarea"
                                            name="visi"
                                            rows={5}
                                            value={visi}
                                            onChange={e => setVisi(e.target.value)}
                                            placeholder="input visi"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Misi</Label>
                                        <Input
                                            type="textarea"
                                            name="misi"
                                            rows={5}
                                            value={misi}
                                            onChange={e => setMisi(e.target.value)}
                                            placeholder="input misi"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <img src={previmage} style={{
                                            width: 400,
                                            height: 400,
                                            objectFit: 'contain',
                                        }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Image Logo</Label>
                                        <Input
                                            type="file"
                                            name="image"
                                            onChange={e => setImage(e.target.files[0])}
                                            placeholder="input tag"/>
                                    </FormGroup>
                                    
                                    <Button color="primary" onClick={handleSubmit}>Submit</Button>
                                </Form>
                            </BlockUi>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}

export default Edit;