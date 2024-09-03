// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap'

const FileManagerItem = ({ icon, color, stats, renderStats, statTitle, className, statsMargin }) => {
  return (
    <Card>
      <CardBody className={className}>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            {renderStats ? (
              renderStats
            ) : (
              <h2
                className={classnames('fw-bolder', {
                  'mb-0': !statsMargin,
                  [statsMargin]: statsMargin
                })}
              >
                {stats}
              </h2>
            )}

            <p className='card-text'>{statTitle}</p>
          </div>
          <div className={`avatar avatar-stats p-50 m-0 ${color ? `bg-light-${color}` : 'bg-light-primary'}`}>
            <div className='avatar-content'>{icon}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default FileManagerItem


