import React from 'react'
import Page from './../../components/Page';
import {
    Alert,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
} from 'reactstrap';

const Home = () => {
    return (
        <Page
            breadcrumbs={[{
                    name: 'dashboard',
                    active: true
                },
            ]}>
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>Home</CardHeader>
                        <CardBody>
                            <Alert color="primary">
                                Hi,
                                <strong> Welcome to </strong>
                                CMS Web Company Profile
                            </Alert>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}

export default Home;