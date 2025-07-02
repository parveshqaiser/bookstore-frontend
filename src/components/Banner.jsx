
import banner from "../assets/banner.png";
import { IoTrendingUp , IoStar } from "react-icons/io5";

const Banner = () => {
	return (
	<main className='max-w-6xl my-20 p-2 lg:mx-auto mx-4 bg-[#F9FBFC]'>
		<nav className='flex flex-col md:flex-row-reverse justify-between items-center gap-4'>
			<aside className='md:w-1/2 w-full flex items-center md:justify-end'>
				<img src={banner} alt=""  />
			</aside>

			<aside className='md:w-1/2 w-full'>
				{/* <h1 className='md:text-3xl text-xl font-medium mb-7'>New Releases This Week</h1> */}
				<h1 className="md:text-3xl text-xl font-bold text-gray-900 leading-tight mb-7">
                	New Releases &nbsp;
                	<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  	This Week
                	</span>
              	</h1>
				<p className='mb-10 text-gray-600 leading-relaxed'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<button className="cursor-pointer  rounded-md flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
						<IoStar className="text-lg" />
						Subscribe Now
					</button>
					<button className="cursor-pointer rounded-md px-4 py-2 border border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 bg-transparent">
						Browse Collection
					</button>
				</div>
				<div className="flex gap-8 pt-6">
					<div className="text-center">
						<div className="text-2xl font-bold text-gray-900">50+</div>
						<div className="text-sm text-gray-600">New Releases</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-gray-900">1M+</div>
						<div className="text-sm text-gray-600">Happy Readers</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-gray-900">4.9</div>
						<div className="text-sm text-gray-600">Rating</div>
					</div>
            	</div>				
			</aside>
		</nav>
	</main>
	)
}

export default Banner;
