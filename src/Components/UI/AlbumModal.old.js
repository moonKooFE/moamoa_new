// import { Fragment } from 'react';
// import AlbumModal from '../UI/AlbumModal.module.css';
// import { ReactDOM } from 'react';

// const Backdrop = (props) => {
//     return <div className={Styles.backdrop} onClick={props.onClose} />
// }
// const ModalOverlay = (props) => {
//     return(
//         <div className={styles.modal}>
//             <div className={styles.content}>{props.children}</div>
//         </div>
//     )
// }
// const portalElement = document.getElementById('overlays');

// const AlbumModal = (props)=> {
//     return(
//     <Fragment>
//         {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
//             {ReactDOM.createPortal(
//                 <ModalOverlay>{props.children}</ModalOverlay>,
//                 portalElement
//       )}
//     </Fragment>
//     )
// };
// export default AlbumModal;
