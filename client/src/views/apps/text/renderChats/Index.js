import React, { memo } from 'react';
// ** Custom Components
import Avatar from '@components/avatar';
import { formatDateToMonthShort } from '../../../../utility/Utils';
import { Badge, CardText } from 'reactstrap';

function RenderChats({ loading, setLoading, studentType, store, query, handleUserClick, active, data }) {
    // const { chats } = store
    const { chats } = data
    if (chats && chats.length) {
        if (query.length && !filteredChat.length) {
            return (
                <div className='no-results show'>
                    <h6 className='mb-0'>No Chats Found</h6>
                </div>

            )
        } else {
            const arrToMap = query.length && filteredChat.length ? filteredChat : chats

            return (
                arrToMap.map(item => {
                    const time = formatDateToMonthShort(item.messages ? item.messages.createdAt : new Date())

                    return (
                        <div className='list-group m-0 p-0'>
                            <div
                                key={item._id}
                                onClick={() => handleUserClick(item._id)}
                                className="w-100 p-1 gap-1 d-flex align-items-center"
                            >
                                {item.contact.photo ? (
                                    <Avatar img={item.contact.photo} imgHeight="32" imgWidth="32" status="online" className="width-10-per" />
                                ) : (
                                    <Avatar
                                        className="width-10-per"
                                        color="primary"
                                        imgHeight="32"
                                        imgWidth="32"
                                        status="online"
                                        content={item.contact.fullName.charAt(0).toUpperCase() || 'N/A'}
                                    />
                                )}
                                <div className='chat-info flex-grow-1 width-70-per'>
                                    <h5 className='mb-0'>{item.contact.fullName}</h5>
                                    <CardText className='text-truncate'>
                                        {item.chat[item.chat.length - 1].message}
                                    </CardText>
                                </div>
                                <div className='chat-meta text-nowrap'>
                                    <small className='float-end mb-25 chat-time ms-25'>{time}</small>
                                    {item?.unseenMsgs >= 1 ? (
                                        <Badge className='float-end' color='danger' pill>
                                            {item.unseenMsgs}
                                        </Badge>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    } else {
        return null
    }
}

export default memo(RenderChats);
