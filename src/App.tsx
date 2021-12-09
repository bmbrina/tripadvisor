import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Views
import Issues from './views/Issues'
import Issue from './views/Issue'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Navigate replace to="/issues" />} />
          <Route path="issues" element={<Issues />}>
            <Route path=":id" element={<Issue />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App