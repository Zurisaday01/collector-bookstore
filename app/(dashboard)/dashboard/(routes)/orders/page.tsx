import OrdersTable from '@/components/tables/OrdersTable';

const page = () => {
	return (
		<section>
			<div className='flex justify-between items-center gap-2 mb-6'>
				<h1 className='heading text-gradient text-3xl !leading-[1.2]'>
					Orders
				</h1>
			</div>

			<div>
				<OrdersTable />
			</div>
		</section>
	);
};
export default page;
