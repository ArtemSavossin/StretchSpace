import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listSchedueles,
  deleteScheduele,
  createScheduele,
} from '../actions/schedueleActions';
import { SCHEDUELE_CREATE_RESET } from '../constants/schedueledConstants';

const SchedueledListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const schedueleList = useSelector((state) => state.schedueleList);
  const { loading, error, schedueles, page, pages } = schedueleList;

  const schedueleDelete = useSelector((state) => state.schedueleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = schedueleDelete;

  const schedueleCreate = useSelector((state) => state.schedueleCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    schedueles: createdScheduele,
  } = schedueleCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: SCHEDUELE_CREATE_RESET });
    dispatch(listSchedueles());

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/schedueles/${createdScheduele._id}/edit`);
    } else {
      dispatch(listSchedueles('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdScheduele,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteScheduele(id));
    }
  };

  const createSchedueleHandler = () => {
    dispatch(createScheduele());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2>Тренировки</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createSchedueleHandler}>
            <i className='fas fa-plus'></i> Добавить занятие
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Имя</th>
                <th>День</th>
                <th>Вместимость</th>
                <th>Записалось</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {schedueles.map((scheduele) => {
                console.log(scheduele);
                return (
                  <tr key={scheduele._id}>
                    <td>{scheduele.class.name}</td>
                    <td>{new Date(scheduele.start).toLocaleString()}</td>
                    <td>{scheduele.class.availablePlace}</td>
                    <td>{scheduele.registeredUsers.length}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/schedueles/${scheduele._id}/edit`}
                      >
                        <Button variant='light' className='btn-sm'>
                          изменить
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(scheduele._id)}
                      >
                        удалить
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default SchedueledListScreen;
