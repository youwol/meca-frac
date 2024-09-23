import { Modal, NavDropdown, Row } from 'react-bootstrap'
import React from 'react'
import { Logo } from '../../components/icons/logo'
import YouWolTxt from '../../assets/YouWol-txt.svg'
import YouWolLog from '../../assets/YouWol_logo_1.svg'
import AboutBgImg from '../../assets/about-bg-img.png'
import AboutStressImg from '../../assets/about-stress-img.png'

export function About() {
    const [modalShow, setModalShow] = React.useState(false)
    const bgStyleImg = {
        backgroundImage: `url(${AboutBgImg}), url(${AboutStressImg})`,
        backgroundPosition: 'right bottom, left top',
        backgroundRepeat: 'no-repeat, repeat',
    }
    const sharedClassName =
        'd-flex align-content-center align-items-center justify-content-center flex-row'
    return (
        <>
            <NavDropdown.Item onClick={() => setModalShow(true)}>
                <div className={'me-5'}>About</div>
                <div></div>
            </NavDropdown.Item>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header
                    className={'py-1 justify-content-center '}
                    style={{
                        background:
                            'linear-gradient(90deg, #EEECDF 0%, #9F9E97 100%)',
                    }}
                >
                    <Logo w={'72px'} h={'72px'} />
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div
                            style={{
                                fontSize: '45px',
                                textShadow: '1px 3px 2px black',
                            }}
                        >
                            {'MecaFrac'}{' '}
                            <small style={{ fontSize: '20px' }}>light</small>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        ...bgStyleImg,
                        backgroundImage: `url(${AboutStressImg}),linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${AboutBgImg})`,
                        backgroundSize: 'cover , auto',
                        backgroundPosition: `center, right`,
                        backgroundRepeat: `no-repeat, no-repeat`,
                        backgroundBlendMode: 'soft-light, multiply',
                    }}
                >
                    <Row style={{ fontSize: '14px', color: '#cbc9bd' }}>
                        <div className={sharedClassName}>
                            <p className={'me-2'}>MecaFrac:</p>
                            <p>{'v. 1.0'}</p>
                        </div>
                        <div className={sharedClassName}>
                            <p className={'me-2'}>Arch:</p>
                            <p>v. 1.0</p>
                        </div>
                        <div className={sharedClassName}>
                            <p className={'me-2'}>Build date:</p>
                            <p>June 6 2024</p>
                        </div>
                        <div className={sharedClassName}>
                            <p className={'me-2'}>
                                © 2019-2024 YouWol. All rights reserved.
                            </p>
                            <p></p>
                        </div>
                        <div className={sharedClassName}>
                            <img src={YouWolLog} alt={'about'} />
                            <img src={YouWolTxt} alt={'about'} />
                            <p></p>
                        </div>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
