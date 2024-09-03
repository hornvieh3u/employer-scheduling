// ** React Imports
import { useState, Fragment, useMemo } from 'react'

// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Label,
    Input
} from 'reactstrap'

// ** Icons Imports
import { Facebook, Link } from 'react-feather'
import { socialLinksUpdateAction } from '../store/actions'
import { socialLinkUpdateReset } from '../store/reducer'
import { useDispatch, useSelector } from 'react-redux'
import useMessage from '../../../../lib/useMessage'

const socialAccounts = [
    {
        title: 'Facebook',
        url: 'https://nextlevelmedia.com/',
        logo: require('@src/assets/images/icons/social/facebook.png').default
    },
    {
        title: 'Instagram',
        url: 'https://nextlevelmedia.com/',
        logo: require('@src/assets/images/icons/social/instagram.png').default
    },
    {
        title: 'Twitter',
        url: 'https://nextlevelmedia.com/',
        logo: require('@src/assets/images/icons/social/twitter.png').default
    },
    {
        title: 'Linkedin',
        url: 'https://nextlevelmedia.com/',
        logo: require('@src/assets/images/icons/social/linkedin.png').default
    },
    {
        title: 'Dribble',
        url: 'https://nextlevelmedia.com/',
        logo: require('@src/assets/images/icons/social/dribbble.png').default
    },
    {
        title: 'Behance',
        url: 'https://nextlevelmedia.com/',
        logo: require('@src/assets/images/icons/social/behance.png').default
    }
]

const initialSocialinks = [
    {
        name: 'facebook',
        link: 'sss'
    },
    {
        name: 'instagram',
        link: ''
    },
    {
        name: 'twitter',
        link: ''
    },
    {
        name: 'linkedin',
        link: ''
    },
    {
        name: 'dribble',
        link: ''
    },
    {
        name: 'behance',
        link: ''
    }
]

const connections = ({ selectedUser }) => {
    // ** State
    const [centeredModal, setCenteredModal] = useState(false)
    const [socialLinks, setSocialLinks] = useState(initialSocialinks)

    const { success: successMsg } = useMessage()
    // ** redux
    const dispatch = useDispatch()
    const {
        socialLinksUpdate: { success, loading }
    } = useSelector((state) => state.leadContact)

    function handleOnchangeLink(e, identifier) {
        setSocialLinks((p) => {
            return p.map((x) => {
                if (x.name === identifier) {
                    return {
                        link: e?.target?.value,
                        name: x.name
                    }
                }
                return x
            })
        })
    }

    function getSocialIcon(identifier) {
        let name = `${String(identifier[0]).toUpperCase()}${String(identifier)
            .split('')
            .slice(1, identifier?.length)
            .join('')}`
        return socialAccounts.find((x) => x.title === name)?.logo
    }

    useMemo(() => {
        if (selectedUser) {
            //set to state
            if (selectedUser.socialLinks) {
                setSocialLinks((p) => {
                    let newLinks = []
                    for (let each of p) {
                        const find = Array.from(selectedUser.socialLinks).find(
                            (x) => x?.name === each?.name
                        )
                        if (find) {
                            each.link = find?.link
                        }
                        newLinks.push(each)
                    }
                    return newLinks
                })
            }
        }
    }, [selectedUser])

    useMemo(() => {
        if (success) {
            // dispatch reset reducer
            dispatch(socialLinkUpdateReset())
            // show message (success)
            successMsg('Social Link Updated')
            // hide modal
            setCenteredModal(!centeredModal)
        }
    }, [success])

    function handleSubmit() {
        // first check validation
        dispatch(
            socialLinksUpdateAction({
                links: socialLinks,
                id: selectedUser?._id
            })
        )
    }

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-75">Social accounts</CardTitle>
                    {socialLinks.map((item, index) => {
                        return (
                            <div key={index} className="d-flex mt-2">
                                <div className="flex-shrink-0">
                                    <img
                                        className="me-1"
                                        src={getSocialIcon(item.name)}
                                        alt={item.name}
                                        height="38"
                                        width="38"
                                    />
                                </div>
                                <div className="d-flex align-item-center justify-content-between flex-grow-1">
                                    <div className="me-1">
                                        <p className="fw-bolder mb-0">
                                            {item?.name}
                                        </p>
                                    </div>
                                    <div className="mt-50 mt-sm-0">
                                        {item.link === '' ? (
                                            <Button
                                                outline
                                                className="btn-icon"
                                            >
                                                <Link className="font-medium-3" />
                                            </Button>
                                        ) : (
                                            <a href={item.link} target="_blank">
                                                <Button
                                                    outline
                                                    className="btn-icon"
                                                >
                                                    <Link className="font-medium-3" />
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className="d-flex justify-content-center pt-2">
                        <Button
                            color="primary"
                            outline
                            onClick={() => setCenteredModal(!centeredModal)}
                        >
                            Edit
                        </Button>
                    </div>
                    <div className="vertically-centered-modal">
                        <Modal
                            isOpen={centeredModal}
                            toggle={() => setCenteredModal(!centeredModal)}
                            className="modal-dialog-centered"
                        >
                            <ModalHeader
                                toggle={() => setCenteredModal(!centeredModal)}
                            >
                                Edit Social Information
                            </ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Facebook
                                        </Label>
                                        <Input
                                            value={
                                                socialLinks.find(
                                                    (x) => x.name === 'facebook'
                                                )?.link
                                            }
                                            onChange={(e) =>
                                                handleOnchangeLink(
                                                    e,
                                                    'facebook'
                                                )
                                            }
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="facebook"
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Instagram
                                        </Label>
                                        <Input
                                            value={
                                                socialLinks.find(
                                                    (x) =>
                                                        x.name === 'instagram'
                                                )?.link
                                            }
                                            onChange={(e) =>
                                                handleOnchangeLink(
                                                    e,
                                                    'instagram'
                                                )
                                            }
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Twitter
                                        </Label>
                                        <Input
                                            value={
                                                socialLinks.find(
                                                    (x) => x.name === 'twitter'
                                                )?.link
                                            }
                                            onChange={(e) =>
                                                handleOnchangeLink(e, 'twitter')
                                            }
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            LinkedIn
                                        </Label>
                                        <Input
                                            value={
                                                socialLinks.find(
                                                    (x) => x.name === 'linkedin'
                                                )?.link
                                            }
                                            onChange={(e) =>
                                                handleOnchangeLink(
                                                    e,
                                                    'linkedin'
                                                )
                                            }
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Dribble
                                        </Label>
                                        <Input
                                            value={
                                                socialLinks.find(
                                                    (x) => x.name === 'dribble'
                                                )?.link
                                            }
                                            onChange={(e) =>
                                                handleOnchangeLink(e, 'dribble')
                                            }
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                        />
                                    </Col>
                                    <Col sm="12" className="mb-1">
                                        <Label
                                            className="form-label"
                                            for="input-default"
                                        >
                                            Behance
                                        </Label>
                                        <Input
                                            value={
                                                socialLinks.find(
                                                    (x) => x.name === 'behance'
                                                )?.link
                                            }
                                            onChange={(e) =>
                                                handleOnchangeLink(e, 'behance')
                                            }
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                        />
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    disabled={loading}
                                    color="primary"
                                    onClick={() =>
                                        //
                                        handleSubmit()
                                    }
                                >
                                    {loading ? 'loading' : 'Update'}
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default connections
