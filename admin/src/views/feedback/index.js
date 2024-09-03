import { Fragment } from "react";
import { Link } from "react-router-dom";

import {
  ListGroup,
  ListGroupItem,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

const Feedback = () => {
  return (
    <Fragment>
      <Breadcrumb className="ms-1 mb-2">
        <BreadcrumbItem>
          <Link to="/"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Feedback </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <ListGroup>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          <span>Biscuit jelly beans macaroon danish pudding.</span>
          <Badge color="primary" pill>
            4
          </Badge>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          <span>chocolate cheesecake candy.</span>
          <Badge color="primary" pill>
            2
          </Badge>
        </ListGroupItem>
        <ListGroupItem className="d-flex justify-content-between align-items-center">
          <span>Oat cake icing pastry pie carrot.</span>
          <Badge color="primary" pill>
            1
          </Badge>
        </ListGroupItem>
      </ListGroup>
      <Pagination className="d-flex mt-3">
        <PaginationItem>
          <PaginationLink href="#" first>
            <ChevronLeft size={15} /> Prev
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" last>
            Next
            <ChevronRight size={15} />
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Fragment>
  );
};
export default Feedback;
