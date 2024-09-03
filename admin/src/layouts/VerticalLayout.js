// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Navbar Import
import Navbar from "./components/navbar";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";

const VerticalLayout = (props) => {
  return (
    <Layout
      navbar={(props) => <Navbar {...props} />}
      menuData={navigation}
      {...props}
    >
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
