import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listSessions } from '../actions/sessionActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
const SessionsScreen = () => {
  const dispatch = useDispatch();

  const sessionList = useSelector((state) => state.sessionList);
  const { loading, error, sessions } = sessionList;

  useEffect(() => {
    dispatch(listSessions());
  }, [dispatch]);
  return (
    <>
      <h1>Доступные сессии</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <Row>
          {sessions &&
            sessions.map((s) => (
              <Col key={s._id} xs={12}>
                {s.date}
              </Col>
            ))}
        </Row>
      )}
    </>
  );
};

export default SessionsScreen;
