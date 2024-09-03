import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

//add signature and initial
export async function useAddSignatureAndInitial(payload) {
  try {
    const { data } = await API.post(ENDPOINTS.SIGNATURE_AND_INITIAL, payload);
    return data;
  } catch (err) {
    toast.error('ERROR: An error occured! Please try again ');
  }
}

export async function useEditSignatureAndInitial(signatureId, isSignature, id, payload, isInitial) {
  try {
    const { data } = await API.put(
      `${ENDPOINTS.SIGNATURE_AND_INITIAL}?signatureId=${signatureId}&isSignature=${isSignature}&id=${id}&isInitial=${isInitial}`,
      payload
    );
    return data;
  } catch (err) {
    toast.error('ERROR: An error occured! Please try again ');
  }
}
export async function useGetSignatureAndInitial(email) {
  try {
    const { data } = await API.get(`${ENDPOINTS.SIGNATURE_AND_INITIAL}?email=${email}`);
    return data;
  } catch (err) {
    toast.error('ERROR: An error occured! Please try again ');
  }
}

export async function useUploadSignature(payload) {
  try {
    const { data } = await API.post(ENDPOINTS.UPLOAD_SIGNATURES, payload);

    return data;
  } catch (error) {
    toast.error('Something went wrong! Please try again');
  }
}

export async function useDeleteFileUpload(payload) {
  try {
    const { data } = await API.delete(ENDPOINTS.UPLOAD_SIGNATURES, payload);

    return data;
  } catch (error) {
    toast.error('Something went wrong! Please try again');
  }
}

export async function editDocFromRecipient(id, payload, sendEmail, token) {
  const { data } = await API.put(
    ENDPOINTS.EDIT_RECIPIENTS + id + '?token=' + token + '?sendEmail=' + sendEmail,
    payload
  );
  if (data) {
    if (sendEmail == true) {
      toast.success('Emails sent to all recipients successfully');
    } else {
      toast.success('Details added successfully');
    }
  }
  return data;
}

export async function editDocFromRecipientNoReturn(id, payload, sendEmail, token) {
  const { data } = await API.put(
    ENDPOINTS.EDIT_RECIPIENTS + id + '?token=' + token + '?sendEmail=' + sendEmail,
    payload
  );

  return data;
}
