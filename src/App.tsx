
import './App.css'
import { FormBuilderProvider } from './context/formBuilderContext'
import RoutesComponent from './routes'

function App() {

  return (
    <FormBuilderProvider>
      <RoutesComponent />
    </FormBuilderProvider>
  )
}

export default App
