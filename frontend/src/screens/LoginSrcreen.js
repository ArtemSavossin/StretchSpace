import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer.js';
import { login } from '../actions/userActions';

const LoginScreen = ({ history, location }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo, err } = userLogin;
  console.log('error is', error);
  console.log('err is', err);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(phone, password));
  };
  return (
    <FormContainer>
      <h2>Вход</h2>
      {err ? <Message variant='danger' children={err} /> : <></>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='phone'>
              <Form.Label>Введите номер телефона</Form.Label>
              <Form.Control
                type='phone'
                placeholder='+77776665544'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type='password'
                placeholder='****'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' className='y-primary'>
              Войти
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              Новый пользователь?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Регистрируйся!
              </Link>
            </Col>
          </Row>
        </>
      )}
    </FormContainer>
  );
};
export default LoginScreen;
