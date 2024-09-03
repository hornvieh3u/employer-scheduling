import React, { memo, lazy, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'reactstrap';
const TextChatTabs = lazy(() => import('./chatCategoryTabs/index'));
const Layout = lazy(() => import('./Layout'));

function Text() {
  // const store = useSelector((state) => state.text);

  return (
    <Fragment>
      <TextChatTabs />
      <Card>
        <Layout />
      </Card>
    </Fragment>
  );
}
export default memo(Text);
