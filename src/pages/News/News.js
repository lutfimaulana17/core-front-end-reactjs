import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import Page from './../../components/Page'
import axios from 'axios'
import {toast} from 'react-toastify'
import {Card, CardBody, Button, Col, Row} from 'reactstrap'
import MUIDataTable from 'mui-datatables'

const News = () => {
    const [userData, setUserData] = useState(
        JSON.parse(window.localStorage.getItem('userData'))
    )
    const [data, setData] = useState([])
    const columns = [
        {
            name: "nomor",
            label: "No",
            options: {
                filter: true,
                sort: true
            }
        }, {
            name: "title",
            label: "Title",
            options: {
                filter: true,
                sort: true
            }
        }, {
            name: "category",
            label: "Category",
            options: {
                filter: true,
                sort: true
            }
        }, {
            name: "creation_user",
            label: "Creation User",
            options: {
                filter: true,
                sort: true
            }
        }, {
            name: "creation_date",
            label: "Creation Date",
            options: {
                filter: true,
                sort: true
            }
        }, {
            name: "action",
            label: "Action",
            options: {
                filter: false,
                sort: false
            }
        }
    ];
    const options = {
        filterType: 'checkbox',
        elevation: 0,
        responsive: true,
        selectableRows: false
    };
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
    }
    const getData = () => {
        axios
            .get(process.env.REACT_APP_API_URL + '/news')
            .then(res => {
                let result = []
                let nomor = 1
                res
                    .data
                    .map(function (item, index) {
                        result.push({
                            nomor: nomor++,
                            title: item.title,
                            category: item.category.name,
                            creation_user: item.user.name,
                            creation_date: new Date(item.createdAt)
                                .toISOString()
                                .slice(0, 10),
                            action: <React.Fragment>
                                    <NavLink to={'/news/edit/' + item.id}>
                                        <Button
                                            color="warning"
                                            style={{
                                                marginRight: 5
                                            }}
                                            size="sm">Edit</Button>
                                    </NavLink>
                                    <Button color="danger" size="sm" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) deleteData(item.id) } }>Delete</Button>
                                </React.Fragment>
                        })
                    })
                setData(result)
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            })
    }
    const deleteData = id => {
        axios
            .delete(process.env.REACT_APP_API_URL + '/news/'+id)
            .then(res => {
                toast.success('Succes Delete Data', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                });
                getData()
            })
            .catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000
                })
            })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <Page
            breadcrumbs={[{
                    name: 'news',
                    active: true
                }
            ]}>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <NavLink to={'/news/create'}>
                                <Button
                                    color="primary"
                                    style={{
                                        marginLeft: 10,
                                        marginBottom: 10
                                    }}>Create New</Button>
                            </NavLink>
                            <MUIDataTable
                                title={"Data News"}
                                data={data}
                                columns={columns}
                                options={options}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}

export default News;