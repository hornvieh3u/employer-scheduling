import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

//upload document
export async function useUploadDocument(payload) {
  try {
    const { data } = await API.post(ENDPOINTS.UPLOAD_DOCUMENT, payload);
    if (data) {
      if (data.success) {
        toast.success('Document loaded successfully');
      } else {
        toast.error('Document loading failed');
      }
    }
    return data;
  } catch (error) {
    toast.error('Your session has been expired. please login again!');
  }
}

//add recipients
export async function addRecipients(payload) {
  const { data } = await API.post(ENDPOINTS.ADD_RECIPIENTS + payload.documentId, payload);
  return data;
}

export function useAddRecipients() {
  //const queryClient = useQueryClient()
  return useMutation(addRecipients, {
    onSuccess: () => {
      toast.success('details added successfully');
    },
    onError: () => {
      toast.error('Unable to create recipients. Please try again');
    }
  });
}

//update recipient

export async function putSendEmail(id, payload, sendEmail) {
  const { data } = await API.put(
    ENDPOINTS.ADD_RECIPIENTS + id + '?sendEmail=' + sendEmail,
    payload
  );
  if (data) {
    if (sendEmail === true) {
      toast.success('Emails sent to all recipients successfully');
    } else {
      toast.success('Details added successfully');
    }
  }
  return data;
}

///api/document/email-link?hashCode=12345
export async function getEmailLink(hashcode) {
  try {
    const data = await API.post(ENDPOINTS.GET_DOC_BY_HASH + hashcode);
    return data;
  } catch (error) {
    window.location.href = `/document/email-link/`;
  }
}
export async function getDocumentWithToken(token, hashCode) {
  try {
    const { data } = await API.get(ENDPOINTS.GET_DOC_BY_TOKEN + token + '&hashCode=' + hashCode);
    return data;
  } catch (error) {
    window.location.href = `/document/email-link/`;
  }
}

//api/document/documentId/:id
export async function getDocumentById(id) {
  const data = await API.get(ENDPOINTS.Get_DOCUMENT_BY_ID + id);
  return data;
}

//get user documents
export async function getUserDocuments() {
  try {
    const { data } = await API.get(ENDPOINTS.GET_USER_DOCS);
    return data;
  } catch (error) {
    toast.error('Something went wrong please try again later');
  }
}

export async function getReceivedDocuments() {
  try {
    const { data } = await API.get(ENDPOINTS.GET_RECEIVED_DOCS);
    return data;
  } catch (error) {
    toast.error('Something went wrong please try again later');
  }
}
export async function deleteDocuments(payload) {
  try {
    const temp = {
      ids: payload
    };

    const { data } = await API.post(ENDPOINTS.DELETE_DOCUMENTS, temp);
    if (data.success) {
      toast.error('Document deleted successfully!');
    } else {
      toast.error('Something went wrong please try again later');
    }
  } catch (error) {
    toast.error('Something went wrong please try again later');
  }
}

export async function resendDocs(payload) {
  //payload === list of ids
  try {
    const { data } = await API.post(ENDPOINTS.DOCUMENT_RESEND, payload);
    if (data.success) {
      toast.success('Reminder email sent to all recipients successfully!');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {
    toast.error('Something went wrong! Please try again!');
  }
}
