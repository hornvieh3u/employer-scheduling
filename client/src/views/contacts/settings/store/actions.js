import {
  // group apis
  createGroup,
  getGroups,
  updateGroup,
  deleteGroup,
  // position apis
  getPositions,
  createPosition,
  deletePosition,
  updatePosition,
  // shift apis
  getShifts,
  createShift,
  deleteShift,
  updateShift,
  getSchedules,
  addEmployeesToSchedule,
  addShiftsToSchedule,
  updateEmployeePosition,
  updateShiftSchedule
} from './api';
import {
  getGroupSuccess,
  getPositionSuccess,
  getShiftSuccess,
  modifiedSuccess,
  getSchedulesSuccess
} from './reducer';

export const getGroupsRequest = payload => async dispatch => {
  try {
    const { data } = await getGroups(payload);
    dispatch(getGroupSuccess( data ));
  } catch ( error ) {
    
  }
}

export const createGroupRequest = payload => async dispatch => {
  try {
    const { data } = await createGroup(payload);
    dispatch(modifiedSuccess(data));
    dispatch(getGroupsRequest({}));
  } catch( error ) {
    // err
  }
}

export const updateGroupRequest = (id, payload) => async dispatch => {
  try {
    const { data } = await updateGroup(id, payload);
    dispatch(modifiedSuccess(data));
    dispatch(getGroupsRequest({}));
  } catch( error ) {
    // err
  }
}

export const deleteGroupRequest = groupId => async dispatch => {
  try {
    const { data } = await deleteGroup(groupId);
    dispatch(modifiedSuccess(data));
    dispatch(getGroupsRequest({}));
  } catch( error ) {
    // err
  }
}

export const getPositionsRequest = payload => async dispatch => {
  try {
    const { data } = await getPositions(payload);
    dispatch(getPositionSuccess( data ));
  } catch( error ) {

  }
}

export const createPositionRequest = payload => async dispatch => {
  try {
    const { data } = await createPosition(payload);
    dispatch(modifiedSuccess({
      message: data.success,
      success: true
    }));
    dispatch(getPositionsRequest({}));
    dispatch(getGroupsRequest({}));
  } catch(err) {

  }
}

export const updatePositionRequest = (id, position) => async dispatch => {
  try {
    const { data } = await updatePosition(id, position);
    dispatch(modifiedSuccess( data ));
    dispatch(getPositionsRequest({}));
    dispatch(getGroupsRequest({}));
  } catch (error) {

  }
}

export const deletePositionRequest = id => async dispatch => {
  try {
    const { data } = await deletePosition(id);
    dispatch(modifiedSuccess( data ));
    dispatch(getPositionsRequest({}));
    dispatch(getGroupsRequest({}));
  } catch (error) {

  }
}

export const getShiftsRequest = payload => async dispatch => {
  try {
    const { data } = await getShifts(payload);
    dispatch(getShiftSuccess( data ));
  } catch ( error ) {

  }
}

export const createShiftRequest = payload => async dispatch => {
  try {
    const { data } = await createShift(payload);
    dispatch(modifiedSuccess(data));
    dispatch(getShiftsRequest({}));
  } catch( error ) {

  }
}

export const updateShiftRequest = (id, shift) => async dispatch => {
  try {
    const { data } = await updateShift(id, shift);
    dispatch(modifiedSuccess(data));
    dispatch(getShiftsRequest({}));
  } catch( error ) {

  }
}

export const deleteShiftRequest = id => async dispatch => {
  try {
    const { data } = await deleteShift(id);
    dispatch(modifiedSuccess(data));
    dispatch(getShiftsRequest({}));
  } catch( error ) {

  }
}

export const getSchedulesRequest = payload => async dispatch => {
  try {
    const { data } = await getSchedules(payload);
    dispatch( getSchedulesSuccess( data ) );
  } catch(error) {
    
  }
}

export const addEmployeesToScheduleRequest = (employeeIds, dateRange) => async dispatch => {
  try {
    const { data } = await addEmployeesToSchedule(employeeIds);
    if( data.success ) {
      dispatch( getSchedulesRequest(dateRange) )
    }
  } catch( error ) {

  }
}

export const addShiftsToScheduleRequest = (params, dateRange) => async dispatch => {
  try {
    const { data } = await addShiftsToSchedule( params );
    if( data.success ) {
      dispatch( getSchedulesRequest(dateRange) );
    }
  } catch(err) {

  }
}

export const updateEmployeePositionRequest = params => async dispatch => {
  try {
    const { data } = await updateEmployeePosition( params );
    if( data.success ) {
      dispatch( getSchedulesRequest(dateRange) );
    }
  } catch (error) {

  }
}

export const updateShiftScheduleRequest = params => async dispatch => {
  try {
    const { data } = await updateShiftSchedule( params );
    if( data.success ) {
      dispatch( getSchedulesRequest(dateRange) );
    }
  } catch (error) {

  }
}