// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'

// ** Navbar Import
import Navbar from './components/navbar'

const VerticalLayout = (props) => {
    // const [menuData, setMenuData] = useState([])

    // ** For ServerSide navigation
    // useEffect(() => {
    //   axios.get(URL).then(response => setMenuData(response.data))
    // }, [])

    return (
        <Layout
            navbar={(props) => <Navbar {...props} />}
            menuData={navigation}
            {...props}
        >
            {props.children}
        </Layout>
    )
}

export default VerticalLayout
