import { useEffect, useState } from 'react';
import { addIcon, refreshIcon } from '../utils/icon';
import { Loading } from './loading_screen';
import axios from 'axios';
import { LoadingTable, Table } from './table';
import AppService from '../services/app.service';

export const MainCard = ({ droneId }: { droneId: string }) => {
	const [droneConfig, setDroneConfig] = useState<any>();
	const [loading, setLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		getDroneConfig();
	}, [droneId]);

	const onRefresh = () => {
		console.log('Refresh clicked');
		getDroneConfig();
	};

	const getDroneConfig = async () => {
		if (!droneId) return;

		if (loading) return;
		setLoading(true);

		try {
			console.log('Fetching drone config for ID:', droneId);
			const res = await AppService.getDroneConfig(droneId);
			setDroneConfig(res.data);
			localStorage.setItem('droneConfig', JSON.stringify(res.data));
			setLoading(false);
		} catch (e) {
			console.error('Error fetching drone config:', e);
			if (axios.isAxiosError(e)) {
				setIsError(true);
				setErrorMessage(
					e.response?.data?.message || 'Unknown error occurred'
				);
			} else {
				setIsError(true);
				setErrorMessage('An unexpected error occurred');
			}

			setLoading(false);
		}
	};

	return (
		<div className="block max-w-full py-6 px-5 xl:px-10 xl:w-250 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
			<div className="flex flex-row justify-between items-center">
				<h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
					Drone Configuration
				</h5>
				<button
					type="button"
					onClick={onRefresh}
					className="text-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
				>
					{refreshIcon()} &nbsp;Refresh
				</button>
			</div>
			{loading && <Loading />}
			{!loading && droneConfig && (
				<div className="flex flex-wrap mt-6 md:mt-4 md:px-20 justify-between gap-4 md:gap-10">
					<div className="flex flex-col items-center justify-center w-full md:w-auto">
						<dt className="text-2xl font-extrabold">
							#{droneConfig.drone_id}
						</dt>
					</div>
					<div className="flex flex-col items-center justify-center">
						<dt className="mb-2 text-2xl font-extrabold">
							{droneConfig.drone_name}
						</dt>
						<dd className="text-gray-500 ">Drone Name</dd>
					</div>
					<div className="flex flex-col items-center justify-center">
						<dt className="mb-2 text-2xl font-extrabold">
							{droneConfig.light.toUpperCase()}
						</dt>
						<dd className="text-gray-500 ">Light</dd>
					</div>
					<div className="flex flex-col items-center justify-center">
						<dt className="mb-2 text-2xl font-extrabold">
							{droneConfig.country}
						</dt>
						<dd className="text-gray-500 ">Country</dd>
					</div>
				</div>
			)}
			{!loading && isError && (
				<div
					className="mt-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg"
					role="alert"
				>
					<strong className="font-bold">#{droneId}</strong>
					<span className="block">{errorMessage}</span>
				</div>
			)}
		</div>
	);
};

