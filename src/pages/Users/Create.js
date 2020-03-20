import React, {useState} from 'react'
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

const Create = props => {
    const [userData, setUserData] = useState(
        JSON.parse(window.localStorage.getItem('userData'))
    )
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
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
            password: password
        }
        axios
            .post(process.env.REACT_APP_API_URL + '/user', data)
            .then(res => {
                setLoading(false)
                toast.success('Succes Created, redirect..', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
                setTimeout(function () {
                    props
                        .history
                        .push('/users')
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
    return (
        <Page
            breadcrumbs={[
                {
                    name: 'users'
                }, {
                    name: 'create',
                    active: true
                }
            ]}>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>Create User</CardHeader>
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
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="input email"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="input password"/>
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

export default Create;