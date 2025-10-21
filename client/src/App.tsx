import { LogsCard, MainCard } from './components/main_card';

function App() {
	const droneId: string = import.meta.env.VITE_DRONE_ID;

	return (
		<>
			<div className="flex flex-col xl:p-8 p-5 items-center min-h-screen bg-gray-100 gap-5">
				<MainCard droneId={droneId} />
				<LogsCard droneId={droneId} />
			</div>
		</>
	);
}

export default App;
