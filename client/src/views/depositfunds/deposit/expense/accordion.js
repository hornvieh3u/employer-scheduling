import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import DataTable from 'react-data-table-component';

function Example(props) {
  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  //table data

  const data = [
    {
      id: 1,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 2,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 3,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 4,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 5,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 6,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 7,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 8,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 9,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 10,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    },
    {
      id: 11,
      date: '1/12/2022',
      title: 'Beetlejuice',
      name: 'abc',
      category: 'transport',
      subcategory: 'transport',
      mode: 'cash',
      amount: 1000,
      status: 'recieved'
    }
  ];
  const columns = [
    {
      name: 'Date',
      selector: (row) => row.title
    },
    {
      name: 'FullName',
      selector: (row) => row.name
    },
    {
      name: 'Category',
      selector: (row) => row.category
    },
    {
      name: 'SubCategory',
      selector: (row) => row.subcategory
    },
    {
      name: 'Mode',
      selector: (row) => row.mode
    },
    {
      name: 'Amount',
      selector: (row) => row.amount
    },
    {
      name: 'Status',
      selector: (row) => row.status
    }
  ];

  //table data

  return (
    <div>
      <Accordion flush open={open} toggle={toggle}>
        <AccordionItem className="bg-light">
          {props.accordiondata?.map((item, i) => (
            <>
              <AccordionHeader className="m-1" targetId={(i + 1).toString()}>
                {item}
              </AccordionHeader>
              <AccordionBody accordionId={(i + 1).toString()}>
                <DataTable columns={columns} data={data} pagination />
              </AccordionBody>
            </>
          ))}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Example;
