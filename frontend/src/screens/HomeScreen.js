import React from 'react';
import { Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const HomeScreen = () => {
  return (
    <Container className='fullscreen d-flex flex-column justify-content-center'>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <LinkContainer to='/profile'>
            <Button
              size='lg'
              variant='warning'
              className='mt-4 mb-4 shadow-lg start-button'
            >
              Кабинет
            </Button>
          </LinkContainer>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <LinkContainer to='/sessions'>
            <Button
              size='lg'
              variant='warning'
              className='mt-4 mb-4 shadow-lg start-button'
            >
              Запись
            </Button>
          </LinkContainer>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <LinkContainer to='/stats'>
            <Button
              size='lg'
              variant='warning'
              className='mt-4 mb-4 shadow-lg start-button'
            >
              Статистика
            </Button>
          </LinkContainer>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
