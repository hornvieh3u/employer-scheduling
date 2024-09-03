import React from 'react';
import { FaConnectdevelop } from 'react-icons/fa';
import { Badge, Input } from 'reactstrap';

const LaborTool = ({ openfooter }) => {
  return (
    <>
      <table className="w-100">
        <thead>
          <tr>
            <td width={'300'} className="border cursor-pointer pl-1 pr-1">
              <div className="d-flex justify-content-between p-1 justify-content-between">
                <FaConnectdevelop />
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
            <td width="100" height="50" className="border cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
            <td width="100" height="50" className="border cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
            <td width="100" height="50" className="border cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
            <td width="100" height="50" className="border cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
            <td width="100" height="50" className="border cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
            <td width="100" height="50" className="border cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
            <td width="100" height="50" className="border cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>-</Badge>
                </div>
                <div>
                  <span>298.26</span>
                </div>
              </div>
            </td>
          </tr>
        </thead>
        {openfooter ? (
          <tbody>
            <tr></tr>
          </tbody>
        ) : null}
      </table>
    </>
  );
};

export default LaborTool;
