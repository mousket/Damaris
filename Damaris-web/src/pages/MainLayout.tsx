import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div className="bg-slate-100 w-full min-h-screen">
			<div className="max-w-[1240px]  mx-auto bg-[url('src/assets/DamarisBackground.jpg')] bg-cover bg-center">
				<div className="h-full bg-white/80 overflow-scroll">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
export default MainLayout;
