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
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        let data = {
            name: name
        }
        axios
            .put(process.env.REACT_APP_API_URL + '/category/'+props.match.params.id, data)
            .then(res => {
                setLoading(false)
                toast.success('Succes Updated, redirect..', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
                setTimeout(function () {
                    props
                        .history
                        .push('/category')
                }, 3000)
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
            .get(process.env.REACT_APP_API_URL + '/category/'+props.match.params.id)
            .then(res => {
                setName(res.data.name)
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
                    name: 'category'
                }, {
                    name: 'edit',
                    active: true
                }
            ]}>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>Update Category</CardHeader>
                        <CardBody>
                            <BlockUi tag="div" blocking={loading}>
                                <Form>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="input name"/>
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