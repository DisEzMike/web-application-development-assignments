import { useEffect, useState } from 'react';
import { addIcon, refreshIcon } from '../utils/icon';
import { Loading } from './loading_screen';
import axios from 'axios';
import { LoadingTable, Table } from './table';

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
			const res = await axios.get(
				'http://localhost:3000/configs/' + droneId
			);
			setDroneConfig(res.data);
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
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getDroneLogs();
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
			const res = await axios.get(
				`http://localhost:3000/logs/${droneId}?page=${page}`
			);
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

	return (
		<div className="block max-w-full py-6 px-5 xl:px-10 xl:w-250 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
			<div className="flex flex-row justify-between items-center">
				<h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
					Drone Logs
				</h5>
				<div className="flex flex-wrap justify-between items-center gap-2">
					<button
						type="button"
						onClick={onRefresh}
						className="text-gray-900 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
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
								aria-hidden="true"
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
								aria-hidden="true"
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
								aria-hidden="true"
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
								aria-hidden="true"
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
		</div>
	);
};
