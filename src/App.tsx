import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Views
import Issues from './views/Issues'
import Issue from './views/Issue'

const App = () => {
  const { NODE_ENV } = process.env
  return (
    <div className="App">
      <BrowserRouter basename={NODE_ENV === 'deployment' ? '/' : '/tripadvisor'}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/issues" />} />
          <Route path="issues" element={<Issues />} />
          <Route path="issue/:owner/:repo/:id" element={<Issue />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
