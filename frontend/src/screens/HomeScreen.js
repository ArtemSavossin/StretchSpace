import React, { useEffect } from 'react';
import { Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  listSessions,
  deleteSession,
  createSession,
} from '../actions/sessionActions';
const HomeScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, err } = userLogin;

  return (
    <Container className='fullscreen d-flex flex-column justify-content-center'>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <LinkContainer to='/login'>
            <Button
              size='lg'
              variant='warning'
              className='mt-4 mb-4 shadow-lg start-button'
            >
              {userInfo ? userInfo.name : 'Войти в аккунт'}
            </Button>
          </LinkContainer>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <LinkContainer to='/users'>
            <Button
              size='lg'
              variant='warning'
              className='mt-4 mb-4 shadow-lg start-button'
            >
              Пользователи
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
              Тренировки
            </Button>
          </LinkContainer>
        </Col>
        <Col xs={2}></Col>
      </Row>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <LinkContainer to='/scheduele'>
            <Button
              size='lg'
              variant='warning'
              className='mt-4 mb-4 shadow-lg start-button'
            >
              Расписание
            </Button>
          </LinkContainer>
        </Col>
        <Col xs={2}></Col>
      </Row>

      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <Button
            size='lg'
            variant='warning'
            className='mt-4 mb-4 shadow-lg start-button'
            onClick={() => {
              dispatch(logout());
            }}
          >
            Выйти
          </Button>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
