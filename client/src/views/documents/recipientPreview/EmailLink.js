import React, { useEffect } from 'react';
import { getEmailLink } from '../../../requests/documents/create-doc';

export default function EmailLink() {
  useEffect(() => {
    const windowUrl = window.location.href.split('/');
    const hashcode = windowUrl[windowUrl.length - 1];
    getEmailLink(hashcode).then((data) => {
      if (data) {
        //save token
        localStorage.setItem('recipientToken', data.data.recipient.auth.token);
        localStorage.setItem('recipientExpireTime', data.data.recipient.auth.expireTime);

        window.location.href = `/document/preview/${hashcode}`;
      }
    });
  }, []);
  return <div></div>;
}
