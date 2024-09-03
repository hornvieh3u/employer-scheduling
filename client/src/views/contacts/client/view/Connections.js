// ** React Imports
import { useState, Fragment, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import { Link } from 'react-feather'
import {
    editSocialLinksAction,
    fetchSingleClientAction
} from '../store/actions'
import { useParams } from 'react-router-dom'
import {
    singleClientFetchReset,
    editClientReset,
    socialLinkReset
} from '../store/reducer'
import { toast } from 'react-toastify'
const socialAccounts = {
    facebook: {
        logo: require('@src/assets/images/icons/social/facebook.png').default
    },
    instagram: {
        logo: require('@src/assets/images/icons/social/instagram.png').default
    },
    twitter: {
        logo: require('@src/assets/images/icons/social/twitter.png').default
    },
    linkedin: {
        logo: require('@src/assets/images/icons/social/linkedin.png').default
    },
    dribble: {
        logo: require('@src/assets/images/icons/social/dribbble.png').default
    },
    behance: {
        title: 'behance',
        logo: require('@src/assets/images/icons/social/behance.png').default
    }
}

const connections = ({ contact }) => {
    // ** State
    const [centeredModal, setCenteredModal] = useState(false)

    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [dribble, setDribble] = useState('')
    const [behance, setBehance] = useState('')
    const dispatch = useDispatch()
    const {
        isClientContactEditSuccess,
        singleClient,
        contact: clientContact,
        socialLink
    } = useSelector((state) => state.clientContact)

    const {
        socialLink: { isLoading }
    } = useSelector((state) => state.clientContact)
    const { id } = useParams()

    const ToastContent = ({ message }) => (
        <Fragment>
            <div className="toastify-header">
                <div className="title-wrapper">
                    <h6 className="toast-title fw-bold">{message}</h6>
                </div>
            </div>
        </Fragment>
    )

    const [initialSocialinks, SetInitialSocialinks] = useState([
        {
            name: 'facebook',
            link: ''
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
    ])

    const [socialLinks, setSocialLinks] = useState(
        singleClient?.client?.socialLinks
            ? singleClient?.client?.socialLinks
            : []
    )

    function updateState(l) {
        SetInitialSocialinks((p) => {
            let newData = []
            for (let each of p) {
                if (each.name === l.name) {
                    each.link = l.link
                }
                newData.push(each)
            }

            return [...newData]
        })
    }

    useMemo(() => {
        if (contact?.socialLinks?.length > 0) {
            for (let link of contact?.socialLinks) {
                if (link?.link !== '') {
                    // updateState call to update state
                    updateState(link)
                }
            }
        }
    }, [contact])

    useEffect(() => {
        contact?.socialLinks?.map((l) => {
            updateState(l)
            if (l.name === 'facebook') {
                setFacebook(l.link)
            }
            if (l.name === 'instagram') {
                setInstagram(l.link)
            }
            if (l.name === 'twitter') {
                setTwitter(l.link)
            }
            if (l.name === 'linkedin') {
                setLinkedin(l.link)
            }
            if (l.name === 'dribble') {
                setDribble(l.link)
            }
            if (l.name === 'behance') {
                setBehance(l.link)
            }
            setSocialLinks(
                singleClient?.client?.socialLinks
                    ? singleClient?.client?.socialLinks
                    : []
            )
        })
    }, [])

    useMemo(() => {
        if (socialLink.isSuccess) {
            // Update Message
            toast.success(
                <ToastContent message="Social Link Updated successfull" />
            )
            setCenteredModal(!centeredModal)
            // reset link udpate reet
            dispatch(socialLinkReset())
        }
    }, [socialLink])

    useMemo(() => {
        if (isClientContactEditSuccess) {
            dispatch(editClientReset())
            dispatch(fetchSingleClientAction(id))

            clientContact?.client?.socialLinks?.map((l) => {
                if (l.name === 'facebook') {
                    setFacebook(l.link)
                }
                if (l.name === 'instagram') {
                    setInstagram(l.link)
                }
                if (l.name === 'twitter') {
                    setTwitter(l.link)
                }
                if (l.name === 'linkedin') {
                    setLinkedin(l.link)
                }
                if (l.name === 'dribble') {
                    setDribble(l.link)
                }
                if (l.name === 'behance') {
                    setBehance(l.link)
                }
                setSocialLinks(
                    singleClient?.client?.socialLinks
                        ? singleClient?.client?.socialLinks
                        : []
                )
            })
        }
    }, [isClientContactEditSuccess])

    const handleSubmit = (e) => {
        const socialLinks = [
            {
                name: 'facebook',
                link: facebook
            },
            {
                name: 'instagram',
                link: instagram
            },
            {
                name: 'twitter',
                link: twitter
            },
            {
                name: 'linkedin',
                link: linkedin
            },
            {
                name: 'dribble',
                link: dribble
            },
            {
                name: 'behance',
                link: behance
            }
        ]

        SetInitialSocialinks((p) => {
            let newData = []
            for (let l of socialLinks) {
                let current = {}
                for (let a of p) {
                    if (a.name === l.name) {
                        a.link = l.link
                        current = a
                    }
                }
                newData.push(current)
            }

            return [...newData]

            // let findIndex = p.find((x) => x.name === 'facebook')
            // if (findIndex > -1) {
            //     p[findIndex].link = e?.target?.value
            // }
            // return [...p]
        })

        dispatch(editSocialLinksAction(id, { socialLinks }))
    }

    return (
        <Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-75">Social accounts</CardTitle>
                    {initialSocialinks.length > 0 &&
                        initialSocialinks.map((item, index) => {
                            return (
                                <div key={index} className="d-flex mt-2">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="me-1"
                                            src={socialAccounts[item.name].logo}
                                            alt={item.name}
                                            height="38"
                                            width="38"
                                        />
                                    </div>
                                    <div className="d-flex align-item-center justify-content-between flex-grow-1">
                                        <div className="me-1">
                                            <p className="fw-bolder mb-0">
                                                {item.name}
                                            </p>
                                        </div>
                                        <div className="mt-50 mt-sm-0">
                                            <Button
                                                outline
                                                className="btn-icon"
                                            >
                                                {item.link === '' ? (
                                                    <Link className="font-medium-3" />
                                                ) : (
                                                    <a
                                                        href={item.link}
                                                        target="_blank"
                                                    >
                                                        <Link className="font-medium-3" />
                                                    </a>
                                                )}
                                            </Button>
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
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="facebook"
                                            value={facebook}
                                            onChange={(e) => {
                                                setFacebook(e.target.value)
                                            }}
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
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="instagram"
                                            value={instagram}
                                            onChange={(e) =>
                                                setInstagram(e.target.value)
                                            }
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
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="twitter"
                                            value={twitter}
                                            onChange={(e) =>
                                                setTwitter(e.target.value)
                                            }
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
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="linkedin"
                                            value={linkedin}
                                            onChange={(e) =>
                                                setLinkedin(e.target.value)
                                            }
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
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="dribble"
                                            value={dribble}
                                            onChange={(e) =>
                                                setDribble(e.target.value)
                                            }
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
                                            type="text"
                                            id="input-default"
                                            placeholder="Paste the link here ..."
                                            name="behance"
                                            value={behance}
                                            onChange={(e) =>
                                                setBehance(e.target.value)
                                            }
                                        />
                                    </Col>
                                </Row>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    disabled={isLoading}
                                    color="primary"
                                    onClick={handleSubmit}
                                >
                                    {isLoading ? 'Processing...' : 'Update'}
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
