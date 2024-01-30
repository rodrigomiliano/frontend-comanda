import { CssBaseline } from '@material-ui/core'

import './App.css'
import AppRouter from './routers/AppRouter'


function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AppRouter />
    </div>
  );
}

export default App;
