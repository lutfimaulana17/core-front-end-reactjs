import React, {useState, useEffect} from 'react'
import loginBgImage from './../../assets/img/bg/sakura.jpg';
import iconlogin from './../../assets/img/users/usergarisbulat.png';
import axios from 'axios'
import BlockUi from 'react-block-ui'
import 'react-block-ui/style.css'
import {toast} from 'react-toastify'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Col,
    Card
} from 'reactstrap'
const Login = props => {
    const [userData, setUserData] = useState(
        window.localStorage.getItem('userData')
            ? JSON.parse(window.localStorage.getItem('userData'))
            : ''
    )
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        let data = {
            email: email,
            password: password
        }
        axios
            .post(process.env.REACT_APP_API_URL + '/auth/login', data)
            .then(res => {
                setLoading(false)
                toast.success('Login Berhasil, redirect..', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
                window
                    .localStorage
                    .setItem('userData', JSON.stringify(res.data))
                setTimeout(function () {
                    props
                        .history
                        .push('/')
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
    useEffect(() => {
        if (userData) {
            props
                .history
                .push('/')
        }
    }, [])
    return (
        <Row
            style={{
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url("${loginBgImage}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
            <Col md={3}>
                <Card body="body">
                    <BlockUi tag="div" blocking={loading}>
                        <Form>
                            <div className="text-center">
                                <img
                                    src={iconlogin}
                                    style={{
                                        width: 70,
                                        height: 70
                                    }}/>
                                <br/>
                                <br/>
                                <h4>Login</h4>
                            </div>
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
                            <hr/>
                            <Button
                                size="lg"
                                className="btn-primary"
                                block="block"
                                onClick={handleSubmit}
                                style={{
                                    marginBottom: 20,
                                    marginTop: 20
                                }}>
                                Login
                            </Button>
                        </Form>
                    </BlockUi>
                </Card>
            </Col>
        </Row>
    )
}

export default Login;