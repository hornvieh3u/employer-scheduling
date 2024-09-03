// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL';

// ** Third Party Components
import wNumb from 'wnumb';
import classnames from 'classnames';
import { Star } from 'react-feather';
import Nouislider from 'nouislider-react';

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap';

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss';
import { useState } from 'react';

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, type, setType } = props;

  // ** Hooks
  const [isRtl] = useRTL();

  // ** Array of categories
  const types = [
    {
      id: 'general',
      title: 'General',
      defaultChecked: true
    },
    {
      id: 'weapons',
      title: 'Weapons'
    },
    {
      id: 'tcusa',
      title: 'TC USA'
    },
    {
      id: 'university',
      title: 'CMA University'
    }
  ];

  // ** Array of brands
  const brands = [
    {
      title: 'Little Tigers',
      total: 633,
      type: 'membership',
      checked: true
    },
    {
      title: 'BBC',
      total: 591,
      type: 'membership'
    },
    {
      title: 'Regular',
      total: 530,
      type: 'membership'
    },
    {
      title: 'Other',
      total: 422,
      type: 'membership',
      checked: true
    },
    {
      title: 'Uniform',
      type: 'product',
      total: 394
    },
    {
      title: 'Belt',
      type: 'product',
      total: 350
    },
    {
      title: 'Equipment',
      type: 'product',
      total: 320
    },
    {
      title: 'Other',
      type: 'product',
      total: 318
    }
  ];

  // ** Array of ratings
  const ratings = [
    {
      ratings: 4,
      total: 160
    },
    {
      ratings: 3,
      total: 176
    },
    {
      ratings: 2,
      total: 291
    },
    {
      ratings: 1,
      total: 190
    }
  ];

  return (
    <div className="sidebar-detached sidebar-left">
      <div className="sidebar">
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block">Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <Link to="/manage-course">
                <Button color="primary" block>
                  Manage Courses
                </Button>
              </Link>

              <div id="product-categories">
                <h6 className="filter-title">Curriculum</h6>
                <ul className="list-unstyled categories-list">
                  {types.map((category) => {
                    return (
                      <li key={category.id}>
                        <div className="form-check" onChange={(e) => setType(e.target.value)}>
                          <Input
                            type="radio"
                            id={category.id}
                            value={category.id}
                            name="category-radio"
                            onChec={(e) => setType(category.id)}
                            defaultChecked={category.defaultChecked}
                          />
                          <Label className="form-check-label" for={category.id}>
                            {category.title}
                          </Label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="brands">
                <h6 className="filter-title">Filter</h6>
                <ul className="list-unstyled brand-list">
                  {brands
                    .filter((category) => category.type === type)
                    .map((brand) => {
                      return (
                        <li key={brand.title}>
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              id={brand.title}
                              defaultChecked={brand.checked}
                            />
                            <Label className="form-check-label" for={brand.title}>
                              {brand.title}
                            </Label>
                          </div>
                          <span>{brand.total}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="multi-range-price">
                <h6 className="filter-title mt-0">Multi Range</h6>
                <ul className="list-unstyled price-range">
                  <li>
                    <div className="form-check">
                      <Input type="radio" id="all" name="price-range-radio" defaultChecked />
                      <Label className="form-check-label" for="all">
                        All
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <Input type="radio" id="10-dollars-below" name="price-range-radio" />
                      <Label className="form-check-label" for="10-dollars-below">{`<=$10`}</Label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <Input type="radio" id="10-100-dollars" name="price-range-radio" />
                      <Label className="form-check-label" for="10-100-dollars">
                        $10-$100
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <Input type="radio" id="100-500-dollars" name="price-range-radio" />
                      <Label className="form-check-label" for="100-500-dollars">
                        $100-$500
                      </Label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <Input type="radio" id="500-dollars-above" name="price-range-radio" />
                      <Label className="form-check-label" for="500-dollars-above">{`>=$500`}</Label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="price-slider">
                <h6 className="filter-title">Price Range</h6>
                <div className="price-slider">
                  <Nouislider
                    className="range-slider mt-2"
                    direction={isRtl ? 'rtl' : 'ltr'}
                    start={[1500, 3500]}
                    connect={true}
                    tooltips={[true, true]}
                    format={wNumb({
                      decimals: 0
                    })}
                    range={{
                      min: 51,
                      max: 5000
                    }}
                  />
                </div>
              </div>
              <div id="ratings">
                <h6 className="filter-title">Ratings</h6>
                {ratings.map((item) => {
                  return (
                    <div key={item.total} className="ratings-list">
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        <ul className="unstyled-list list-inline">
                          {new Array(5).fill().map((listItem, index) => {
                            return (
                              <li key={index} className="ratings-list-item me-25">
                                <Star
                                  className={classnames({
                                    'filled-star': index + 1 <= item.ratings,
                                    'unfilled-star': index + 1 > item.ratings
                                  })}
                                />
                              </li>
                            );
                          })}
                          <li>& up</li>
                        </ul>
                      </a>
                      <div className="stars-received">{item.total}</div>
                    </div>
                  );
                })}
              </div>
              <div id="clear-filters">
                <Button color="primary" block>
                  Clear All Filters
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
