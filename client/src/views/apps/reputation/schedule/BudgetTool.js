import React from 'react';
import { Badge, Input } from 'reactstrap';

const BudetTool = ({ openfooter }) => {
  return (
    <>
      <table className="w-100 bordered-table">
        <thead>
          <tr>
            <td width={'300'} className="cursor-pointer pl-1 pr-1">
              <div className="d-flex justify-content-between p-1 justify-content-between">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>Actual</span>
                <span>298.26</span>
              </div>
            </td>
            <td width="100" height="50" className="cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>298</span>
              </div>
            </td>
            <td width="100" height="50" className="cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>298</span>
              </div>
            </td>
            <td width="100" height="50" className="cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>298</span>
              </div>
            </td>
            <td width="100" height="50" className="cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>298</span>
              </div>
            </td>
            <td width="100" height="50" className="cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>298</span>
              </div>
            </td>
            <td width="100" height="50" className="cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>298</span>
              </div>
            </td>
            <td width="100" height="50" className="cursor-pointer ">
              <div className="d-flex justify-content-between p-1">
                <div>
                  <Badge>1</Badge>
                </div>
                <span>298</span>
              </div>
            </td>
          </tr>
        </thead>
        {openfooter ? (
          <tbody>
            <tr>
              <td className="cursor-pointer p-1">
                <div>
                  <span>Compare to actual</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="borderright cursor-pointer border-right d-flex align-items-center font-small-3">
                    <b>Projected</b>
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <b>Actuals</b>
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="borderright cursor-pointer border-right d-flex align-items-center font-small-3">
                    <b>Projected</b>
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <b>Actuals</b>
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="borderright cursor-pointer border-right d-flex align-items-center font-small-3">
                    <b>Projected</b>
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <b>Actuals</b>
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="borderright cursor-pointer border-right d-flex align-items-center font-small-3">
                    <b>Projected</b>
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <b>Actuals</b>
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="borderright cursor-pointer border-right d-flex align-items-center font-small-3">
                    <b>Projected</b>
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <b>Actuals</b>
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="borderright cursor-pointer border-right d-flex align-items-center font-small-3">
                    <b>Projected</b>
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <b>Actuals</b>
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="borderright cursor-pointer border-right d-flex align-items-center font-small-3">
                    <b>Projected</b>
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <b>Actuals</b>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex justify-content-between p-1">
                  <span>Hours Target</span>
                  <div>
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex justify-content-between  align-items-center p-1">
                  <span>Sales</span>
                  <div>$0 proj.($0 act.)</div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex justify-content-between  align-items-center p-1">
                  <span>Labor</span>
                  <div>$0 proj.($0 act.)</div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex h-100 w-100">
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                  <div className="cursor-pointer d-flex justify-content-between align-items-center borderleft font-small-3">
                    <Input className="p-0" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="d-flex justify-content-between  align-items-center p-1">
                  <span>Back of House</span>
                  <div>
                    <Badge>0</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="p-1 d-flex justify-content-between">
                  <span>Front of House</span>
                  <div>
                    <Badge>0</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
              <td height="30" width="150">
                <div className="d-flex justify-content-between align-items-center p-1 h-100 w-100">
                  <div>
                    <Badge>1</Badge>
                  </div>
                  <span>0 Hrs $0</span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : null}
      </table>
    </>
  );
};

export default BudetTool;
