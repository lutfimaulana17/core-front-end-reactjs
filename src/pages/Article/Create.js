import React, {useEffect, useState} from 'react'
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
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [tag, setTag] = useState('')
    const [category_id, setCategory] = useState('')
    const [dataCategory, setDataCategory] = useState([])
    const [image, setImage] = useState([])
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)
        let data = {
            title: title,
            content: content,
            tag: tag,
            category_id: category_id
        }
        axios
            .post(process.env.REACT_APP_API_URL + '/article', data)
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
                            process.env.REACT_APP_API_URL + '/article/upload/' + res.data.id,
                            fileData,
                            config
                        )
                        .then(res => {
                            setLoading(false)
                            toast.success('Succes Created, redirect..', {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 2000
                            });
                            setTimeout(function () {
                                props
                                    .history
                                    .push('/article')
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
                    toast.success('Succes Created, redirect..', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000
                    });
                    setTimeout(function () {
                        props
                            .history
                            .push('/article')
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
    const getDataCategory = () => {
        axios
            .get(process.env.REACT_APP_API_URL + '/category')
            .then(res => {
                setDataCategory(res.data)
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            })
        }
    useEffect(() => {
        getDataCategory()
    }, [])
    return (
        <Page
            breadcrumbs={[
                {
                    name: 'article'
                }, {
                    name: 'create',
                    active: true
                }
            ]}>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>Create Article</CardHeader>
                        <CardBody>
                            <BlockUi tag="div" blocking={loading}>
                                <Form>
                                    <FormGroup>
                                        <Label>Title</Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            placeholder="input title"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleSelect">Select Category</Label>
                                        <Input type="select" onChange={e => setCategory(e.target.value)}>
                                            <option value=''>Select Category</option>
                                            {
                                                dataCategory.map(function (item, index) {
                                                    return (<option key={index} value={item.id}>{item.name}</option>)
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Content</Label>
                                        <Input
                                            type="textarea"
                                            name="content"
                                            rows={7}
                                            value={content}
                                            onChange={e => setContent(e.target.value)}
                                            placeholder="input content"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Tag</Label>
                                        <Input
                                            type="text"
                                            name="tag"
                                            value={tag}
                                            onChange={e => setTag(e.target.value)}
                                            placeholder="input tag"/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Image</Label>
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

export default Create;