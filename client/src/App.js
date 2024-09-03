// ** Router Import
import Router from './router/Router'

// ** React Query Import
import { QueryClientProvider, QueryClient } from 'react-query'
import { SocketProvider } from './utility/context/Socket'

const client = new QueryClient({})

const App = () => {

    return (
    <QueryClientProvider client={client}>
        <SocketProvider>
            <Router />
        </SocketProvider>
    </QueryClientProvider>
    )
}

export default App
