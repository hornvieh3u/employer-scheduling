// ** Icons Import

import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { AiOutlineCalculator } from 'react-icons/ai';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';

export default [
  {
    id: 'finance',
    title: 'Finance',
    action: 'manage',
    resource: 'finance',
    icon: <RiMoneyDollarBoxLine size={20} />,
    children: [
      {
        id: 'invoice',
        title: 'Invoice',
        icon: <RiMoneyDollarBoxLine size={20} />,
        navLink: '/invoice/list',
        action: 'manage',
        resource: 'finance/invoice',
      },
      {
        id: 'income',
        title: 'Income',
        icon: <GiReceiveMoney size={20} />,
        navLink: '/finance/income',
        action: 'manage',
        resource: 'finance/income',
      },
      {
        id: 'expense',
        title: 'Expense',
        icon: <GiPayMoney size={20} />,
        navLink: '/finance/expense',
        action: 'manage',
        resource: 'finance/expense',
      },
      {
        id: 'profitnloss',
        title: 'Profit & Loss',
        icon: <AiOutlineCalculator size={20} />,
        navLink: '/finance/pnl',
        action: 'manage',
        resource: 'finance/profitnloss',
      }
    ]
  }
];
