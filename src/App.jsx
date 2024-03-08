import './index.css'

import imagen from './1.jpeg'

export default function App() {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="shrink-0">
        <img className="h-12 w-12" src={imagen} alt="hola"/>
      </div>
      <div>
        <div className="text-xl font-medium text-black">hola</div>
        <p className="text-slate-500">asdasd</p>
      </div>
    </div>
  )
}

