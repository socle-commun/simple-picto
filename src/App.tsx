import { useState } from "react"

import viteLogo from "/vite.svg"

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank" rel="noopener">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
			</div>
			<h1>Vite</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)} className="bg-sky-500">
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the logos to learn more
			</p>
		</>
	)
}

export default App
