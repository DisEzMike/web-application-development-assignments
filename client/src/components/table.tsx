export const Table = ({ data }: { data: any }) => {
	return (
		<div className="relative overflow-x-auto overflow-y-scroll h-120 shadow-md sm:rounded-lg mt-5">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-3">
							#
						</th>
						<th scope="col" className="px-6 py-3">
							Created
						</th>
						<th scope="col" className="px-6 py-3">
							Country
						</th>
						<th scope="col" className="px-6 py-3">
							Drone ID
						</th>
						<th scope="col" className="px-6 py-3">
							Drone Name
						</th>
						<th scope="col" className="px-6 py-3">
							Celsius
						</th>
					</tr>
				</thead>
				<tbody>
					{data.items.length > 0 &&
						data.items.map((log: any, idx: number) => {
							return (
								<tr
									key={`${log.drone_id}-${log.created}`}
									className="bg-white border-b border-gray-200"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
									>
										{idx + data.page * data.perPage - 11}
									</th>
									<td className="px-6 py-4">
										{new Date(log.created).toLocaleString()}
									</td>
									<td className="px-6 py-4">{log.country}</td>
									<td className="px-6 py-4">
										{log.drone_id}
									</td>
									<td className="px-6 py-4">
										{log.drone_name}
									</td>
									<td className="px-6 py-4">{log.celsius}</td>
								</tr>
							);
                        })}
                    {data.items.length === 0 && (
                        <tr className="bg-white border-b border-gray-200">
                            <td
                                colSpan={6}
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                            >
                                No data available.
                            </td>
                        </tr>
                    )}
				</tbody>
			</table>
		</div>
	);
};

export const LoadingTable = () => {
	return (
		<div className="relative overflow-x-auto h-120 shadow-md sm:rounded-lg mt-5">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-3">
							#
						</th>
						<th scope="col" className="px-6 py-3">
							Created
						</th>
						<th scope="col" className="px-6 py-3">
							Country
						</th>
						<th scope="col" className="px-6 py-3">
							Drone ID
						</th>
						<th scope="col" className="px-6 py-3">
							Drone Name
						</th>
						<th scope="col" className="px-6 py-3">
							Celsius
						</th>
					</tr>
				</thead>
				<tbody>
					{[...Array(8)].map((_, idx) => (
						<tr
							key={idx}
							className="bg-white border-b border-gray-200 animate-pulse"
						>
							<th
								scope="row"
								className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
							>
								<div className="flex flex-col gap-2">
									<div className="w-18 h-2 bg-gray-200 rounded-full"></div>
									<div className="w-8 h-1 bg-gray-200 rounded-full"></div>
								</div>
							</th>
							<td className="px-6 py-4">
								<div className="flex flex-col gap-2">
									<div className="w-18 h-2 bg-gray-200 rounded-full"></div>
									<div className="w-8 h-1 bg-gray-200 rounded-full"></div>
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex flex-col gap-2">
									<div className="w-18 h-2 bg-gray-200 rounded-full"></div>
									<div className="w-8 h-1 bg-gray-200 rounded-full"></div>
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex flex-col gap-2">
									<div className="w-18 h-2 bg-gray-200 rounded-full"></div>
									<div className="w-8 h-1 bg-gray-200 rounded-full"></div>
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex flex-col gap-2">
									<div className="w-18 h-2 bg-gray-200 rounded-full"></div>
									<div className="w-8 h-1 bg-gray-200 rounded-full"></div>
								</div>
							</td>
							<td className="px-6 py-4">
								<div className="flex flex-col gap-2">
									<div className="w-18 h-2 bg-gray-200 rounded-full"></div>
									<div className="w-8 h-1 bg-gray-200 rounded-full"></div>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