export const LogsCard = ({ droneId }: { droneId: string }) => {
	const [droneLogs, setDroneLogs] = useState<any>();
	const [droneConfig, setDroneConfig] = useState<any>();
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getDroneLogs();
		const x = setInterval(() => {
			console.log('Checking for droneConfig in localStorage...');
			const storedConfig = localStorage.getItem('droneConfig');
			if (storedConfig) {
				setDroneConfig(JSON.parse(storedConfig));
				clearInterval(x);
			}
			
		}, 500);
	}, [droneId, page]);

	const onRefresh = () => {
		if (page == 1) return getDroneLogs();
		setPage(1);
	};

	const getDroneLogs = async () => {
		if (!droneId) return;

		if (loading) return;
		setLoading(true);

		try {
			console.log('Fetching drone logs for ID:', droneId);
			const res = await AppService.getDroneLogs(droneId, page)
			setDroneLogs(res.data);
			setLoading(false);
		} catch (e) {
			console.error('Error fetching drone config:', e);
			setLoading(false);
		}
	};

	const pageChange = (newPage: number) => {
		setPage((_) => _ + newPage);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const celsius = formData.get('celsius');
		if (!celsius) return;

		const droneConfig = localStorage.getItem('droneConfig');
		if (!droneConfig) return;
		const parsedConfig = JSON.parse(droneConfig);

		const payload = {
			...parsedConfig,
			celsius: Number(celsius),
		};

		try {
			await AppService.createLogEntry(payload);
			const modal = document.querySelector(
				'button[data-modal-hide="form-modal"]'
			);
			if (modal) {
				const input = document.querySelector(
					'input[name="celsius"]'
				) as HTMLInputElement;
				if (input) {
					console.log('Clearing input field');
					input.value = '';
				}
				(modal as HTMLButtonElement).click();
				onRefresh();
			}
		} catch (e) {
			console.error('Error adding log:', e);
		}
	};

	return (
		<div className="block max-w-full py-6 px-5 xl:px-10 xl:w-250 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
			<div className="flex flex-row justify-between items-center">
				<h5 className="mb-2 text-3xl font-bold text-gray-900 flex-auto">
					Drone Logs
				</h5>
				<div className="flex flex-wrap justify-end items-center gap-2 flex-2">
					<button
						type="button"
						disabled={!droneConfig}
						data-modal-target="form-modal"
						data-modal-toggle="form-modal"
						className="text-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{addIcon()} &nbsp;Add Log
					</button>
					<button
						type="button"
						onClick={onRefresh}
						className="text-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
					>
						{refreshIcon()} &nbsp;Refresh
					</button>
				</div>
			</div>
			{loading && (
				<>
					<LoadingTable />
					<div className="flex flex-row justify-center items-center p-4 space-x-2">
						<button
							disabled
							className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<svg
								className="w-3.5 h-3.5 me-2 rtl:rotate-180"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 5H1m0 0 4 4M1 5l4-4"
								/>
							</svg>
							Previous
						</button>
						<div>
							Page {droneLogs?.page || 0} of{' '}
							{droneLogs?.totalPages || 0}
						</div>
						<button
							disabled
							className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
							<svg
								className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</button>
					</div>
				</>
			)}
			{!loading && droneLogs && (
				<>
					<Table data={droneLogs} />
					<div className="flex flex-row justify-center items-center p-4 space-x-2">
						<button
							onClick={() => pageChange(-1)}
							disabled={droneLogs.page == 1}
							className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<svg
								className="w-3.5 h-3.5 me-2 rtl:rotate-180"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 5H1m0 0 4 4M1 5l4-4"
								/>
							</svg>
							Previous
						</button>
						<div>
							Page {droneLogs.page} of {droneLogs.totalPages}
						</div>
						<button
							onClick={() => pageChange(1)}
							disabled={droneLogs.page >= droneLogs.totalPages}
							className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
							<svg
								className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</button>
					</div>
				</>
			)}
			<div
				id="form-modal"
				tabIndex={-1}
				className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
			>
				<div className="relative p-4 w-full max-w-md max-h-full">
					<div className="relative bg-white rounded-lg shadow-sm">
						<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
							<h3 className="text-xl font-semibold text-gray-900">
								Add Log
							</h3>
							<button
								type="button"
								className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
								data-modal-hide="form-modal"
							>
								<svg
									className="w-3 h-3"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 14 14"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
									/>
								</svg>
								<span className="sr-only">Close modal</span>
							</button>
						</div>
						<div className="p-4 md:p-5">
							<form
								onSubmit={onSubmit}
								className="space-y-4"
								action="#"
							>
								<div>
									<label
										htmlFor="celsius"
										className="block mb-2 text-sm font-medium text-gray-900"
									>
										Celsius
									</label>
									<input
										type="number"
										name="celsius"
										id="celsius"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										placeholder="100"
										required
									/>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								>
									Add
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
