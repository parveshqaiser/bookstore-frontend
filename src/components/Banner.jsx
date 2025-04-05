
import React from 'react';
import banner from "../assets/banner.png";

const Banner = () => {
	return (
		<nav className='flex flex-col md:flex-row-reverse justify-between items-center gap-4'>
			<div className='md:w-1/2 w-full flex items-center md:justify-end'>
				<img src={banner} alt=""  />
			</div>
			<div className='md:w-1/2 w-full'>
				<h1 className='md:text-3xl text-xl font-medium mb-7'>New Releases This Week</h1>
				<p className='mb-10'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone.</p>
				<button className='px-4 py-2 bg-purple-400 rounded-md cursor-pointer'>Subscribe</button>
			</div>
		</nav>
	)
}

export default Banner;
