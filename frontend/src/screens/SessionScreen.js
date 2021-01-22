import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listSessionDetails } from '../actions/sessionActions';

const SessionScreen = ({ match }) => {
  const dispatch = useDispatch();

  const sessionDetails = useSelector((state) => state.sessionDetails);
  const { loading, error, session } = sessionDetails;

  console.log(session);
  useEffect(() => {
    dispatch(listSessionDetails(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      <h1>Детали сессии</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <Row>
          <Col xs={12}>{session && session.coach && session.coach.name}</Col>
        </Row>
      )}
    </>
  );
};

export default SessionScreen;
