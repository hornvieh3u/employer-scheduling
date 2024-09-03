import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point
export const uploadBannerFileRequest = (payload) => API.post(`/file-manager/fileupload`, payload);
export const submitReply = (payload) => API.post(`/file-manager/fileupload`, payload);
export const deleteGuest = ({ eventId, guestId }) => API.delete(`event/delete-guests/${eventId}/${guestId}`);



