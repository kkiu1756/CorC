import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../UI/Modal/Modal';
import Backdrop from '../UI/Backdrop/Backdrop';
import Receipt from '../UI/Receipt/Receipt';
import { ReactComponent as ReceiptIcon } from '../../assets/receipt.svg';

import classes from './Item.module.css';

const PaymentItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const paymentContents = (items) => {
    let resultStr = `${items[0].productName} ✕ ${items[0].amount}`;
    if (items.length === 1) return resultStr;

    return resultStr + ` 외 ${items.length - 1}건`;
  };

  const history = useHistory();

  const isAccepted = (accepted) => {
    if (accepted === 0) return '거절';
    else if (accepted === 1) return '대기';
    else return '승인';
  };

  const formatMoney = (number) => new Intl.NumberFormat().format(number) + '원';

  const activeStyle = (status) => {
    console.log('status', status);
    if (status === 0) return classes.deleted;
    else if (status === 1) return classes.inactive;
    else return classes.active;
  };

  const trClickHandler = () =>
    history.push({
      pathname: `/store/sales/${props.store.storeId}`,
      state: {
        storeName: `${props.store.storeName}`,
        storeId: `${props.store.storeId}`,
        storeCrNum: `${props.store.crNum}`,
      },
    });

  return (
    <Fragment>
      <Modal show={modalIsOpen} closed={closeModal}>
        <span>결제 상세 내역</span>
        <Receipt {...props} />
      </Modal>
      {modalIsOpen ? <Backdrop show={modalIsOpen} closed={closeModal} /> : null}
      <tr className={classes.tr}>
        <td
          // style={{ width: '40%' }}
          className={`${classes.td}`}
        >
          {props.paymentId}
        </td>
        <td
          className={`${classes.td} ${classes['text-sm']} ${classes['font-normal']}`}
        >
          {props.store.storeName}
        </td>
        <td className={`${classes.td}`}>{props.user.userName}</td>
        <td className={`${classes.td} ${classes['td-flex']}`}>
          <span>{paymentContents(props.paymentitem)}</span>
          <ReceiptIcon className={classes.icon} onClick={showModal} />
        </td>
        <td
          // style={{ width: '60%' }}
          className={`${classes.td} ${classes['text-sm']} ${classes.date}`}
        >
          {props.date.slice(0, 10)}
        </td>
        <td
          // style={{ width: '60%' }}
          className={`${classes.td} ${classes['text-sm']} ${classes['align-right']}`}
        >
          {formatMoney(props.total)}
        </td>
        <td className={`${classes.td} ${activeStyle(props.status)} `}>
          {isAccepted(props.status)}
        </td>
      </tr>
    </Fragment>
  );
};

export default PaymentItem;
